/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";
import moment from "moment";
import { useTimer } from "use-timer";
import { useEffect } from "react";

function formatDuration(seconds) {
  const duration = moment.duration(seconds, "seconds");

  const month = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const secs = duration.seconds();

  let formattedDuration = "";

  let identifiers = 0;

  if (days > 0 && identifiers < 3) {
    formattedDuration += `${month}m `;
    identifiers++;
  }

  if (days > 0 && identifiers < 3) {
    formattedDuration += `${days}d `;
    identifiers++;
  }

  if (hours > 0 && identifiers < 3) {
    formattedDuration += `${hours}h `;
    identifiers++;
  }

  if (minutes > 0 && identifiers < 3) {
    formattedDuration += `${minutes}m `;
    identifiers++;
  }

  if (secs > 0 && identifiers < 3) {
    formattedDuration += `${secs}s `;
    identifiers++;
  }

  return formattedDuration.trim();
}

const AuctionTimer = ({ project }) => {
  const { data, error, loading } = project;
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 10000,
    timerType: "DECREMENTAL",
  });

  useEffect(() => {
    start();
  }, []);

  if (!data) return;

  const auctionData = data.auctionDetail;

  const startTime = new Date(parseInt(auctionData.startingTimeStamp) * 1000);
  const endTime = new Date(parseInt(auctionData.endTimeTimestamp) * 1000);

  const timeRemaining = endTime - new Date();
  const beginingRemaining = startTime - new Date();
  const beginingRemainingInSeconds = Math.floor(beginingRemaining / 1000);
  const timeRemainingInSeconds = Math.floor(timeRemaining / 1000);

  const totalTime = endTime - startTime;

  const progressPercent = 100 - (timeRemaining * 100) / totalTime;

  const beginsOn = moment(startTime).format("DD MMMM YYYY HH:mm (Z)");
  const endsOn = moment(endTime).format("DD MMMM YYYY HH:mm (Z)");
  const endedOn = moment(Number(endTime)).format("DD MMMM YYYY");

  const isAuctionActive = new Date() >= startTime && new Date() <= endTime;
  const isAuctionEnded = new Date() > endTime;

  const renderContent = () => {
    if (isAuctionActive) {
      return (
        <>
          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="h4"
          >
            {formatDuration(timeRemainingInSeconds)}
          </Typography>

          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Ends On {endsOn}
          </Typography>
        </>
      );
    } else if (isAuctionEnded) {
      return (
        <>
          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="h4"
          >
            Finished
          </Typography>
          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Ended On {endedOn}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="h4"
          >
            {formatDuration(beginingRemainingInSeconds)}
          </Typography>

          <Typography
            css={css`
              font-weight: 500;
            `}
            variant="subtitle1"
          >
            Begins On {beginsOn}
          </Typography>
        </>
      );
    }
  };

  return (
    <div>
      <div
        css={(theme) =>
          css`
            background-color: #141a38;
            padding: 1em;
            height: 120px;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            position: relative;
            overflow: hidden;
          `
        }
      >
        <div
          css={css`
            height: 100%;
            background-color: #606787;
            position: absolute;
            z-index: 1;
            width: ${progressPercent}%;
            top: 0;
            left: 0;
          `}
        ></div>
        <div
          css={(theme) =>
            css`
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              z-index: 2;
              padding: 1em;
              color: white;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
            `
          }
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default AuctionTimer;
