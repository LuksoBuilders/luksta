/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import TitleInput from "./TitleInput";
import AvatarSelector from "./AvatarSelector";
import PictureSelector from "./PictureSelector";
import ProjectDescription from "./ProjectDescription";

const DetailsForm = () => {
  return (
    <div>
      <TitleInput />
      <div
        css={css`
          margin-top: 2em;
        `}
      />
      <AvatarSelector />
      <div
        css={css`
          margin-top: 2em;
        `}
      />
      <PictureSelector />
      <div
        css={css`
          margin-top: 2em;
        `}
      />
      <ProjectDescription />
    </div>
  );
};
export default DetailsForm;
