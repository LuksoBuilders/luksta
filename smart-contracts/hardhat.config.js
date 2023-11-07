require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: "https://rpc.testnet.lukso.network",
      },
    },
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
