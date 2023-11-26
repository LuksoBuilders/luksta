/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography } from "@mui/material";

import ProjectCard from "./ProjectCard";

function shuffleArray(array) {
  // Copy the original array to avoid modifying it directly
  const shuffledArray = [...array];

  // Fisher-Yates algorithm for shuffling
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const UpcomingProjects = ({ projects }) => {
  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
        `}
        variant="h4"
      >
        Featured Projects
      </Typography>
      <Grid container spacing={2}>
        {[...projects].slice(0, 2).map((project, i) => (
          <Grid key={i} item md={6}>
            <ProjectCard isDraft={true} isOwner project={project} />
          </Grid>
        ))}
      </Grid>
      <div
        css={css`
          margin-top: 2em;
        `}
      ></div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
        `}
        variant="h4"
      >
        All Projects
      </Typography>
      <Grid container spacing={2}>
        {shuffleArray([...projects]).map((project, i) => (
          <Grid key={i} item md={3}>
            <ProjectCard
              size="small"
              isDraft={true}
              isOwner
              project={project}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default UpcomingProjects;
