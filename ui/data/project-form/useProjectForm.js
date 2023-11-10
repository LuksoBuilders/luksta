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

  const addPicture = (pics) => {
    setPictures([...pictures, ...pics].slice(0, 8));
  };

  const removePicture = (index) => {
    setPictures(pictures.filter((pic, i) => index !== i));
  };

  const [description, setDescription] = useState([]);

  const createSetKeyValueState = (state, setState) => {
    return (key, value) => {
      const desiredState = { ...state };
      desiredState[key] = value;
      setState(desiredState);
    };
  };

  const [links, setLinks] = useState({
    website: "",
    whitepaper: "",
    discord: "",
    telegram: "",
    twitter: "",
    github: "",
  });
  const setLink = createSetKeyValueState(links, setLinks);

  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    supply: "",
  });

  const setTokenData = createSetKeyValueState(tokenInfo, setTokenInfo);

  const [distribution, setDistribution] = useState({
    founder: 25,
    treasury: 25,
    investors: 25,
    publicSale: 25,
  });

  const setDistributionData = createSetKeyValueState(
    distribution,
    setDistribution
  );

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
      setDistribution: setDistributionData,
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
      distribution,
    },
  };

  useEffect(() => {
    const saveDraft = async () => {
      await localforage.setItem(draftKey, projectData);
      1;
    };

    saveDraft();
  }, [projectData]);

  const isDistributionOkay =
    Number(distribution.founder) +
      Number(distribution.investors) +
      Number(distribution.publicSale) +
      Number(distribution.treasury) ===
    100;

  const canSubmit = () => {
    if (!isDistributionOkay) return false;
    return false;
  };

  const submitted = false;

  return (
    <ProjectFormContext.Provider
      value={{ projectData, projectActions, submitted, isDistributionOkay }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
};
