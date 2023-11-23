/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography } from "@mui/material";

import ProjectCard from "./ProjectCard";

const UpcomingProjects = ({ projects }) => {
  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
        `}
        variant="h4"
      >
        Upcoming Projects
      </Typography>
      <Grid container spacing={2}>
        {[...projects, ...projects, ...projects, ...projects].map(
          (project, i) => (
            <Grid key={i} item md={6}>
              <ProjectCard isDraft={true} isOwner project={project} />
            </Grid>
          )
        )}
      </Grid>
      <div
        css={css`
          margin-top: 2em;
        `}
      ></div>
      <Grid container spacing={2}>
        {[...projects, ...projects, ...projects, ...projects].map(
          (project, i) => (
            <Grid key={i} item md={3}>
              <ProjectCard
                size="small"
                isDraft={true}
                isOwner
                project={project}
              />
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};
export default UpcomingProjects;
