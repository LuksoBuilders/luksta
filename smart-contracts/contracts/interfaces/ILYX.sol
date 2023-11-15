// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ILSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

interface ILYX is ILSP7DigitalAsset {
    function deposit() external payable;

    function withdraw(uint256) external;
}
