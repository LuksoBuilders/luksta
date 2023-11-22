import Layout from "../components/general/Layout";

import Hero from "../components/general/Hero";

import { useProjects } from "../data/projects/useProjects";

export default function Home() {
  const projects = useProjects();

  console.log(projects);

  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
