/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Typography, Switch, Button } from "@mui/material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

const WhitelistingTable = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const whitelistEnabled = projectData.whitelisting.whitelistEnabled;
  const setWhitelistEnabled = projectActions.whitelisting.setWhitelistEnabled;

  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div>
          <Typography
            css={css`
              margin-bottom: 0.15em;
              font-weight: 500;
            `}
            variant="h5"
          >
            Allowed Wallets
          </Typography>
          <Typography
            css={css`
              margin-bottom: 1.5em;
            `}
            variant="body1"
          >
            Whitelist wallets so they can participate in your auction and place
            orders. If not active everybody could participate in the IDO.
            <br /> You <b>can</b> change this list after initiating the auction.
          </Typography>
        </div>
        <div>
          <Switch
            value={whitelistEnabled}
            onChange={() => setWhitelistEnabled(!whitelistEnabled)}
          />
        </div>
      </div>
      {whitelistEnabled && (
        <div>
          <div
            css={css`
              display: flex;
            `}
          >
            <TextField
              size="small"
              label="Whitelist User Profile Address"
              fullWidth
              name="Whitelist address"
            />
            <Button
              css={css`
                margin-left: 0.5em;
              `}
              size="small"
              variant="contained"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WhitelistingTable;
