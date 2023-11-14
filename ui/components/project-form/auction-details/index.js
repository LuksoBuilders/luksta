/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import AuctionTiming from "./AuctionTiming";

const AuctionDetails = () => {
  return (
    <div>
      <Typography variant="h4">Auction Details</Typography>
      <div
        css={css`
          margin-top: 1em;
        `}
      />
      <AuctionTiming />
    </div>
  );
};
export default AuctionDetails;
