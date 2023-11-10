// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ILSP6KeyManager} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/ILSP6KeyManager.sol";

import {_LSP3_PROFILE_KEY} from "@lukso/lsp-smart-contracts/contracts/LSP3ProfileMetadata/LSP3Constants.sol";
import {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY} from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Constants.sol";

import {ILukstaLSP7} from "./interfaces/ILukstaLSP7.sol";
import {IUniversalProfile} from "./interfaces/IUniversalProfile.sol";
import {ILukstaLSP9Vault} from "./interfaces/ILukstaLSP9Vault.sol";

contract LukstaFactory is Ownable {
    address public universalProfileBaseContract;
    address public keyManagerBaseContract;
    address public universalDelegateUPBaseContract;
    address public vaultBaseContract;
    address public universalDelegateVaultBaseContract;
    address public lukstaLsp7BaseContract;
    address public vestingBaseContract;

    uint256 public projectCounter;

    struct Project {
        address universalProfile;
        address keyManager;
        address universalDelegateUp;
        address founderVault;
        address investorsVault;
        address treasuryVault;
        address projectToken;
        uint256 auctionId;
    }

    mapping(uint256 => Project) public projects;

    constructor(
        address universalProfileBaseContract_,
        address keyManagerBaseContract_,
        address universalDelegateUPBaseContract_,
        address vaultBaseContract_,
        address universalDelegateVaultBaseContract_,
        address lukstaLsp7BaseContract_,
        address vestingBaseContract_
    ) {
        setBaseContracts(
            universalProfileBaseContract_,
            keyManagerBaseContract_,
            universalDelegateUPBaseContract_,
            vaultBaseContract_,
            universalDelegateVaultBaseContract_,
            lukstaLsp7BaseContract_,
            vestingBaseContract_
        );
    }

    function setBaseContracts(
        address universalProfileBaseContract_,
        address keyManagerBaseContract_,
        address universalDelegateUPBaseContract_,
        address vaultBaseContract_,
        address universalDelegateVaultBaseContract_,
        address lukstaLsp7BaseContract_,
        address vestingBaseContract_
    ) public onlyOwner {
        universalProfileBaseContract = universalProfileBaseContract_;
        keyManagerBaseContract = keyManagerBaseContract_;
        universalDelegateUPBaseContract = universalDelegateUPBaseContract_;
        vaultBaseContract = vaultBaseContract_;
        universalDelegateVaultBaseContract = universalDelegateVaultBaseContract_;
        lukstaLsp7BaseContract = lukstaLsp7BaseContract_;
        vestingBaseContract = vestingBaseContract_;
    }

    function createProject(
        bytes memory lsp3Profile_,
        string memory tokenName_,
        string memory symbol_,
        uint256 totalSupply_,
        uint256[4] memory distributionAmounts_
    ) public {
        projectCounter++;
        Project storage project = projects[projectCounter];
        project.universalProfile = Clones.clone(universalProfileBaseContract);
        IUniversalProfile(project.universalProfile).initialize(address(this));
        IUniversalProfile(project.universalProfile).setData(
            _LSP3_PROFILE_KEY,
            lsp3Profile_
        );
        project.universalDelegateUp = Clones.clone(
            universalDelegateUPBaseContract
        );
        IUniversalProfile(project.universalProfile).setData(
            _LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY,
            abi.encodePacked(project.universalDelegateUp)
        );
        // Setting vaults
        project.founderVault = _setupVault(project.universalProfile);
        project.investorsVault = _setupVault(project.universalProfile);
        project.treasuryVault = _setupVault(project.universalProfile);

        // create token
        project.projectToken = Clones.clone(lukstaLsp7BaseContract);
        ILukstaLSP7(project.projectToken).initialize(
            tokenName_,
            symbol_,
            project.universalProfile,
            false,
            [
                project.founderVault,
                project.investorsVault,
                project.treasuryVault,
                address(this)
            ],
            distributionAmounts_
        );
    }

    function _setupVault(
        address owner_
    ) internal returns (address vaultAddress) {
        vaultAddress = Clones.clone(vaultBaseContract);
        ILukstaLSP9Vault(vaultAddress).initialize(address(this));
        address universalReceiver = Clones.clone(
            universalDelegateVaultBaseContract
        );
        ILukstaLSP9Vault(vaultAddress).setData(
            _LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY,
            abi.encodePacked(universalReceiver)
        );
        ILukstaLSP9Vault(vaultAddress).transferOwnership(owner_);
        (bool success, ) = owner_.call(
            abi.encodeWithSignature(
                "execute(uint256,address,uint256,bytes)",
                0,
                vaultAddress,
                0,
                abi.encodeWithSignature("acceptOwnership()")
            )
        );
        require(success, "ownership failed");
    }
}
