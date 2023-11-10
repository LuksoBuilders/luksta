// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {LSP7DigitalAssetInitAbstract} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol";

contract LukstaLSP7 is LSP7DigitalAssetInitAbstract {
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initialize a `LSP7MintableInitAbstract` token contract with: token name = `name_`, token symbol = `symbol_`, and
     * address `newOwner_` as the token contract owner.
     *
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param newOwner_ The owner of the token contract.
     */
    function initialize(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        bool isNonDivisible_,
        address[4] memory initialReceivers_,
        uint256[4] memory initialAmounts_
    ) external initializer {
        LSP7DigitalAssetInitAbstract._initialize(
            name_,
            symbol_,
            newOwner_,
            isNonDivisible_
        );
        require(
            initialReceivers_.length == initialAmounts_.length,
            "wrong initials"
        );
        for (uint i = 0; i < initialAmounts_.length; i++) {
            _mint(initialReceivers_[i], initialAmounts_[i], true, "");
        }
    }
}
