/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, Button } from "@mui/material";
import { Container, Row, Col } from "react-grid-system";
import Image from "next/image";

const Footer = () => {
  const FooterLink = (address, title) => {
    return (
      <div
        css={css`
          margin-bottom: 0.4em;
        `}
      >
        <a
          css={(theme) =>
            css`
              color: ${theme.palette.text.primary};
              margin-bottom: 0.5em;
              text-decoration: none;
              font-weight: 500;
            `
          }
          color="primary"
          href={address}
        >
          {title}
        </a>
      </div>
    );
  };

  return (
    <div
      css={(theme) => css`
        background-color: ${theme.palette.primary.light};
        min-height: 200px;
      `}
    >
      <Container>
        <Row>
          <Col lg={6}>
            <div
              css={css`
                display: flex;
                align-items: center;
                margin-top: 2em;
                justify-content: space-between;
              `}
            >
              <Image
                src="/Luksta-logo.png"
                width={106}
                height={48}
                alt="Picture of the author"
              />
              <Typography
                css={css`
                  font-size: 22px;
                  margin-left: 3em;
                `}
                varinat="body1"
              >
                Lukstarter is where new creative ideas shape their economies.
              </Typography>
            </div>
          </Col>
          <Col lg={6}>
            <div
              css={css`
                margin-top: 2em;
              `}
            ></div>
            <Row>
              <Col xs={4}>
                {FooterLink("#", "About")}
                {FooterLink("#", "People")}
                {FooterLink("#", "Docs")}

                {FooterLink("#", "DAO")}
                {FooterLink("#", "Careers")}
              </Col>
              <Col xs={4}>
                {FooterLink("#", "FAQ")}
                {FooterLink("#", "Contact US")}
                {FooterLink("#", "Privacy Policy")}
                {FooterLink("#", "Terms")}
              </Col>
              <Col xs={4}>
                {FooterLink("#", "Twitter")}
                {FooterLink("#", "Github")}
                {FooterLink("#", "Telegram")}
                {FooterLink("#", "Discord")}
                {FooterLink("#", "Youtube")}
              </Col>
            </Row>
            <div
              css={css`
                margin-bottom: 1em;
              `}
            ></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
