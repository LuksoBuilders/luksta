/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ethers } from "ethers";
import { ipfsResolver } from "../../data/ipfsResolver";
import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";

function formatNumber(n) {
  const amount = Number(n);
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1) + "B";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + "M";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + "K";
  } else if (amount < 1e-18) {
    return "Very Low";
  } else {
    return amount.toString();
  }
}

const ProjectCard = ({ project, isOwner, isDraft, size }) => {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { data, error, loading } = project[1];

  const showLoading = error || loading;

  const profile = data?.profile;

  const profileImage = profile?.profileImage;
  const avatar = profileImage ? profileImage[profileImage.length - 1].url : "";

  const backgroundImage = profile?.backgroundImage;

  const cover = backgroundImage
    ? backgroundImage[backgroundImage.length - 2].url
    : "";

  const auctionDetail = data?.auctionDetail;

  const getInSecond = (time) => Math.ceil(Number(time) / 1000);

  const auctionStarted =
    getInSecond(new Date()) > Number(auctionDetail?.startingTimeStamp);

  const auctionEnded =
    getInSecond(new Date()) > Number(auctionDetail?.endTimeTimestamp);

  const auctionDuration =
    (Number(auctionDetail?.endTimeTimestamp) -
      Number(auctionDetail?.startingTimeStamp)) /
    3600;

  const renderInformationRow = ({ info, label }) => {
    if (size === "small") {
      if (showLoading)
        return (
          <div
            css={css`
              margin-bottom: 0.1em;
              display: flex;
              justify-content: space-between;
            `}
          >
            <Skeleton
              variant="rounded"
              width={50 + Math.random() * 60}
              height={16}
              css={css`
                border-radius: 10px;
              `}
            />
            <Skeleton
              variant="rounded"
              width={50 + Math.random() * 60}
              height={16}
              css={css`
                border-radius: 10px;
              `}
            />
          </div>
        );
      return (
        <div
          css={css`
            margin-bottom: 0.1em;
            display: flex;
            justify-content: space-between;
          `}
        >
          <Typography
            css={(theme) =>
              css`
                color: ${theme.palette.text.secondary};
                font-size: 14px;
                font-weight: 400;
              `
            }
            variant="subtitle2"
          >
            {label}
          </Typography>
          <Typography
            css={css`
              font-weight: 500;
              font-size: 14px;
            `}
            variant="h5"
          >
            {info}
          </Typography>
        </div>
      );
    }

    if (showLoading)
      return (
        <div
          css={css`
            margin-bottom: 0.1em;
          `}
        >
          <Skeleton
            variant="rounded"
            width={80 + Math.random() * 80}
            height={18}
            css={css`
              border-radius: 10px;
              margin-bottom: 0.3em;
            `}
          />
          <Skeleton
            variant="rounded"
            width={80 + Math.random() * 80}
            height={15}
            css={css`
              border-radius: 10px;
              margin-bottom: 0.3em;
            `}
          />
        </div>
      );
    return (
      <div
        css={css`
          margin-bottom: 0.1em;
        `}
      >
        <Typography
          css={css`
            font-weight: 500;
            font-size: 16px;
          `}
          variant="h5"
        >
          {info}
        </Typography>
        <Typography
          css={(theme) =>
            css`
              color: ${theme.palette.text.secondary};
              font-size: 12px;
              font-weight: 400;
            `
          }
          variant="subtitle2"
        >
          {label}
        </Typography>
      </div>
    );
  };

  const renderOwnerControl = () => {
    return (
      <div
        css={css`
          display: flex;
        `}
      >
        <Button
          css={css`
            border-width: 2px !important;
            margin-right: 0.5em;
          `}
          variant="outlined"
          fullWidth
          disabled={!isDraft}
        >
          Edit
        </Button>
        <IconButton disabled={!isDraft} color="primary">
          <Delete />
        </IconButton>
      </div>
    );
  };

  const renderAuctionNotStarted = () => {
    if (data) {
      return (
        <div>
          {renderInformationRow({
            info: formatNumber(
              ethers.utils.formatEther(auctionDetail.exactOrder.sellAmount)
            ),
            label: "Total Auctioned",
          })}
          {renderInformationRow({
            info: moment(Number(auctionDetail.startingTimeStamp) * 1000).format(
              "DD MMMM YYYY"
            ),
            label: "Begins On",
          })}
          {renderInformationRow({
            info: `${auctionDuration.toFixed(2)} H`,
            label: "Duration",
          })}
        </div>
      );
    }
  };

  const renderAuctionStartedInfo = () => {
    if (data) {
      return (
        <div>
          {renderInformationRow({
            info: formatNumber(
              ethers.utils.formatEther(auctionDetail.exactOrder.sellAmount)
            ),
            label: "Total Auctioned",
          })}
          {renderInformationRow({
            info: formatNumber(auctionDetail.currentClearingPrice),
            label: "Current Price",
          })}
          {renderInformationRow({
            info: moment(Number(auctionDetail.endTimeTimestamp) * 1000).format(
              "DD MMMM YYYY"
            ),
            label: "Ends On",
          })}
        </div>
      );
    }
  };

  const renderAuctionEndedInfo = () => {
    if (data) {
      return (
        <div>
          {renderInformationRow({
            info: formatNumber(
              ethers.utils.formatEther(auctionDetail.exactOrder.sellAmount)
            ),
            label: "Total Auctioned",
          })}
          {renderInformationRow({
            info: formatNumber(auctionDetail.currentBiddingAmount),
            label: "Total Raised",
          })}
          {renderInformationRow({
            info: moment(Number(auctionDetail.endTimeTimestamp) * 1000).format(
              "DD MMMM YYYY"
            ),
            label: "Ended On",
          })}
        </div>
      );
    }
  };

  const renderBasicInfo = () => {
    if (data) {
      return (
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {showLoading ? (
            <Skeleton
              variant="rounded"
              width={45}
              height={45}
              css={css`
                border-radius: 10px;
              `}
            />
          ) : (
            <Avatar
              css={css`
                border-radius: 10px;
                width: 45px;
                height: 45px;
              `}
              src={ipfsResolver(avatar)}
            />
          )}

          <div
            css={css`
              margin-left: 0.5em;
            `}
          >
            {showLoading ? (
              <Skeleton
                variant="rounded"
                width={80 + Math.random() * 30}
                height={20}
                css={css`
                  border-radius: 10px;
                  margin-bottom: 0.3em;
                `}
              />
            ) : (
              <Typography
                css={css`
                  font-weight: bold;
                  font-size: 24px;
                `}
                variant="h5"
              >
                {profile.name}
              </Typography>
            )}

            {showLoading ? (
              <Skeleton
                variant="rounded"
                width={30 + Math.random() * 20}
                height={14}
                css={css`
                  border-radius: 10px;
                  margin-bottom: 0.1em;
                `}
              />
            ) : (
              <Typography
                css={(theme) =>
                  css`
                    color: ${theme.palette.primary.main};
                  `
                }
                variant="subtitle2"
              >
                ${auctionDetail.symbolAuctioningToken}
              </Typography>
            )}
          </div>
        </div>
      );
    }
  };

  if (size === "small") {
    return (
      <Paper
        css={css`
          cursor: pointer;
          transition: 200ms;
          &:hover {
            background-color: #e9ebf5;
          }
          padding: 1em;
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          router.push(`/router/${data?.projectId}`);
        }}
      >
        {renderBasicInfo()}
        <div
          css={css`
            margin-top: 1em;
          `}
        ></div>
        {auctionEnded
          ? renderAuctionEndedInfo()
          : auctionStarted
          ? renderAuctionStartedInfo()
          : renderAuctionNotStarted()}
        <div
          css={css`
            margin-top: 1em;
          `}
        >
          <div
            css={css`
              overflow: hidden;
              border-radius: 10px;
            `}
          >
            {showLoading ? (
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={150}
                css={css`
                  border-radius: 10px;
                  margin-bottom: 0.3em;
                `}
              />
            ) : (
              <img
                css={css`
                  width: 100%;
                  display: block;
                `}
                src={ipfsResolver(cover)}
              />
            )}
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <Paper
      css={css`
        cursor: pointer;
        transition: 200ms;
        &:hover {
          background-color: #e9ebf5;
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        router.push(`/projects/${data?.projectId}`);
      }}
    >
      <Grid container>
        <Grid md={5}>
          <div
            css={css`
              padding: 1em;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
            `}
          >
            {renderBasicInfo()}

            {isOwner && isHovered
              ? renderOwnerControl()
              : auctionEnded
              ? renderAuctionEndedInfo()
              : auctionStarted
              ? renderAuctionStartedInfo()
              : renderAuctionNotStarted()}
          </div>
        </Grid>
        <Grid md={7}>
          <div
            css={css`
              padding: 1em;
            `}
          >
            <div
              css={css`
                overflow: hidden;
                border-radius: 10px;
              `}
            >
              {showLoading ? (
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={210}
                  css={css`
                    border-radius: 10px;
                    margin-bottom: 0.3em;
                  `}
                />
              ) : (
                <img
                  css={css`
                    width: 100%;
                    display: block;
                  `}
                  src={ipfsResolver(cover)}
                />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ProjectCard;
