import React, { createContext, useContext, useEffect, useState } from "react";
import localforage from "localforage";

export const ProjectFormContext = createContext();

export const useProjectForm = () => {
  return useContext(ProjectFormContext);
};

export const ProjectFormProvider = ({ children, initialData, draftingKey }) => {
  const [draftKey, setDraftKey] = useState("");
  const [title, setTitle] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [description, setDescription] = useState([]);
  const [links, setLinks] = useState({
    website: "",
    whitepaper: "",
    discord: "",
    telegram: "",
    twitter: "",
    github: "",
  });

  const setLink = (key, value) => {
    const nLinks = { ...links };
    nLinks[key] = value;
    setLinks(nLinks);
  };

  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    supply: "",
  });

  const setTokenData = (key, value) => {
    const ntokenInfo = { ...tokenInfo };
    ntokenInfo[key] = value;
    setTokenInfo(ntokenInfo);
  };

  const addPicture = (pics) => {
    setPictures([...pictures, ...pics].slice(0, 8));
  };

  const removePicture = (index) => {
    setPictures(pictures.filter((pic, i) => index !== i));
  };

  useEffect(() => {
    const initiateDrafting = async () => {
      if (draftingKey) {
        setDraftKey(draftingKey);
      } else {
        setDraftKey(`DraftKey:${Math.floor(Math.random() * 100000000)}`);
        const drafts = await localforage.getItem(`UserProjectDrafts`);
        if (drafts && draftKey) {
          localforage.setItem(`UserProjectDrafts`, [...drafts, draftKey]);
        } else {
          localforage.setItem(`UserProjectDrafts`, [draftKey]);
        }
      }
    };

    initiateDrafting();
  }, []);

  useEffect(() => {
    if (initialData) {
      if (initialData.details) {
        if (initialData.details.title) {
          setTitle(initialData.details.title);
        }
      }
    }
  }, [initialData]);

  const projectActions = {
    details: {
      setTitle,
      setAvatar,
      addPicture,
      removePicture,
      setDescription,
      setLink,
    },
    token: {
      setInfo: setTokenData,
    },
  };

  const projectData = {
    details: {
      title,
      avatar,
      pictures,
      description,
      links,
      tokenInfo,
    },
    token: {
      info: tokenInfo,
    },
  };

  useEffect(() => {
    const saveDraft = async () => {
      await localforage.setItem(draftKey, projectData);
      1;
    };

    saveDraft();
  }, [projectData]);

  const submitted = true;

  return (
    <ProjectFormContext.Provider
      value={{ projectData, projectActions, submitted }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
};
