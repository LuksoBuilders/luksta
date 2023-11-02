/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField } from "@mui/material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";
const TitleInput = () => {
  const { projectData, submitted } = useProjectForm();

  const titleValue = projectData.details.title;
  const setTitle = projectData.details.setTitle;

  const error = submitted & !titleValue ? "Title is required!" : "";

  return (
    <div>
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
