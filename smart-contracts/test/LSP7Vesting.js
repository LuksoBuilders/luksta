const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const deployProxy = require("./deployProxy");

describe("LSP7Vesting", function () {
  async function deploy() {
    const [deployer, beneficiary, tokenOwner, to2, to3, to4] =
      await ethers.getSigners();

    const LukstaLSP7 = await ethers.getContractFactory("LukstaLSP7");
    const lukstaLSP7Base = await LukstaLSP7.deploy();

    const lukstaLsp7 = LukstaLSP7.attach(
      await deployProxy(lukstaLSP7Base.address, deployer)
    );

    const totalSupply = 10000000 * 4;

    await lukstaLsp7.initialize(
      "test",
      "tst",
      tokenOwner.address,
      false,
      [tokenOwner.address, to2.address, to3.address, to4.address],
      [10000000, 10000000, 10000000, 10000000]
    );

    const LSP7Vesting = await ethers.getContractFactory("LSP7Vesting");

    const lsp7VestingBase = await LSP7Vesting.deploy();

    const lsp7Vesting = lsp7VestingBase.attach(
      await deployProxy(lsp7VestingBase.address, deployer)
    );

    const now = Math.floor(Number(new Date()) / 1000);
    const offset = 40;
    const startTimestamp = now + offset;

    const duration = 600;

    return {
      lsp7Vesting,
      deployer,
      offset,
      startTimestamp,
      duration,
      beneficiary,
      totalSupply,
      tokenOwner,
      lukstaLsp7,
    };
  }

  async function deployAndInit() {
    const deployParams = await loadFixture(deploy);
    const { lsp7Vesting, beneficiary, startTimestamp, duration } = deployParams;
    await lsp7Vesting.initialize(beneficiary.address, startTimestamp, duration);
    return { ...deployParams };
  }

  describe("Initialization", function () {
    it("Can not initialize with zero address", async function () {
      const { lsp7Vesting, startTimestamp, duration } = await loadFixture(
        deploy
      );

      await expect(
        lsp7Vesting.initialize(
          ethers.constants.AddressZero,
          startTimestamp,
          duration
        )
      ).to.be.revertedWith("VestingWallet: beneficiary is zero address");
    });

    it("Should properly been initialized", async function () {
      const { lsp7Vesting, beneficiary, startTimestamp, duration } =
        await loadFixture(deployAndInit);

      expect(await lsp7Vesting.beneficiary()).to.be.equal(beneficiary.address);
      expect(await lsp7Vesting.start()).to.be.equal(startTimestamp);
      expect(await lsp7Vesting.duration()).to.be.equal(duration);
    });
  });

  describe("Vesting", function () {
    it("Vesting releasable amount", async function () {
      const {
        lsp7Vesting,
        beneficiary,
        startTimestamp,
        duration,
        tokenOwner,
        lukstaLsp7,
        offset,
      } = await loadFixture(deployAndInit);

      const vestingAmount = 1000;

      await lukstaLsp7
        .connect(tokenOwner)
        .transfer(
          tokenOwner.address,
          lsp7Vesting.address,
          vestingAmount,
          true,
          "0x"
        );

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(0);

      await network.provider.send("evm_setNextBlockTimestamp", [
        Number((await lsp7Vesting.start()).add(duration / 2)),
      ]);
      await network.provider.send("evm_mine");

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(vestingAmount / 2);

      await network.provider.send("evm_setNextBlockTimestamp", [
        Number((await lsp7Vesting.start()).add(duration)),
      ]);
      await network.provider.send("evm_mine");

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(vestingAmount / 1);
    });

    it("Vesting released amount", async function () {
      const {
        lsp7Vesting,
        beneficiary,
        startTimestamp,
        duration,
        tokenOwner,
        lukstaLsp7,
        offset,
      } = await loadFixture(deployAndInit);

      const vestingAmount = 1000;

      await lukstaLsp7
        .connect(tokenOwner)
        .transfer(
          tokenOwner.address,
          lsp7Vesting.address,
          vestingAmount,
          true,
          "0x"
        );

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(0);

      await network.provider.send("evm_setNextBlockTimestamp", [
        Number((await lsp7Vesting.start()).add(duration / 2)),
      ]);
      await network.provider.send("evm_mine");

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(500);

      expect(await lukstaLsp7.balanceOf(beneficiary.address)).to.be.equal(0);

      await lsp7Vesting["release(address)"](lukstaLsp7.address);

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(0);

      expect(
        await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      ).to.be.equal(0);

      expect(await lukstaLsp7.balanceOf(beneficiary.address)).to.be.equal(
        await lsp7Vesting["released(address)"](lukstaLsp7.address)
      );

      //await network.provider.send("evm_setNextBlockTimestamp", [
      //  Number((await lsp7Vesting.start()).add(duration)),
      //]);
      //await network.provider.send("evm_mine");
      //
      //expect(
      //  await lsp7Vesting["releasable(address)"](lukstaLsp7.address)
      //).to.be.equal(vestingAmount / 1);
    });
  });
});
