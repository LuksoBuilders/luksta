// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ILSP6KeyManager} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/ILSP6KeyManager.sol";
import {ILSP9Vault} from "@lukso/lsp-smart-contracts/contracts/LSP9Vault/ILSP9Vault.sol";
import {ILukstaLSP7} from "./interfaces/ILukstaLSP7.sol";
import {IUniversalProfile} from "./interfaces/IUniversalProfile.sol";

import {_LSP3_PROFILE_KEY} from "@lukso/lsp-smart-contracts/contracts/LSP3ProfileMetadata/LSP3Constants.sol";
import {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY} from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Constants.sol";

contract LukstaFactory is Ownable {
    address public universalProfileBaseContract;
    address public keyManagerBaseContract;
    address public universalDelegateUPBaseContract;
    address public vaultBaseContract;
    address public universalDelegateVaultBaseContract;
    address public lukstaLsp7BaseContract;

    uint256 public projectCounter;

    struct Vault {
        string name;
        address vaultAddress;
    }

    struct Project {
        address universalProfile;
        address keyManager;
        address universalDelegateUp;
        Vault[] vaults;
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
        address lukstaLsp7BaseContract_
    ) {
        setBaseContracts(
            universalProfileBaseContract_,
            keyManagerBaseContract_,
            universalDelegateUPBaseContract_,
            vaultBaseContract_,
            universalDelegateVaultBaseContract_,
            lukstaLsp7BaseContract_
        );
    }

    function setBaseContracts(
        address universalProfileBaseContract_,
        address keyManagerBaseContract_,
        address universalDelegateUPBaseContract_,
        address vaultBaseContract_,
        address universalDelegateVaultBaseContract_,
        address lukstaLsp7BaseContract_
    ) public onlyOwner {
        universalProfileBaseContract = universalProfileBaseContract_;
        keyManagerBaseContract = keyManagerBaseContract_;
        universalDelegateUPBaseContract = universalDelegateUPBaseContract_;
        vaultBaseContract = vaultBaseContract_;
        universalDelegateVaultBaseContract = universalDelegateVaultBaseContract_;
        lukstaLsp7BaseContract = lukstaLsp7BaseContract_;
    }

    function createProject(bytes memory lsp3Profile_) public {
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
        //address projectProfile = Clones.clone(universalProfileImplementation_);
        //address keyManager = Clones.clone(keyManagerImplementation_);
    }
}
