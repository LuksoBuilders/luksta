// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const deploySingle = async (contractName) => {
  const Contract = await hre.ethers.getContractFactory(contractName);
  const instance = await Contract.deploy();

  console.log("???");

  await instance.deployed();

  console.log(
    `${contractName} based contract deployed at: ${instance.address}`
  );

  return instance;
};

async function main() {
  //const keyManager = "0xb228510D275b86ffF65829dD5be51bAD96b536D0";
  //
  //const easyAuctionAddress = "0xed6B3274Ec4D7CEc56d24D7584C0B16a3c592300";
  //
  //const ILYXAddress = "0xBc92DA59222fC799822f92A4D37ccc9B9986187e";
  //
  //let contractsList = {};
  //
  //const contractsNames = [
  //  "LukstaLSP7",
  //  "UniversalReceiverDelegateUP",
  //  "UniversalReceiverDelegateVault",
  //  "UniversalProfile",
  //  "Vault",
  //  "LSP7Vesting",
  //];
  //for (const contractName of contractsNames) {
  //  console.log("starting to deploy: ", contractName);
  //  contractsList[contractName] = await deploySingle(contractName);
  //}
  //
  const LukstaFactory = await hre.ethers.getContractFactory("LukstaFactory");

  //const lukstaFactory = await LukstaFactory.deploy(
  //  contractsList["UniversalProfile"].address,
  //  keyManager,
  //  contractsList["UniversalReceiverDelegateUP"].address,
  //  contractsList["Vault"].address,
  //  contractsList["UniversalReceiverDelegateVault"].address,
  //  contractsList["LukstaLSP7"].address,
  //  contractsList["LSP7Vesting"].address,
  //  easyAuctionAddress,
  //  ILYXAddress
  //);

  const contractsLists = {
    UniversalProfile: "0xf5d395519aAa2eAf1361708acB934c3d2c829d13",
    KeyManager: "0xb228510D275b86ffF65829dD5be51bAD96b536D0",
    UniversalReceiverDelegateUP: "0x2de6124C0C731965aa87Df4f1EbEC5971287e319",
    Vault: "0xf02277cC1B66Dda498693C45653838b08df46B2F",
    UniversalReceiverDelegateVault:
      "0x006c3B5B4ee35504a8f5138396d4a2ABd1Da46b6",
    LukstaLSP7: "0xa520B2F3719fc0c14344cf854D861CFE492a8255",
    LSP7Vesting: "0x7A2E4F7aFB1328EeDF4f05aB9F65255514A591cd",
    EasyAuction: "0xed6B3274Ec4D7CEc56d24D7584C0B16a3c592300",
    ILYXAddress: "0xBc92DA59222fC799822f92A4D37ccc9B9986187e",
  };

  const lukstaFactory = await LukstaFactory.deploy(
    contractsLists["UniversalProfile"],
    contractsLists["KeyManager"],
    contractsLists["UniversalReceiverDelegateUP"],
    contractsLists["Vault"],
    contractsLists["UniversalReceiverDelegateVault"],
    contractsLists["LukstaLSP7"],
    contractsLists["LSP7Vesting"],
    contractsLists["EasyAuction"],
    contractsLists["ILYXAddress"]
  );

  console.log("Luksta Factory address is: ", lukstaFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
