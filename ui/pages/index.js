/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "../components/general/Layout";
import Hero from "../components/general/Hero";
import { useProjects } from "../data/projects/useProjects";
import UpcomingProjects from "../components/project-cards/UpcomingProjects";
import NewsletterWidget from "../components/general/NewsletterWidget";

export default function Home() {
  const projects = useProjects();

  return (
    <Layout>
      <Hero />
      <div
        css={css`
          margin-top: 1em;
        `}
      ></div>
      <UpcomingProjects projects={projects.upcoming} />
      <div
        css={css`
          margin-top: 3em;
        `}
      ></div>
      <NewsletterWidget />
    </Layout>
  );
}
