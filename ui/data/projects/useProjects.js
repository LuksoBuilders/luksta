import { useEffect, useState } from "react";
import { useExtention } from "../universal-hooks/useExtention";
import localforage from "localforage";
import { gql } from "@apollo/client";

import client from "../apolloClient";
import { useData } from "../universal-hooks/useData";

const cacheInvalidationTime = 1000 * 5;

const GET_AUCTION = gql`
  query AuctionDetail($auctionDetailId: ID!) {
    auctionDetail(id: $auctionDetailId) {
      id
      auctionId
      currentVolume
      currentClearingPrice
      currentClearingOrderSellAmount
      symbolBiddingToken
      symbolAuctioningToken
      orderCancellationEndDate
      startingTimeStamp
      endTimeTimestamp
      currentBiddingAmount
      currentClearingOrderBuyAmount
      exactOrder {
        volume
        userId
        userAddress
        timestamp
        sellAmount
        price
        id
        buyAmount
        auctionId
      }
    }
  }
`;

export const useProjects = () => {
  const [datas, setDatas] = useState(new Map());
  const [errors, setErrors] = useState(new Map());
  const [loadings, setLoadings] = useState(new Map());

  const [pC, setProjectCounts] = useState(0);

  const getProjectState = (key) => ({
    data: datas.get(key),
    error: errors.get(key),
    loading: loadings.get(key),
  });

  const projects = {
    get items() {
      const items = new Map();
      console.log(pC);
      Array(pC)
        .fill(0)
        .forEach((v, i) => {
          items.set(i + 1, getProjectState(i + 1));
        });
      return items;
    },
  };

  const setData = (projectId, data) => {
    const ndatas = new Map([...datas]);
    ndatas.set(projectId, data);
    setDatas(ndatas);
  };

  const setError = (projectId, error) => {
    const nerrors = new Map([...errors]);
    nerrors.set(projectId, error);
    setErrors(nerrors);
  };

  const setLoading = (projectId, loading) => {
    const nloadings = new Map([...loadings]);
    nloadings.set(projectId, loading);
    setLoadings(nloadings);
  };

  const { getLukstaFactory, getUPContract } = useExtention();

  const { getUPData, getLSP4Data } = useData();

  const cacheKey = `project:{projectId}`;

  const getProjectDataAndCacheIt = async (
    projectId,
    { cacheKey, setLoading, setData, setError }
  ) => {
    try {
      const lukstaFactory = await getLukstaFactory();
      setLoading(projectId, true);
      const project = await lukstaFactory.projects(projectId);
      const projectProfile = await getUPData(project.universalProfile);

      const profileContract = await getUPContract(project.universalProfile);
      const owner = await profileContract.owner();

      const auctionData = await client.query({
        query: GET_AUCTION,
        variables: {
          auctionDetailId: Number(project.auctionId),
        },
      });

      const { auctionDetail } = auctionData.data;

      const data = {
        ...project,
        projectId,
        owner,
        profile: projectProfile,
        auctionDetail,
      };
      setData(projectId, data);
      setLoading(projectId, false);
      await localforage.setItem(cacheKey, {
        data,
        at: new Date(),
      });
    } catch (err) {
      setError(projectId, err);
    }
  };

  const getProject = async (
    projectId,
    { setLoading, setData, setError },
    noCaching
  ) => {
    const cacheKey = `project:${projectId}`;
    let cachedItem;
    if (!noCaching) {
      cachedItem = await localforage.getItem(cacheKey);
      const isCacheInvalidated =
        cachedItem && cachedItem.at
          ? new Date() - cachedItem.at > cacheInvalidationTime
          : true;
      if (isCacheInvalidated) {
        await getProjectDataAndCacheIt(projectId, {
          cacheKey,
          setLoading,
          setData,
          setError,
        });
      } else {
        setData(cachedItem.data);
        setLoading(false);
      }
    } else {
      await getProjectDataAndCacheIt(projectId, {
        cacheKey,
        setLoading,
        setData,
        setError,
      });
    }
  };

  useEffect(() => {
    const main = async () => {
      const lukstaFactory = await getLukstaFactory();
      if (lukstaFactory) {
        const projectsCounts = await lukstaFactory.projectCounter();
        console.log(Number(projectsCounts));
        setProjectCounts(Number(projectsCounts));
        const projectsArray = Array(Number(projectsCounts))
          .fill(0)
          .map((v, i) => i + 1);
        projectsArray.forEach(async (projectId) => {
          getProject(
            projectId,
            {
              setData,
              setError,
              setLoading,
            },
            true
          );
        });
      }
    };

    main();
  }, [getLukstaFactory]);

  return {
    upcoming: projects.items,
    fundedProjects: [],
    trendedProjects: [],
  };
};
