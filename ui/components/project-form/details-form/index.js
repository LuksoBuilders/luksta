/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import TitleInput from "./TitleInput";
import AvatarSelector from "./AvatarSelector";
import PictureSelector from "./PictureSelector";

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
    </div>
  );
};
export default DetailsForm;
