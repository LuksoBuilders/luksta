/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

import { ProjectFormProvider } from "../../data/project-form/useProjectForm";
import ProjectSteps from "./ProjectSteps";

const ProjectForm = () => {
  return (
    <ProjectFormProvider>
      <ProjectSteps />
    </ProjectFormProvider>
  );
};
export default ProjectForm;
