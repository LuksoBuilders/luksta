/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import TokenBasics from "./TokenBasics";

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
    </div>
  );
};
export default TokenManagement;
