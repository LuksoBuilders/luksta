import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";

import LukstaFactoryAbi from "../abis/LukstaFactory.json";

const ExtentionContext = createContext();

export const useExtention = () => {
  return useContext(ExtentionContext);
};

export const ExtentionProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const connectedAccount = accounts[0];

  useEffect(() => {
    if (connectedAccount) {
      console.log("connecting ...");
      connect();
    }
  }, [connectedAccount]);

  const getAccounts = async (provider) => {
    setAccounts(await provider.send("eth_accounts", []));
  };

  useEffect(() => {
    const connectProvider = async () => {
      const web3Provider = window.ethereum
        ? new ethers.providers.Web3Provider(window.ethereum)
        : new ethers.providers.JsonRpcProvider(
            "https://rpc.testnet.lukso.network"
          );
      setProvider(web3Provider);
      getAccounts(web3Provider);
    };

    connectProvider();
  }, []);

  const connect = async () => {
    try {
      if (window.ethereum) {
        if (!connectedAccount) {
          await provider.send("eth_requestAccounts", []);
        }
        const walletSigner = provider.getSigner();
        setProvider(provider);
        getAccounts(provider);
        setSigner(walletSigner);
      } else {
        console.error("No Ethereum provider found");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const isConnected = !!connectedAccount;

  const getLukstaFactory = async (withSigner = false) => {
    const lukstaFactoryAddress = "0x79aDcd003088866e15905ddF41a99B9699f20d96";
    if (withSigner) {
      await connect();
      return new ethers.Contract(
        lukstaFactoryAddress,
        LukstaFactoryAbi,
        signer
      );
    }
    return new ethers.Contract(
      lukstaFactoryAddress,
      LukstaFactoryAbi,
      provider
    );
  };

  return (
    <ExtentionContext.Provider
      value={{
        provider,
        signer,
        connect,
        connectedAccount,
        isConnected,
        getLukstaFactory,
      }}
    >
      <DataProvider provider={provider}>{children}</DataProvider>
    </ExtentionContext.Provider>
  );
};
