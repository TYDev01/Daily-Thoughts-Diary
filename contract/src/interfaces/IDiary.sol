// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IDiary {
    event DiaryUpdated(address indexed user, string cid, uint256 timestamp);
    event RewardIssued(address indexed user, uint256 timestamp);
    event PremiumStatusChanged(address indexed user, bool isPremium);

    function appendDiary(string calldata cid, uint8 imagesAdded) external;

    function latestCID(address user) external view returns (string memory);

    function getVolumeCount(address user) external view returns (uint256);

    function getVolume(
        address user,
        uint256 index
    ) external view returns (string memory cid, uint256 timestamp);

    function setPremium(address user, bool isPremium) external;

    function premiumUser(address user) external view returns (bool);

    function freeImageUploadsUsed(address user) external view returns (uint8);

    function lastRewardTimestamp(address user) external view returns (uint256);
}
