// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ILSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

import {VestingWalletUpgradeable} from "./LSP7VestingBase/VestingWalletUpgradeable.sol";

contract LSP7Vesting is VestingWalletUpgradeable {
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address beneficiaryAddress,
        uint64 startTimestamp,
        uint64 durationSeconds
    ) external payable virtual initializer {
        __VestingWallet_init(
            beneficiaryAddress,
            startTimestamp,
            durationSeconds
        );
    }
}
