// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ILSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

interface ILukstaLSP7 is ILSP7DigitalAsset {
    function initialize(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        bool isNonDivisible_,
        address[4] memory initialReceivers_,
        uint256[4] memory initialAmounts_
    ) external;
}
