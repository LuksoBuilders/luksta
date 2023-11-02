/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header";

import { Container } from "react-grid-system";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div
        css={css`
          margin-top: 2em;
        `}
      ></div>
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
