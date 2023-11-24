/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { ethers } from "ethers";

function formatNumber(n) {
  const amount = Number(n);
  if (amount >= 1000000000) {
    return amount / 1000000000 + "B";
  } else if (amount >= 1000000) {
    return amount / 1000000 + "M";
  } else if (amount >= 1000) {
    return amount / 1000 + "K";
  } else if (amount < 1e-18) {
    return "Very Low";
  } else {
    return amount.toString();
  }
}

const AuctionInfo = ({ project }) => {
  const { data, error, loading } = project;
  if (!data) return;

  const auctionData = data.auctionDetail;

  const auctioningToken = auctionData.symbolAuctioningToken;
  const biddingToken = auctionData.symbolBiddingToken;

  const totalAuctioned = auctionData.exactOrder.sellAmount;

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <div
          css={(theme) =>
            css`
              background-color: ${theme.palette.accentOne.main};
              padding: 1em;
              height: 120px;
              border-radius: 16px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 100%;
            `
          }
        >
          <Typography
            css={css`
              font-size: 26px;
              font-weight: 500;
            `}
            variant="h5"
          >
            {formatNumber(ethers.utils.formatEther(totalAuctioned))} $
            {auctioningToken}
          </Typography>

          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Total Auctioned
          </Typography>
        </div>
      </Grid>
      <Grid item md={6}>
        <div
          css={(theme) =>
            css`
              background-color: ${theme.palette.primary.main};
              color: white;
              padding: 1em;
              height: 120px;
              border-radius: 16px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 100%;
            `
          }
        >
          <Typography
            css={css`
              font-size: 26px;
              font-weight: 500;
            `}
            variant="h5"
          >
            ${biddingToken}
          </Typography>
          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Bidding With
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};
export default AuctionInfo;
