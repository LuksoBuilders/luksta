/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, Typography, Switch, Divider, Button } from "@mui/material";
import { useState } from "react";
import moment from "moment";
import { ethers } from "ethers";

import { useExtention } from "../../data/universal-hooks";

function formatEthereumAddress(address) {
  // Check if the address is a valid Ethereum address (basic validation)
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
    throw new Error("Invalid Ethereum address");
  }

  // Extract the first 6 characters, last 6 characters, and add ellipsis in between
  const start = address.slice(0, 6);
  const end = address.slice(-6);
  const middle = "...";

  // Concatenate the parts and return the formatted address
  return `${start}${middle}${end}`;
}

const OrderItem = ({ order, auction, isOwner, isCancellable }) => {
  return (
    <div
      css={css`
        margin-bottom: 0.5em;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            margin-bottom: 0.5em;
          `}
        >
          <Typography
            css={css`
              font-size: 14px;
              font-weight: 300;
            `}
            variant="body1"
          >
            Buy Amount:{" "}
            <span
              css={css`
                font-weight: 600;
              `}
            >
              {" "}
              {order.buyAmount} ${auction.symbolAuctioningToken}
            </span>
          </Typography>
          <Typography
            css={css`
              font-size: 14px;
              font-weight: 300;
            `}
            variant="body1"
          >
            Offer:{" "}
            <span
              css={css`
                font-weight: 600;
              `}
            >
              {" "}
              {ethers.utils.formatEther(order.sellAmount)} $
              {auction.symbolBiddingToken}
            </span>
          </Typography>
          <Typography
            css={css`
              font-size: 14px;
              font-weight: 300;
            `}
            variant="body1"
          >
            By:{" "}
            <span
              css={css`
                font-weight: 600;
              `}
            >
              {isOwner ? "You" : formatEthereumAddress(order.userAddress)}
            </span>
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2">
            {moment(new Date(parseInt(order.timestamp) * 1000)).fromNow()}
          </Typography>
          {isOwner && (
            <Button
              css={css`
                margin-top: 0.5em;
              `}
              size="small"
              color="warning"
              disabled={!isCancellable}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
      <Divider />
    </div>
  );
};

const OrdersList = ({ project }) => {
  const [onlyMe, setOnlyMe] = useState(false);

  const { connectedAccount } = useExtention();

  const { data, error, loading } = project;
  if (!data) return;

  const auctionData = data.auctionDetail;

  const orders = auctionData.orders;

  const cancelleationTime = new Date(
    parseInt(auctionData.orderCancellationEndDate) * 1000
  );

  const isCancelationTime = moment().isBefore(cancelleationTime);

  const renderOrderCancelation = () => {
    return (
      <div
        css={(theme) => css`
          background-color: ${theme.palette.accentOne.main};
          padding: 1em;
          border-radius: 10px;
        `}
      >
        <Typography
          css={css`
            font-weight: 500;
          `}
          variant="body2"
        >
          {isCancelationTime ? (
            <>
              <span>Orders can be cancelled.</span>
              <br />
              <span>
                Deadline:{" "}
                {moment(cancelleationTime).format("YYYY MM DD HH:mm (Z)")}
              </span>
            </>
          ) : (
            <>
              <span>Orders can not be cancelled anymore.</span>
              <br />
              <span>
                Deadline:{" "}
                {moment(cancelleationTime).format("YYYY MM DD HH:mm (Z)")}
              </span>
            </>
          )}
        </Typography>
      </div>
    );
  };

  return (
    <Paper
      css={css`
        padding: 1em;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography
          css={css`
            font-size: 24px;
          `}
          variant="h6"
        >
          Orders List
        </Typography>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Typography
            css={css`
              font-size: 14px;
              font-weight: 500;
            `}
            variant="body1"
          >
            {onlyMe ? "Only Me" : "All"}
          </Typography>
          <Switch checked={!!onlyMe} onChange={() => setOnlyMe(!onlyMe)} />
        </div>
      </div>
      <div
        css={css`
          margin-top: 0.5em;
        `}
      ></div>
      {renderOrderCancelation()}

      <div
        css={css`
          margin-top: 1em;
        `}
      ></div>
      {orders.length === 0 ? (
        <div>
          <Typography variant="body1">
            There is no order on this auction yet.
          </Typography>
        </div>
      ) : (
        orders
          .filter((order) => {
            if (onlyMe) {
              return (
                connectedAccount?.toLowerCase() ===
                order.userAddress.toLowerCase()
              );
            }
            return order;
          })
          .map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              auction={auctionData}
              isOwner={
                connectedAccount?.toLowerCase() ===
                order.userAddress.toLowerCase()
              }
              isCancellable={isCancelationTime}
            />
          ))
      )}
    </Paper>
  );
};
export default OrdersList;
