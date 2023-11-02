import React, { createContext, useContext, useEffect, useState } from "react";

export const ProjectFormContext = createContext();

export const useProjectForm = () => {
  return useContext(ProjectFormContext);
};

export const ProjectFormProvider = ({ children, initialData }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (initialData) {
      if (initialData.details) {
        if (initialData.details.title) {
          setTitle(initialData.details.title);
        }
      }
    }
  }, [initialData]);

  const projectData = {
    details: {
      title,
      setTitle,
    },
  };

  const submitted = false;

  return (
    <ProjectFormContext.Provider value={{ projectData, submitted }}>
      {children}
    </ProjectFormContext.Provider>
  );
};
