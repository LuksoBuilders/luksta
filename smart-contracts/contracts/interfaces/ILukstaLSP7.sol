// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ILSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

interface ILukstaLSP7 is ILSP7DigitalAsset {
    function _initialize(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        bool isNonDivisible_,
        address[] memory initialReceivers_,
        uint256[] memory initialAmounts_
    ) external;
}
