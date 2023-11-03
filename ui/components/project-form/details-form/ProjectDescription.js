/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Typography } from "@mui/material";

import { useProjectForm } from "../../../data/project-form/useProjectForm";

const ProjectDescription = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const description = projectData.details.description;
  const setDescription = projectActions.details.setDescription;

  const error = submitted & !description ? "Description is required!" : "";

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Description
      </Typography>
      <TextField
        fullWidth
        label="Project Description *"
        error={!!error}
        helperText={error ? error : "Descriptions should be in md format."}
        name="project-description"
        value={description}
        multiline
        minRows={10}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};
export default ProjectDescription;
