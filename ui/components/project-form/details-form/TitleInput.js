/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Typography } from "@mui/material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";
const TitleInput = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const titleValue = projectData.details.title;
  const setTitle = projectActions.details.setTitle;

  const error = submitted & !titleValue ? "Title is required!" : "";

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Title
      </Typography>
      <TextField
        fullWidth
        label="Project Title *"
        error={!!error}
        helperText={error ? error : "Title's usually range from 1 to 4 words."}
        name="project-title"
        value={titleValue}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};
export default TitleInput;
