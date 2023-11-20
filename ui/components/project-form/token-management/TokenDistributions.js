/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { InputAdornment, Typography, Switch, TextField } from "@mui/material";
import { Percent } from "@mui/icons-material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

const TokenDistributions = () => {
  const {
    projectData,
    projectActions,
    tokenManagementSubmitted,
    isDistributionOkay,
  } = useProjectForm();

  const distribution = projectData.token.distribution;
  const setDistribution = projectActions.token.setDistribution;

  const notMinusWrapper = (value) => (value < 0 ? 0 : value);

  const distributionRows = [
    {
      label: "Founders",
      name: "founder",
      description: `Tokens held by the group of people most involved and responsible for driving the business or product forward. Dedicated share will be divided equally among founders.`,
      value: distribution.founder,
      onChange: (value) => setDistribution("founder", value),
      error: !isDistributionOkay,
    },
    {
      label: "Treasury",
      name: "treasury",
      description: `Tokens held by the company, DAO, or foundation for the operating expenses.`,
      value: distribution.treasury,
      onChange: (value) => setDistribution("treasury", value),
      error: !isDistributionOkay,
    },
    {
      label: "Investors",
      name: "investors",
      description: `Tokens held by accredited investors who invest in private financing or venture capital rounds.`,
      value: distribution.investors,
      onChange: (value) => setDistribution("investors", value),
      error: !isDistributionOkay,
    },
    {
      label: "Public Sale",
      name: "publicSale",
      description: `Tokens purchased in the auction. The purchasing amount will go to the treasury vault.`,
      value: distribution.publicSale,
      onChange: (value) => setDistribution("publicSale", value),
      error: !isDistributionOkay,
    },
  ];

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.15em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Distribution
      </Typography>
      <Typography
        css={css`
          margin-bottom: 1.5em;
        `}
        variant="body1"
      >
        Define how initial supply will be distributed among different stake
        holders.
      </Typography>
      {!isDistributionOkay && (
        <div
          css={(theme) => css`
            margin-bottom: 1.5em;
            border: 2px solid ${theme.palette.error.main};
            padding: 0.5em;
            border-radius: 9px;
          `}
        >
          <Typography
            css={(theme) =>
              css`
                color: ${theme.palette.error.main};
              `
            }
            variant="subtitle2"
          >
            The sum of distributions MUST equal 100%.
          </Typography>
        </div>
      )}
      {distributionRows.map((row) => (
        <div
          key={row.name}
          css={css`
            display: flex;
            margin-bottom: 0.75em;
          `}
        >
          <div
            css={css`
              width: 100%;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <Typography
                css={css`
                  margin-bottom: 0.15em;
                  font-weight: 500;
                `}
                variant="h6"
              >
                {row.label}
              </Typography>
              <Switch checked={Number(row.value) !== 0} />
            </div>
            <Typography variant="body2">{row.description}</Typography>
          </div>
          <div
            css={css`
              width: 90px;
            `}
          >
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div>
                      <Percent
                        css={css`
                          width: 20px;
                          margin-top: 4px;
                        `}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              value={row.value}
              onChange={(e) => {
                row.onChange(notMinusWrapper(Number(e.target.value)));
              }}
              name={`${row.label}-distro`}
              error={row.error}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default TokenDistributions;
