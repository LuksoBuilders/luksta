/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, Skeleton } from "@mui/material";
import { ipfsResolver } from "../../data/ipfsResolver";

const BasicInfo = ({ project }) => {
  const { data, loading, error } = project;
  const showLoading = !data;

  const profile = data?.profile;

  const profileImage = profile?.profileImage;
  const avatar = profileImage ? profileImage[profileImage.length - 1].url : "";

  const auctionDetail = data?.auctionDetail;

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
            width={96}
            height={96}
            css={css`
              border-radius: 10px;
            `}
          />
        ) : (
          <Avatar
            css={css`
              border-radius: 10px;
              width: 96px;
              height: 96px;
            `}
            src={ipfsResolver(avatar)}
          />
        )}

        <div
          css={css`
            margin-left: 1.5em;
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
                font-size: 36px;
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
                  font-size: 16px;
                `
              }
              variant="subtitle2"
            >
              ${auctionDetail.symbolAuctioningToken} - Auction ID #
              {String(data?.auctionId)}
            </Typography>
          )}
        </div>
      </div>
    );
  }
};
export default BasicInfo;
