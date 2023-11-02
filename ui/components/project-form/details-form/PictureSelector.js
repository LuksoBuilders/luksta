/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ButtonBase,
  Typography,
  Avatar,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { AddCircleRounded, RemoveCircle } from "@mui/icons-material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

const SinglePicture = ({ image, addPicture, removePicture }) => {
  if (image) {
    return (
      <div
        css={(theme) => css`
          background-color: ${theme.palette.background.input};
          border: 2px solid ${theme.palette.primary.main};
          height: 150px;
          margin: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        `}
      >
        <img
          src={URL.createObjectURL(image)}
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
        />
        <div
          css={css`
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            :hover {
              background: rgba(233, 235, 245, 0.35);
              visibility: visible !important;
            }
          `}
          onMouseEnter={(e) => {
            if (e.currentTarget.children[0]) {
              e.currentTarget.children[0].style.visibility = "visible";
            }
          }}
          onMouseLeave={(e) => {
            if (e.currentTarget.children[0]) {
              e.currentTarget.children[0].style.visibility = "hidden";
            }
          }}
        >
          <IconButton
            css={(theme) => css`
              background: ${theme.palette.primary.light} !important;
              visibility: hidden;
            `}
            color="primary"
            onClick={() => {
              removePicture();
            }}
          >
            <RemoveCircle />
          </IconButton>
        </div>
      </div>
    );
  }
  return (
    <div
      css={(theme) => css`
        background-color: ${theme.palette.background.input};
        border: 2px solid ${theme.palette.primary.main};
        height: 150px;
        margin: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        overflow: hidden;
      `}
    >
      <ButtonBase
        css={css`
          width: 100%;
          height: 100%;
        `}
        component="label"
      >
        <AddCircleRounded
          css={(theme) => css`
            width: 28px;
            height: 28px;
            color: ${theme.palette.primary.main};
          `}
        />
        <input
          css={css`
            display: none;
          `}
          type="file"
          onChange={(e) => addPicture(e.target.files)}
          accept="image/png, image/gif, image/jpeg"
          multiple
        />
      </ButtonBase>
    </div>
  );
};

const PictureSelector = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const { pictures } = projectData.details;
  const { addPicture, removePicture } = projectActions.details;

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.15em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Pictures
      </Typography>
      <Typography
        css={css`
          margin-bottom: 0.5em;
        `}
        variant="body1"
      >
        You can add up to 8 pictures
      </Typography>
      <div
        css={css`
          margin-left: -8px;
          margin-right: -8px;
        `}
      >
        <Grid container>
          {Array(8)
            .fill(0)
            .map((v, i) => (
              <Grid item key={i} lg={3} md={4} sm={6}>
                <SinglePicture
                  image={pictures[i]}
                  addPicture={addPicture}
                  removePicture={() => removePicture(i)}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};
export default PictureSelector;
