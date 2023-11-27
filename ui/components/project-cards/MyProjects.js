/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography } from "@mui/material";

import ProjectCard from "./ProjectCard";
import { useExtention } from "../../data/universal-hooks";

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

const MyProjects = ({ projects }) => {
  const { connectedAccount } = useExtention();

  if (!connectedAccount) {
    return (
      <Typography variant="h4">There is no account connected yet</Typography>
    );
  }

  console.log(
    [...projects].filter((proj) => {
      const project = proj[1];
      console.log(project.owner);
    })
  );

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.5em;
        `}
        variant="h4"
      >
        My Projects
      </Typography>
      <Grid container spacing={2}>
        {[...projects].map((project, i) => (
          <Grid key={i} item md={6}>
            <ProjectCard isDraft={true} isOwner project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default MyProjects;
