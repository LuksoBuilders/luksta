const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Luksta Factory", function () {
  async function deploy() {
    const keyManagerBaseAddress = "0xb228510D275b86ffF65829dD5be51bAD96b536D0";

    const keyManager = await ethers.getContractAt(
      "KeyManager",
      keyManagerBaseAddress
    );

    const LukstaLSP7 = await ethers.getContractFactory("LukstaLSP7");
    const lukstaLsp7 = await LukstaLSP7.deploy();

    const UniversalReceiverDelegateUP = await ethers.getContractFactory(
      "UniversalReceiverDelegateUP"
    );
    const universalReceiverDelegateUP =
      await UniversalReceiverDelegateUP.deploy();

    const UniversalReceiverDelegateVault = await ethers.getContractFactory(
      "UniversalReceiverDelegateVault"
    );
    const universalReceiverDelegateVault =
      await UniversalReceiverDelegateVault.deploy();

    const UniversalProfile = await ethers.getContractFactory(
      "UniversalProfile"
    );
    const universalProfile = await UniversalProfile.deploy();

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();

    const LukstaFactory = await ethers.getContractFactory("LukstaFactory");
    const lukstaFactory = await LukstaFactory.deploy(
      universalProfile.address,
      keyManager.address,
      universalReceiverDelegateUP.address,
      vault.address,
      universalReceiverDelegateVault.address,
      lukstaLsp7.address
    );
    return {
      lukstaFactory,
      keyManager,
      lukstaLsp7,
      universalReceiverDelegateUP,
      universalReceiverDelegateVault,
      universalProfile,
      vault,
    };
  }

  describe("Deployment", function () {
    it("Should set the base contracts", async function () {
      const {
        keyManager,
        lukstaFactory,
        lukstaLsp7,
        universalReceiverDelegateUP,
        universalReceiverDelegateVault,
        universalProfile,
        vault,
      } = await loadFixture(deploy);

      expect(await lukstaFactory.universalProfileBaseContract()).to.equal(
        universalProfile.address
      );
      expect(await lukstaFactory.keyManagerBaseContract()).to.equal(
        keyManager.address
      );
      expect(await lukstaFactory.universalDelegateUPBaseContract()).to.equal(
        universalReceiverDelegateUP.address
      );
      expect(await lukstaFactory.universalDelegateVaultBaseContract()).to.equal(
        universalReceiverDelegateVault.address
      );
      expect(await lukstaFactory.vaultBaseContract()).to.equal(vault.address);
      expect(await lukstaFactory.lukstaLsp7BaseContract()).to.equal(
        lukstaLsp7.address
      );
    });
  });

  describe("Create a project", function () {
    it("Should create clones and set keys", async function () {
      const {
        keyManager,
        lukstaFactory,
        lukstaLsp7,
        universalReceiverDelegateUP,
        universalReceiverDelegateVault,
        universalProfile,
        vault,
      } = await loadFixture(deploy);

      const testUp = "0x117E85BA40b00bF6647f60ebD023992932E2AcB6";

      const LSP3ProfileKey =
        "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5";

      const TestLSP3ProfileValue =
        "0x6f357c6a573cee3dd29a31f1af7c0e09710da9613ba232e52bdbd3bddced8eb2254f9adf697066733a2f2f516d5774366e4d6670464a637a64375173666b48333554364165574c5852344355696633694b6459716638366762";

      const _LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY =
        "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47";

      await lukstaFactory.createProject(TestLSP3ProfileValue);

      const createdProject = await lukstaFactory.projects(1);

      expect(
        await universalProfile
          .attach(createdProject.universalProfile)
          .getData(LSP3ProfileKey)
      ).to.be.equal(TestLSP3ProfileValue);

      expect(
        await universalProfile
          .attach(createdProject.universalProfile)
          .getData(LSP3ProfileKey)
      ).to.be.equal(TestLSP3ProfileValue);

      console.log(createdProject);

      expect(
        (
          await universalProfile
            .attach(createdProject.universalProfile)
            .getData(_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY)
        ).toLowerCase()
      ).to.be.equal(createdProject.universalDelegateUp.toLowerCase());
    });
  });
});
