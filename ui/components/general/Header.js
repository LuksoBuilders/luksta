/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, Button } from "@mui/material";
import { Container, Row, Col } from "react-grid-system";

import { useExtention } from "../../data/universal-hooks";

import ProfileWidget from "./ProfileWidget";

const Header = () => {
  const { isConnected, connectedAccount, connect } = useExtention();

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              padding: 1em 0em;
            `}
          >
            <div css={css``}>Left Panel</div>
            <div css={css``}>
              {isConnected ? (
                <ProfileWidget address={connectedAccount} />
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
        </Col>
      </Row>
    </Container>
  );
};
export default Header;
