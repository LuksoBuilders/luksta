/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Switch, TextField } from "@mui/material";
import { useProjectForm } from "../../../data/project-form/useProjectForm";

const Vesting = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const onlyNotNegativeInts = (value) =>
    value < 0 || isNaN(value)
      ? 0
      : isNaN(parseInt(value))
      ? 0
      : parseInt(value);

  const vestingSetting = projectData.vesting.vestingSetting;
  const setVestingSetting = projectActions.vesting.setVestingData;

  const vestingRows = [
    {
      label: "Founders",
      name: "founder",
      cliff: vestingSetting.founderCliff,
      setCliff: (v) => setVestingSetting("founderCliff", v),
      time: vestingSetting.founderTime,
      setTime: (v) => setVestingSetting("founderTime", v),
    },
    {
      label: "Investors",
      name: "investor",
      cliff: vestingSetting.investorCliff,
      setCliff: (v) => setVestingSetting("investorCliff", v),
      time: vestingSetting.investorTime,
      setTime: (v) => setVestingSetting("investorTime", v),
    },
  ];

  return (
    <div>
      <Typography variant="h4">Vesting</Typography>
      <Typography
        css={css`
          margin-top: 2em;
          margin-bottom: 2em;
        `}
        variant="body2"
      >
        Vesting refers to time-based conditions to earn tokens. You can add
        different vesting terms for different types of shareholders.
      </Typography>
      <div
        css={css`
          margin-top: 1em;
        `}
      />
      {vestingRows.map((row) => (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
          key={row.name}
        >
          <div
            css={css`
              margin-bottom: 2em;
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
                variant="h5"
              >
                {row.label}
              </Typography>
              <Switch size="medium" checked={Number(row.time) !== 0} />
            </div>
            <Typography
              css={css`
                margin-bottom: 0.5em;
              `}
              variant="body1"
            >
              Linear vesting schedule provides an equitable distribution of the
              vested tokens over specific number of months.
            </Typography>

            <div
              css={css`
                display: flex;
                align-items: center;
                margin-bottom: 0.5em;
              `}
            >
              <Typography
                css={css`
                  margin-bottom: 0.15em;
                  font-weight: 500;
                  margin-right: 0.5em;
                `}
                variant="subtitle1"
              >
                Cliff
              </Typography>
              <Switch size="small" checked={Number(row.cliff) !== 0} />
            </div>
            <Typography
              css={css`
                margin-bottom: 0.5em;
              `}
              variant="body2"
            >
              Threshold duration to begin unlocking tokens.{" "}
            </Typography>
          </div>
          <div>
            <div>
              <TextField
                variant="outlined"
                size="small"
                label="Vesting Time (month)"
                value={row.time}
                onChange={(e) => {
                  row.setTime(onlyNotNegativeInts(e.target.value));
                }}
                name={`${row.name.label}-Vesting Time`}
                error={row.error}
              />
            </div>
            <div
              css={css`
                margin-top: 0.75em;
              `}
            >
              <TextField
                variant="outlined"
                size="small"
                label="Cliff Time (month)"
                value={row.cliff}
                onChange={(e) => {
                  row.setCliff(onlyNotNegativeInts(e.target.value));
                }}
                name={`${row.name.label}-Cliff Time`}
                error={row.error}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Vesting;
