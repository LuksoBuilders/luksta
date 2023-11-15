/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header";
import Footer from "./Footer";

import { Container } from "react-grid-system";

const Layout = ({ children }) => {
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 300px);
        `}
      >
        <div>
          <Header />
        </div>
        <div
          css={css`
            margin-top: 2em;
          `}
        ></div>
        <div>
          <Container>{children}</Container>
        </div>
        <div
          css={css`
            margin-top: 2em;
          `}
        ></div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
