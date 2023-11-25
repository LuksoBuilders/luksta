/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";
import Markdown from "react-markdown";

const ProjectDescription = ({ project }) => {
  const { data, loading, error } = project;

  if (!data) return;

  return (
    <div>
      <Markdown>{data.profile.description}</Markdown>
    </div>
  );
};
export default ProjectDescription;
