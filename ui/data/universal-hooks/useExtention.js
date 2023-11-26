import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { DataProvider } from "./useData";

import LukstaFactoryAbi from "../abis/LukstaFactory.json";
import UniversalProfileAbi from "../abis/UniversalProfile.json";
import WLYX from "../abis/WLYX.json";
import DepositAndPlaceOrder from "../abis/DepositAndPlaceOrder.json";

const ExtentionContext = createContext();

export const useExtention = () => {
  return useContext(ExtentionContext);
};

export const ExtentionProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);

  console.log(accounts);

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
    const lukstaFactoryAddress = "0x2A266C43B4561a28f9fB481b4780A41Cc829766A";
    if (withSigner) {
      await connect();
      return new ethers.Contract(
        lukstaFactoryAddress,
        LukstaFactoryAbi,
        signer
      );
    }
    if (provider) {
      return new ethers.Contract(
        lukstaFactoryAddress,
        LukstaFactoryAbi,
        provider
      );
    }
  };

  const getUPContract = async (address, withSigner = false) => {
    const upAddress = address;
    if (withSigner) {
      await connect();
      return new ethers.Contract(upAddress, UniversalProfileAbi, signer);
    }
    if (provider) {
      return new ethers.Contract(upAddress, UniversalProfileAbi, provider);
    }
  };

  const getWLYX = async (withSigner = false) => {
    const wlyxAddress = "0xBc92DA59222fC799822f92A4D37ccc9B9986187e";
    if (withSigner) {
      await connect();
      return new ethers.Contract(wlyxAddress, WLYX, signer);
    }
    if (provider) {
      return new ethers.Contract(wlyxAddress, WLYX, provider);
    }
  };

  const getDepositAndPlaceOrder = async (withSigner = false) => {
    const depositAndPlaceOrderAddress =
      "0x1B7B7393fF6D18FDA01e89777b11a7dbAfE59399";
    if (withSigner) {
      await connect();
      return new ethers.Contract(
        depositAndPlaceOrderAddress,
        DepositAndPlaceOrder,
        signer
      );
    }
    if (provider) {
      return new ethers.Contract(
        depositAndPlaceOrderAddress,
        DepositAndPlaceOrder,
        provider
      );
    }
  };

  return (
    <ExtentionContext.Provider
      value={{
        provider,
        accounts,
        signer,
        connect,
        connectedAccount,
        isConnected,
        getLukstaFactory,
        getUPContract,
        getWLYX,
        getDepositAndPlaceOrder,
      }}
    >
      <DataProvider provider={provider}>{children}</DataProvider>
    </ExtentionContext.Provider>
  );
};
