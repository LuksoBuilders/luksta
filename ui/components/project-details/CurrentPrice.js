/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography, Paper } from "@mui/material";
import { ethers } from "ethers";

function formatNumber(n) {
  const amount = Number(n);
  if (amount >= 1000000000) {
    return amount / 1000000000 + "B";
  } else if (amount >= 1000000) {
    return amount / 1000000 + "M";
  } else if (amount >= 1000) {
    return amount / 1000 + "K";
  } else if (amount < 1e-18 && amount > 0) {
    return "Very Low";
  } else {
    return amount.toString();
  }
}

const CurrentPrice = ({ project }) => {
  const { data, error, loading } = project;
  if (!data) return;

  const auctionData = data.auctionDetail;

  const auctioningToken = auctionData.symbolAuctioningToken;
  const biddingToken = auctionData.symbolBiddingToken;

  const currentPrice = auctionData.currentClearingPrice;
  const currentVolume = auctionData.currentVolume;

  console.log(auctionData);

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Paper
          css={(theme) =>
            css`
              background-color: ${theme.palette.background.paper};
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
          <div>
            <Typography
              css={css`
                font-size: 22px;
                font-weight: 500;
              `}
              variant="h5"
            >
              {formatNumber(currentPrice)}
            </Typography>
            <Typography
              css={css`
                font-size: 14px;
                font-weight: 400;
              `}
              variant="body2"
            >
              ${biddingToken} per ${auctioningToken}
            </Typography>
          </div>

          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Current Price
          </Typography>
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Paper
          css={(theme) =>
            css`
              background-color: ${theme.palette.background.paper};
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
            {formatNumber(currentVolume)} ${biddingToken}
          </Typography>
          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Current Volume
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default CurrentPrice;
