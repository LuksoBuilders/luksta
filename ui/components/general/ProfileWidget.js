/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography, Avatar, Paper } from "@mui/material";
import { ipfsUrlToNormal } from "../../lib/ipfsResolvers";

import { useUP } from "../../data/universal-hooks";

const ProfileWidget = ({ address }) => {
  const { data, loading } = useUP(address);

  const profileUrl = data
    ? data.profileImage[4]
      ? data.profileImage[4].url
      : data.profileImage[3]
      ? data.profileImage[3].url
      : data.profileImage[2]
      ? data.profileImage[2].url
      : data.profileImage[1]
      ? data.profileImage[1].url
      : ""
    : "";

  return (
    <div
      css={css`
        display: inline-block;
      `}
    >
      <Paper
        css={css`
          display: flex;
          align-items: center;
          padding: 0.25em;
        `}
      >
        {loading || !data ? (
          <Typography
            css={(theme) => css`
              margin-right: 0.5em;
              font-size: 1.2em;
              margin-left: 0.5em;
              font-size: 16px;
            `}
            variant="h6"
          >
            ...
          </Typography>
        ) : (
          <>
            <Typography
              css={(theme) => css`
                margin-right: 0.5em;
                font-size: 1.2em;
                margin-left: 0.5em;
                font-size: 16px;
              `}
              variant="h6"
            >
              @{data.name}
            </Typography>
            <Avatar
              css={css`
                height: 30px;
                width: 30px;
                border: 2px solid #f8f8f8;
              `}
              src={ipfsUrlToNormal(profileUrl)}
            />
          </>
        )}
      </Paper>
    </div>
  );
};
export default ProfileWidget;
