/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Image from "next/image";

const NewsletterWidget = () => {
  return (
    <div
      css={(theme) => css`
        border-radius: 2em;
        padding: 2em;
        background-color: ${theme.palette.primary.main};
        color: white;
      `}
    >
      <Grid container spacing={2}>
        <Grid item md={6}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              height: 100%;
            `}
          >
            <Typography variant="h4">
              Never want to miss a new project?
            </Typography>
            <div>
              <Typography
                css={(theme) => css`
                  margin-top: 0.5em;
                `}
                variant="h6"
              >
                Sign up for our newsletter and get the latest news and updates.{" "}
              </Typography>
              <div
                css={css`
                  margin-top: 1em;
                  display: flex;
                `}
              >
                <TextField
                  fullWidth
                  size="small"
                  label="Email Address"
                  color="white"
                  variant="filled"
                  css={css`
                    border: white !important;
                  `}
                  name="newsletter-email"
                  focused
                />
                <Button
                  css={(theme) =>
                    css`
                      color: ${theme.palette.primary.main};
                      margin-left: 1em;
                    `
                  }
                  variant="contained"
                  color="white"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: white;
              padding: 2em;
              border-radius: 2em;
            `}
          >
            <Image
              src="/newsletter.svg"
              css={css`
                color: white;
              `}
              width={250}
              height={250}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default NewsletterWidget;
