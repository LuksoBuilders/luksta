/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import TokenBasics from "./TokenBasics";
import TokenDistributions from "./TokenDistributions";

const TokenManagement = () => {
  return (
    <div>
      <Typography variant="h4">Token Management</Typography>
      <div
        css={css`
          margin-top: 1em;
        `}
      />
      <TokenBasics />
      <div
        css={css`
          margin-top: 2em;
        `}
      />
      <TokenDistributions />
    </div>
  );
};
export default TokenManagement;
