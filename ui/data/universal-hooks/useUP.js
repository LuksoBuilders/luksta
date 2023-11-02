import { useState, useEffect } from "react";
import { useData } from "./useData";
import localforage from "localforage";

const cacheInvalidationTime = 1000 * 60 * 5;

export const useUP = (upAddress, noCaching = false) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { getUPData } = useData();

  const cacheKey = `profile-data:${upAddress}`;

  const getDataAndCacheIt = async () => {
    try {
      setLoading(true);
      const data = await getUPData(upAddress);
      setData(data);
      setLoading(false);
      await localforage.setItem(cacheKey, {
        data,
        at: new Date(),
      });
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    // check cach
    const main = async () => {
      let cachedItem;
      if (!noCaching) {
        cachedItem = await localforage.getItem(cacheKey);
        const isCacheInvalidated =
          cachedItem && cachedItem.at
            ? new Date() - cachedItem.at > cacheInvalidationTime
            : true;
        if (isCacheInvalidated) {
          await getDataAndCacheIt();
        } else {
          setData(cachedItem.data);
          setLoading(false);
        }
      } else {
        await getDataAndCacheIt();
      }
    };

    main();
  }, []);

  const refetch = async () => {
    await getDataAndCacheIt();
  };

  return {
    refetch,
    data,
    error,
    loading,
  };
};
