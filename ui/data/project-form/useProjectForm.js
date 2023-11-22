import React, { createContext, useContext, useEffect, useState } from "react";
import localforage from "localforage";
import moment from "moment";
import { useExtention } from "../universal-hooks/useExtention";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const { LSPFactory } = require("@lukso/lsp-factory.js/build/main/src/index.js");
const {
  prepareMetadataImage,
} = require("@lukso/lsp-factory.js/build/main/src/lib/helpers/uploader.helper.js");
const {
  defaultUploadOptions,
} = require("@lukso/lsp-factory.js/build/main/src/lib/helpers/config.helper.js");

export const ProjectFormContext = createContext();

export const useProjectForm = () => {
  return useContext(ProjectFormContext);
};

export const ProjectFormProvider = ({ children, initialData, draftingKey }) => {
  const router = useRouter();

  const { provider, signer, getLukstaFactory } = useExtention();

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

  const [description, setDescription] = useState("");

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

  const [vestingSetting, setVestingSetting] = useState({
    founderCliff: 0,
    founderTime: 6,
    investorCliff: 0,
    investorTime: 6,
  });

  const setVestingData = createSetKeyValueState(
    vestingSetting,
    setVestingSetting
  );

  // TODO: must change this when using the drafting key
  const [date, setDate] = useState(
    moment()
      .startOf("isoWeek")
      .add(1, "week")
      .set({ hour: 12, minute: 0, second: 0 })
  );

  const [duration, setDuration] = useState(72);

  const [whitelistEnabled, setWhitelistEnabled] = useState(false);

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
    vesting: {
      setVestingData,
    },
    auction: {
      setDate,
      setDuration,
    },
    whitelisting: {
      setWhitelistEnabled,
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
    vesting: {
      vestingSetting,
    },
    auction: {
      date,
      duration,
    },
    whitelisting: {
      whitelistEnabled,
    },
  };

  useEffect(() => {
    const saveDraft = async () => {
      await localforage.setItem(draftKey, {
        ...projectData,
        auction: {
          date: projectData.auction.date
            ? projectData.auction.date.toDate()
            : undefined,
        },
      });
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

  const [stepOneSubmitted, setStepOneSubmitted] = useState(false);
  const [detailsCompleted, setDetailsComplete] = useState(false);

  const completeDetails = () => {
    setStepOneSubmitted(true);
    if (title && description) {
      setDetailsComplete(true);
      return true;
    }
    return false;
  };

  const [tokenManagementSubmitted, setTokenManagementSubmitted] =
    useState(false);
  const [tokenManagementCompleted, setTokenManagementCompleted] =
    useState(false);

  const completeTokenManagement = () => {
    setTokenManagementSubmitted(true);
    const distributationValidator = () => {
      let isValid = true;
      Object.values(distribution).forEach((item) => {
        if (item < 0) {
          isValid = false;
        }
      });
      if (
        Object.values(distribution).reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ) !== 100
      ) {
        isValid = false;
      }
      return isValid;
    };
    if (
      tokenInfo.name &&
      tokenInfo.supply &&
      !isNaN(Number(tokenInfo.supply)) &&
      Number(tokenInfo.supply) !== 0 &&
      tokenInfo.symbol &&
      distributationValidator()
    ) {
      setTokenManagementCompleted(true);
      return true;
    }
    return false;
  };

  const [vestingCompleted, setVestingCompleted] = useState(false);

  const completeVesting = () => {
    setVestingCompleted(true);
    return true;
  };

  const [auctionManagementSubmitted, setAuctionManagementSubmitted] =
    useState(false);
  const [auctionManagementCompleted, setAuctionManagementCompleted] =
    useState(false);

  const completeAuctionManagement = () => {
    setAuctionManagementSubmitted(true);
    if (duration && duration !== 0 && date.isAfter(new Date())) {
      setAuctionManagementCompleted(true);
      return true;
    }
    return false;
  };

  const [whitelistingCompleted, setWhitelistingCompelted] = useState(false);

  const completeWhitelisting = () => {
    setWhitelistingCompelted(true);
    return true;
  };

  const uploadData = async () => {
    const lspFactory = new LSPFactory(provider);

    const universalProfile = lspFactory.UniversalProfile;

    const prepareMetadataWithDelay = (picture, delay, tries = 0) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            resolve(await prepareMetadataImage(defaultUploadOptions, picture));
          } catch (err) {
            if (tries < 10) {
              return resolve(
                prepareMetadataWithDelay(picture, delay * 2, tries + 1)
              );
            } else {
              reject(`failed after 10 tries: `, err);
            }
          }
        }, delay);
      });
    };

    const sleep = (time) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });

    const uploadingProfileDataWithDelay = (data, delay = 5000, tries = 0) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          console.log(`trying to upload profile with ${delay}ms delay`);
          try {
            resolve(await universalProfile.uploadProfileData(data));
          } catch (err) {
            if (tries < 10) {
              return resolve(
                uploadingProfileDataWithDelay(data, delay * 2, tries + 1)
              );
            } else {
              reject(`failed after 10 tries: `, err);
            }
          }
        }, delay);
      });
    };

    try {
      const images = await Promise.all(
        pictures.map(
          async (picture, i) =>
            await prepareMetadataWithDelay(picture, i * 1000)
        )
      );

      console.log(`images uploaded: `, images);

      const profileData = await uploadingProfileDataWithDelay({
        profileImage: avatar,
        backgroundImage: pictures[0],
        name: title,
        description: description,
        links: Object.entries(links),
        tags: [],
        images,
      });

      return profileData;
    } catch (err) {
      console.log(err);
    }
  };

  const [projectCreationState, setProjectCreationState] = useState("");
  const [projectCreationError, setProjectCreationError] = useState("");

  const stopProjectCreation = () => {
    if (projectCreationState === "Failed") {
      setProjectCreationState("");
      setProjectCreationError("");
    }
  };

  const createProject = async () => {
    let data;
    setProjectCreationState("Uploading Data");
    try {
      data = await uploadData();
    } catch (err) {
      console.log(err);
      setProjectCreationState("Failed");
      setProjectCreationError("Failed to upload project data, try again.");
      return;
    }
    try {
      const offset = 2;
      const hashFunctionBytes = 8;

      const utils = ethers.utils;

      const hashPart = utils
        .keccak256(utils.toUtf8Bytes("keccak256(utf8)"))
        .substring(offset, offset + hashFunctionBytes);

      const { url, json } = data;

      const stringifiedData = JSON.stringify(json);

      const jsonHash = utils
        .keccak256(utils.toUtf8Bytes(stringifiedData))
        .substring(
          2,
          utils.keccak256(utils.toUtf8Bytes(stringifiedData)).length
        );

      console.log(jsonHash);

      const urlBytes = utils
        .hexlify(utils.toUtf8Bytes(url))
        .substring(2, utils.hexlify(utils.toUtf8Bytes(url)).length);

      console.log(urlBytes);

      const lsp3Bytes = `0x${hashPart}${jsonHash}${urlBytes}`;

      console.log(lsp3Bytes, signer);

      const lukstaFactory = await getLukstaFactory(true);

      setProjectCreationState("Waiting for transaction approval");

      const getVestingTimes = (duration, cliff) => {
        if (duration === 0) return [0, 0];
        const now = moment();
        const startTime = now.add(cliff, "months");
        const durationInSeconds = duration * 30.5 * 24 * 3600;
        const getInSecond = (time) => Math.ceil(Number(time) / 1000);
        return [getInSecond(startTime), durationInSeconds];
      };

      const projectCreationTx = await lukstaFactory.createProject(
        lsp3Bytes,
        tokenInfo.name,
        tokenInfo.symbol,
        Object.values(distribution).map((dist) => {
          const totalSupply = ethers.utils.parseEther(tokenInfo.supply);
          return totalSupply.mul(dist).div(100);
        }),
        parseInt(Number(date) / 1000),
        duration,
        [
          ...getVestingTimes(
            vestingSetting.founderTime,
            vestingSetting.founderCliff
          ),
          ...getVestingTimes(
            vestingSetting.investorTime,
            vestingSetting.investorCliff
          ),
        ]
      );

      setProjectCreationState("Waiting for transaction confirmation");
      const receipt = await projectCreationTx.wait();
      console.log("project creation has been completed", receipt);
      setProjectCreationState("Project created.");
      const projectId = await lukstaFactory.projectCounter();
      router.push(`/projects/${projectId}`);
    } catch (err) {
      console.log(err);
      setProjectCreationState("Failed");
      setProjectCreationError("Failed to send transaction.");
      return;
    }
  };

  return (
    <ProjectFormContext.Provider
      value={{
        projectData,
        projectActions,
        submitted,
        isDistributionOkay,
        uploadData,
        stepOneSubmitted,
        detailsCompleted,
        completeDetails,
        tokenManagementCompleted,
        tokenManagementSubmitted,
        completeTokenManagement,
        completeVesting,
        vestingCompleted,
        completeAuctionManagement,
        auctionManagementSubmitted,
        auctionManagementCompleted,
        whitelistingCompleted,
        completeWhitelisting,
        projectCreationState,
        projectCreationError,
        createProject,
        stopProjectCreation,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
};
