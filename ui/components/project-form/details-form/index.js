/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import TitleInput from "./TitleInput";
import AvatarSelector from "./AvatarSelector";
import PictureSelector from "./PictureSelector";
import ProjectDescription from "./ProjectDescription";
import ProjectSocials from "./ProjectSocials";

const DetailsForm = () => {
  return (
    <div>
      <Typography variant="h4">Project Details</Typography>
      <div
        css={css`
          margin-top: 1em;
        `}
      />
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
      <div
        css={css`
          margin-top: 2em;
        `}
      />
      <ProjectSocials />
    </div>
  );
};
export default DetailsForm;
