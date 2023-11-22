/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Typography, Grid } from "@mui/material";
import { ethers } from "ethers";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

const TokenBasics = () => {
  const { projectData, projectActions, tokenManagementSubmitted } =
    useProjectForm();

  const tokenInfo = projectData.token.info;
  const setInfo = projectActions.token.setInfo;

  const nameError =
    tokenManagementSubmitted & !tokenInfo.name ? "Token Name is required!" : "";
  const symbolError =
    tokenManagementSubmitted & !tokenInfo.symbol
      ? "Token Symbol is required!"
      : "";
  const supplyError =
    tokenManagementSubmitted &
    (!tokenInfo.supply ||
      Number(tokenInfo.supply) === 0 ||
      isNaN(tokenInfo.supply))
      ? "Token supply must be a non zero number and is required!"
      : "";

  const distribution = projectData.token.distribution;

  console.log(
    ethers.utils.parseEther(tokenInfo.supply ? tokenInfo.supply : "0")
  );

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.15em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Basics
      </Typography>
      <Typography
        css={css`
          margin-bottom: 1.5em;
        `}
        variant="body1"
      >
        Input your token essentials.
      </Typography>
      <Grid container spacing="1em">
        <Grid item lg={4}>
          <TextField
            fullWidth
            label="Token Name *"
            error={!!nameError}
            helperText={nameError ? nameError : ""}
            name="token-name"
            value={tokenInfo.name}
            onChange={(e) => setInfo("name", e.target.value)}
          />
        </Grid>{" "}
        <Grid item lg={4}>
          <TextField
            fullWidth
            label="Token Symbol *"
            error={!!symbolError}
            helperText={
              symbolError
                ? symbolError
                : "Symbol is usually couple of characters like LYX."
            }
            name="token-symbol"
            value={tokenInfo.symbol}
            onChange={(e) => setInfo("symbol", e.target.value)}
          />
        </Grid>{" "}
        <Grid item lg={4}>
          <TextField
            fullWidth
            label="Token Supply *"
            error={!!supplyError}
            helperText={
              supplyError ? supplyError : "How many token you want to issue."
            }
            name="token-supply"
            value={tokenInfo.supply}
            onChange={(e) => setInfo("supply", e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default TokenBasics;
