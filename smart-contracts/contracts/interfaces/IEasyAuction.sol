// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ILSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

interface IEasyAuction {
    // Events
    event NewSellOrder(
        uint256 indexed auctionId,
        uint64 indexed userId,
        uint96 buyAmount,
        uint96 sellAmount
    );
    event CancellationSellOrder(
        uint256 indexed auctionId,
        uint64 indexed userId,
        uint96 buyAmount,
        uint96 sellAmount
    );
    event ClaimedFromOrder(
        uint256 indexed auctionId,
        uint64 indexed userId,
        uint96 buyAmount,
        uint96 sellAmount
    );
    event NewUser(uint64 indexed userId, address indexed userAddress);
    event NewAuction(
        uint256 indexed auctionId,
        address indexed _auctioningToken,
        address indexed _biddingToken,
        uint256 orderCancellationEndDate,
        uint256 auctionEndDate,
        uint64 userId,
        uint96 _auctionedSellAmount,
        uint96 _minBuyAmount,
        uint256 minimumBiddingAmountPerOrder,
        uint256 minFundingThreshold,
        address allowListContract,
        bytes allowListData
    );
    event AuctionCleared(
        uint256 indexed auctionId,
        uint96 soldAuctioningTokens,
        uint96 soldBiddingTokens,
        bytes32 clearingPriceOrder
    );
    event UserRegistration(address indexed user, uint64 userId);

    function initiateAuction(
        ILSP7DigitalAsset _auctioningToken,
        ILSP7DigitalAsset _biddingToken,
        uint256 orderCancellationEndDate,
        uint256 auctionEndDate,
        uint96 _auctionedSellAmount,
        uint96 _minBuyAmount,
        uint256 minimumBiddingAmountPerOrder,
        uint256 minFundingThreshold,
        bool isAtomicClosureAllowed,
        address accessManagerContract,
        bytes memory accessManagerContractData
    ) external returns (uint256);

    // Functions with Modifiers
    function placeSellOrders(
        uint256 auctionId,
        uint96[] calldata _minBuyAmounts,
        uint96[] calldata _sellAmounts,
        bytes32[] calldata _prevSellOrders,
        bytes calldata allowListCallData
    ) external returns (uint64 userId);

    function placeSellOrdersOnBehalf(
        uint256 auctionId,
        uint96[] memory _minBuyAmounts,
        uint96[] memory _sellAmounts,
        bytes32[] memory _prevSellOrders,
        bytes calldata allowListCallData,
        address orderSubmitter
    ) external returns (uint64 userId);

    function cancelSellOrders(
        uint256 auctionId,
        bytes32[] calldata _sellOrders
    ) external;

    function settleAuction(
        uint256 auctionId
    ) external returns (bytes32 clearingOrder);

    function claimFromParticipantOrder(
        uint256 auctionId,
        bytes32[] calldata orders
    ) external returns (uint256, uint256);

    // View Functions
    function getSecondsRemainingInBatch(
        uint256 auctionId
    ) external view returns (uint256);

    function containsOrder(
        uint256 auctionId,
        bytes32 order
    ) external view returns (bool);
}
