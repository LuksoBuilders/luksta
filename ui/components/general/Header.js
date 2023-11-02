/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, Button } from "@mui/material";

import { useExtention } from "../../data/universal-hooks";

const Header = () => {
  const { isConnected, accounts, connect } = useExtention();

  console.log(isConnected, accounts);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div css={css``}>Left Panel</div>
      <div css={css``}>
        {isConnected ? (
          <div>Must handle User</div>
        ) : (
          <Button
            onClick={async () => {
              connect();
            }}
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};
export default Header;
