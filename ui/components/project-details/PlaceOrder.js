/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useExtention } from "../../data/universal-hooks/useExtention";
import { gql } from "@apollo/client";
import { client } from "../../data/apolloClient";

export const queueStartElement =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

export const GET_PREVIOUS_ORDER = `
  query GetPreviousOrder($id: ID, $price: String) {
    auctionDetail(id: $id) {
        ordersWithoutClaimed(orderBy: price, orderDirection: asc, where: {price_gt: $price}) {
        buyAmount
        sellAmount
        userId
        price
        volume
      }
    }
  }
`;

export function encodeOrder(order) {
  return (
    "0x" +
    order.userId.toHexString().slice(2).padStart(16, "0") +
    order.buyAmount.toHexString().slice(2).padStart(24, "0") +
    order.sellAmount.toHexString().slice(2).padStart(24, "0")
  );
}

const getPreviousOrder = async (params) => {
  try {
    const query = gql(GET_PREVIOUS_ORDER);

    const res = await client.query({
      query,
      variables: {
        id: params.auctionId,
        price: params.price,
      },
    });

    if (res.error) {
      // backend returns {"message":"invalid url query"}
      // for bad requests
      throw res.error;
    }
    let order = res.data.auctionDetail.ordersWithoutClaimed[0];
    if (!order) {
      return queueStartElement;
    }
    // Sort the orders by their price and volume
    const sortedOrders = [...res.data.auctionDetail.ordersWithoutClaimed].sort(
      (a, b) => {
        if (a.price === b.price) return a.volume - b.volume;
        return a.price - b.price;
      }
    );
    order = sortedOrders[0];
    order = {
      userId: ethers.BigNumber.from(order.userId),
      buyAmount: ethers.BigNumber.from(order.buyAmount),
      sellAmount: ethers.BigNumber.from(order.sellAmount),
    };
    return encodeOrder(order);
  } catch (error) {
    console.error(error);

    const { auctionId, order } = params;

    throw new Error(
      `Failed to query previous order for auction id ${auctionId} and order ${encodeOrder(
        order
      )}: ${error.message}`
    );
  }
};

const PlaceOrder = ({ project, refetch }) => {
  const [amount, setAmount] = useState("");
  const [maxBiddingPrice, setMaxBiddingPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const [userBalance, setUserBalance] = useState("");

  const {
    getWLYX,
    signer,
    connectedAccount,
    provider,
    getDepositAndPlaceOrder,
  } = useExtention();
  //

  const notMinusWrapper = (value) => (value < 0 ? 0 : value);

  useEffect(() => {
    const main = async () => {
      try {
        const wlyx = await getWLYX(true);

        const userAccount = connectedAccount;

        const nativeBalance = await provider.getBalance(userAccount);
        const wrappedBalance = await wlyx.balanceOf(userAccount);
        const totalBalance = nativeBalance.add(wrappedBalance);
        setUserBalance(totalBalance);
      } catch (err) {
        console.error(err);
      }
    };

    if (provider) {
      main();
    }
  }, [connectedAccount, provider]);

  const { data, error, loading } = project;
  if (!data) return;

  const auctionData = data.auctionDetail;

  const auctioningToken = auctionData.symbolAuctioningToken;
  const biddingToken = auctionData.symbolBiddingToken;

  const isMoreThanBalance =
    userBalance && amount
      ? ethers.utils.parseEther(amount).gt(userBalance)
      : false;

  const canOrder =
    signer && amount && maxBiddingPrice && !isMoreThanBalance && !orderStatus;

  return (
    <Paper
      css={css`
        padding: 1em;
      `}
    >
      <Typography
        css={css`
          font-size: 24px;
        `}
        variant="h6"
      >
        Place Order
      </Typography>
      <div
        css={css`
          margin-top: 0.5em;
        `}
      ></div>
      <TextField
        fullWidth
        label={`Amount (${biddingToken})`}
        name="amount-lyx"
        value={amount}
        size="small"
        autoComplete="off"
        onChange={(e) =>
          setAmount(
            notMinusWrapper(isNaN(e.target.value) ? amount : e.target.value)
          )
        }
        InputProps={{
          endAdornment: (
            <Button
              onClick={() => {
                setAmount(ethers.utils.formatEther(userBalance));
              }}
              size="small"
            >
              MAX
            </Button>
          ),
        }}
        error={isMoreThanBalance}
        helperText={
          isMoreThanBalance
            ? "Not enough balance"
            : userBalance
            ? `Balance: ${ethers.utils.formatEther(userBalance)}`
            : ""
        }
      />
      <div
        css={css`
          margin-top: 0.5em;
        `}
      ></div>
      <TextField
        size="small"
        fullWidth
        label={`Max Bidding Price ($${auctioningToken} per $${biddingToken})`}
        name="max-bidding-lyx"
        value={maxBiddingPrice}
        onChange={(e) =>
          setMaxBiddingPrice(
            notMinusWrapper(
              isNaN(e.target.value) ? maxBiddingPrice : e.target.value
            )
          )
        }
        autoComplete="off"
      />
      <div
        css={css`
          margin-top: 1em;
        `}
      ></div>
      <Button
        css={css`
          color: white !important;
        `}
        variant="contained"
        fullWidth
        disabled={!canOrder}
        onClick={async () => {
          console.log(auctionData);
          try {
            setOrderStatus("Preparing Order");

            const previousOrder = await getPreviousOrder({
              auctionId: auctionData.auctionId,
              price: ethers.utils.parseEther(maxBiddingPrice).toString(),
            });

            console.log("previousOrder: ", previousOrder);

            const depositAndPlaceOrder = await getDepositAndPlaceOrder(true);

            console.log("depositAndPlaceOrder: ", depositAndPlaceOrder);

            const inversePrice = 1 / maxBiddingPrice;

            console.log("price is: ", maxBiddingPrice);
            console.log("inverse price is: ", inversePrice);

            const sellAmountScaled = ethers.utils.parseEther(amount);

            console.log("sell amount is: ", amount);
            console.log("sell amount scaled is: ", sellAmountScaled.toString());

            const buyAmount = amount / maxBiddingPrice;

            const buyAmountScaled = ethers.utils.parseEther(String(buyAmount));

            console.log("buy amount is: ", buyAmount);
            console.log("buy amount scaled is: ", buyAmountScaled.toString());
            setOrderStatus("Waiting For Approval");

            const depositAndPlaceOrderTx =
              await depositAndPlaceOrder.depositAndPlaceOrder(
                auctionData.auctionId,
                [Math.floor(amount / maxBiddingPrice)],
                [previousOrder],
                "0x",
                {
                  value: ethers.utils.parseEther(amount),
                }
              );

            setOrderStatus("Waiting For Confirmation");
            const receipt = await depositAndPlaceOrderTx.wait();

            setOrderStatus("");
            refetch();

            // must refetch
          } catch (err) {
            console.error(err);
            setOrderStatus("Waiting For Confirmation");
          }
        }}
      >
        {signer
          ? orderStatus
            ? orderStatus
            : "Place Order"
          : "Connect to order"}
      </Button>
    </Paper>
  );
};
export default PlaceOrder;
