/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";
import Layout from "../components/general/Layout";
import { useProjects } from "../data/projects/useProjects";

import MyProjects from "../components/project-cards/MyProjects";

const Dashboard = () => {
  const projects = useProjects();

  return (
    <Layout>
      <MyProjects projects={projects.upcoming} />
    </Layout>
  );
};
export default Dashboard;
