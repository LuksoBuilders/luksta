/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, Button } from "@mui/material";
import { Container, Row, Col } from "react-grid-system";
import Image from "next/image";
import { useRouter } from "next/router";

import { useExtention } from "../../data/universal-hooks";

import ProfileWidget from "./ProfileWidget";

const Header = () => {
  const { isConnected, connectedAccount, connect } = useExtention();

  const router = useRouter();

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
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <Image
                src="/Luksta-logo.png"
                width={88}
                height={40}
                alt="Picture of the author"
              />
              <Button
                css={css`
                  margin-right: 0.5em;
                  margin-left: 1.5em;
                `}
              >
                Home
              </Button>
              <Button
                css={css`
                  margin-right: 0.5em;
                `}
              >
                Projects
              </Button>
              <Button
                css={css`
                  margin-right: 0.5em;
                `}
              >
                About
              </Button>
            </div>
            <div>
              <Button
                css={css`
                  margin-right: 0.5em;
                `}
              >
                Dashboard
              </Button>
              <Button
                css={css`
                  margin-right: 0.5em;
                  border-width: 2px !important;
                `}
                variant="outlined"
                onClick={() => {
                  router.push(`/projects/create`);
                }}
              >
                Create Project
              </Button>
              {isConnected ? (
                <ProfileWidget address={connectedAccount} />
              ) : (
                <Button
                  onClick={async () => {
                    connect();
                  }}
                  variant="contained"
                  color="secondary"
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
