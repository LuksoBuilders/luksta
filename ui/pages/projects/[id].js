/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import Layout from "../../components/general/Layout";
import { useRouter } from "next/router";
import { useProject } from "../../data/projects/useProject";
import { Grid } from "@mui/material";

import { BasicInfo } from "../../components/project-details";

const ProjectDetails = () => {
  const { query } = useRouter();

  const project = useProject(query.id);

  console.log(project);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item lg={9}>
          <BasicInfo project={project} />
        </Grid>
        <Grid item lg={3}>
          qwe
        </Grid>
      </Grid>
    </Layout>
  );
};
export default ProjectDetails;