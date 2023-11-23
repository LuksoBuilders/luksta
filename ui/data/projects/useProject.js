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

export const useProject = (projectId) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const project = {
    data,
    loading,
    error,
  };

  const { getLukstaFactory, getUPContract } = useExtention();

  const { getUPData, getLSP4Data } = useData();

  const getProjectDataAndCacheIt = async (
    projectId,
    { cacheKey, setLoading, setData, setError }
  ) => {
    try {
      const lukstaFactory = await getLukstaFactory();
      setLoading(true);
      const project = await lukstaFactory.projects(Number(projectId));
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
      setData(data);
      setLoading(false);
      setError("");
      await localforage.setItem(cacheKey, {
        data,
        at: new Date(),
      });
    } catch (err) {
      console.error(err);
      setError(err);
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
      console.log(cachedItem);

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
        getProject(
          projectId,
          {
            setData,
            setError,
            setLoading,
          },
          true
        );
      }
    };

    main();
  }, [getLukstaFactory]);

  return project;
};
