/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "../../components/general/Layout";
import { useRouter } from "next/router";
import { useProject } from "../../data/projects/useProject";
import { Grid } from "@mui/material";

import {
  BasicInfo,
  SlideShow,
  ProjectDescription,
  ProjectLinks,
  AuctionInfo,
  AuctionTimer,
  CurrentPrice,
  PlaceOrder,
  OrdersList,
} from "../../components/project-details";

const ProjectDetails = () => {
  const { query } = useRouter();

  const { project, refetch } = useProject(query.id);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <BasicInfo project={project} />
          <div
            css={css`
              margin-top: 2em;
            `}
          ></div>
          <SlideShow project={project} />
          <div
            css={css`
              margin-top: 2em;
            `}
          ></div>
          <ProjectLinks project={project} />
          <div
            css={css`
              margin-top: 2em;
            `}
          ></div>
          <ProjectDescription project={project} />
        </Grid>
        <Grid item lg={4}>
          <AuctionInfo project={project} />
          <div
            css={css`
              margin-top: 1em;
            `}
          ></div>
          <AuctionTimer project={project} />
          <div
            css={css`
              margin-top: 1em;
            `}
          ></div>
          <CurrentPrice project={project} />
          <div
            css={css`
              margin-top: 1em;
            `}
          ></div>{" "}
          <PlaceOrder refetch={refetch} project={project} />
          <div
            css={css`
              margin-top: 1em;
            `}
          ></div>{" "}
          <OrdersList project={project} />
        </Grid>
      </Grid>
    </Layout>
  );
};
export default ProjectDetails;
