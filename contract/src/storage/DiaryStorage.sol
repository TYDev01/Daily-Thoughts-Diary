// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct DiaryVolume {
    string cid;
    uint256 timestamp;
}

abstract contract DiaryStorage {
    mapping(address => DiaryVolume[]) internal userVolumes;
    mapping(address => uint256) public lastRewardTimestamp;
    mapping(address => uint8) public freeImageUploadsUsed;
    mapping(address => bool) public premiumUser;
}
