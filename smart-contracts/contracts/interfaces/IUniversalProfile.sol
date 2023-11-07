// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IERC725Y} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";

interface IUniversalProfile is IERC725Y {
    function initialize(address initialOwner) external payable;
}
