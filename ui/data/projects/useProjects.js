import { useEffect, useState } from "react";
import { useExtention } from "../universal-hooks/useExtention";

export const useProjects = () => {
  const { getLukstaFactory } = useExtention();

  useEffect(() => {
    const main = async () => {
      const lukstaFactory = await getLukstaFactory();
      console.log("use projects is here", lukstaFactory);

      const projectCounter = await lukstaFactory.projectCounter();

      console.log(projectCounter);

      const projectsCounts = await lukstaFactory.projectCounter();

      const projectsArray = Array(Number(projectsCounts))
        .fill(0)
        .map((v, i) => i + 1);

      projectsArray.forEach(async (projectId) => {
        console.log(`fetching project ${projectId}`);
        console.log(await lukstaFactory.projects(projectId));
      });
    };

    main();
  }, []);

  return {
    upcoming: [],
    fundedProjects: [],
    trendedProjects: [],
  };
};
