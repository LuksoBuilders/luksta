/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

const AvatarSelector = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const avatar = projectData.details.avatar;
  const setAvatar = projectActions.details.setAvatar;

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Avatar
      </Typography>
      <div
        css={css`
          display: flex;
        `}
      >
        <ButtonBase
          css={css`
            border-radius: 100%;
          `}
          component="label"
        >
          <Avatar
            css={css`
              width: 88px;
              height: 88px;
            `}
            src={avatar ? URL.createObjectURL(avatar) : ""}
          />
          <input
            css={css`
              display: none;
            `}
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            accept="image/png, image/gif, image/jpeg"
          />
        </ButtonBase>
        {avatar && (
          <div
            css={css`
              margin-left: 1em;
            `}
          >
            <Typography variant="subtitle1">{avatar.name}</Typography>
            <Typography variant="subtitle2">
              {humanFileSize(avatar.size)}
            </Typography>
            <Button
              css={css`
                margin-top: 0.25em;
              `}
              size="small"
              variant="text"
              color="secondary"
              startIcon={<Delete />}
              onClick={() => {
                setAvatar(null);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default AvatarSelector;
