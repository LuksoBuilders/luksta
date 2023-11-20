import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";

const ExtentionContext = createContext();

export const useExtention = () => {
  return useContext(ExtentionContext);
};

export const ExtentionProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [lukstaFactory, setLukstaFactory] = useState();

  useEffect(() => {}, [provider]);

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

  return (
    <ExtentionContext.Provider
      value={{ provider, signer, connect, connectedAccount, isConnected }}
    >
      <DataProvider provider={provider}>{children}</DataProvider>
    </ExtentionContext.Provider>
  );
};
