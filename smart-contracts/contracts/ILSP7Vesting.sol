// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ILSP7Vesting {
    function initialize(
        address beneficiaryAddress,
        uint64 startTimestamp,
        uint64 durationSeconds
    ) external payable;
}
