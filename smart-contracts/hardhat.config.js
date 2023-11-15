require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");

const TESTNET_PRIVATE_KEY = "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: "https://rpc.testnet.lukso.network",
      },
    },
    //lukso_testnet: {
    //  url: "https://rpc.testnet.lukso.network",
    //  accounts: [TESTNET_PRIVATE_KEY],
    //},
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      { version: "0.8.20" },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  allowUnlimitedContractSize: true,
};
