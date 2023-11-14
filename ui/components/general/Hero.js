/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Grid } from "@mui/material";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      css={css`
        padding: 56px;
      `}
    >
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h3">
            Number #1 Spot For Digital Lifestyle Ideas.
          </Typography>
          <Typography
            css={(theme) => css`
              margin-top: 0.5em;
              color: ${theme.palette.text.secondary};
            `}
            variant="h4"
          >
            Get early access to fresh ideas on LUKSO network & build auction for
            your idea all in one place.{" "}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Image src="/hero.svg" width={300} height={300} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Hero;
