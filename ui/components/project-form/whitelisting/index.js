/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

import WhitelistingTable from "./WhitelistTable";

const Whitelisting = () => {
  return (
    <div>
      <Typography variant="h4">Whitelisting</Typography>
      <div
        css={css`
          margin-top: 1em;
        `}
      />
      <WhitelistingTable />
    </div>
  );
};

export default Whitelisting;
