/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Typography, Grid, InputAdornment } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { HourglassEmpty } from "@mui/icons-material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

const AuctionTiming = () => {
  const { projectData, projectActions, auctionManagementSubmitted } =
    useProjectForm();

  const onlyNotNegativeInts = (value) =>
    value < 0 || isNaN(value)
      ? 0
      : isNaN(parseInt(value))
      ? 0
      : parseInt(value);

  const date = projectData.auction.date;
  const setDate = projectActions.auction.setDate;

  const duration = projectData.auction.duration;
  const setDuration = projectActions.auction.setDuration;

  const durationError =
    auctionManagementSubmitted && (!duration || duration == 0)
      ? "Duration must more than 0"
      : "";
  //const supplyError =
  //  submitted & (!tokenInfo.supply || isNaN(tokenInfo.supply))
  //    ? "Token supply must be a number and is required!"
  //    : "";

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 1.5em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Auction Timings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <div>
            <Typography variant="h6">Sale Date</Typography>
            <Typography variant="body1">
              On this date, your auction begins and orders can be placed.
            </Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <div
            css={css`
              display: flex;
              justify-content: end;
            `}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                disablePast
                value={date}
                onChange={(value) => setDate(value)}
              />
            </LocalizationProvider>
          </div>
        </Grid>
        <Grid item md={6}>
          <div>
            <Typography variant="h6">Sale Time</Typography>
            <Typography variant="body1">
              At this time, your auction begins and orders can be placed.
            </Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <div
            css={css`
              display: flex;
              justify-content: end;
            `}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                disablePast
                value={date}
                onChange={(value) => setDate(value)}
                label="Basic time picker"
              />
            </LocalizationProvider>
          </div>
        </Grid>
        <Grid item md={6}>
          <div>
            <Typography variant="h6">Duration</Typography>
            <Typography variant="body1">
              During this time, people can place orders and cancel them on your
              auction.{" "}
            </Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <div
            css={css`
              display: flex;
              justify-content: end;
            `}
          >
            <div
              css={css`
                width: 231px;
              `}
            >
              <TextField
                fullWidth
                label="Hours"
                name="hours"
                value={duration}
                onChange={(e) =>
                  setDuration(onlyNotNegativeInts(e.target.value))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div
                        css={css`
                          font-size: 20px;
                        `}
                      >
                        <HourglassEmpty />
                      </div>
                    </InputAdornment>
                  ),
                }}
                error={durationError}
                helperText={durationError ? durationError : ""}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default AuctionTiming;
