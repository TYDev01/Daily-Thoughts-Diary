// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IDiary} from "./interfaces/IDiary.sol";
import {DiaryLogic} from "./logic/DiaryLogic.sol";
import {ImageLimitLogic} from "./logic/ImageLimitLogic.sol";
import {RewardLogic} from "./logic/RewardLogic.sol";

contract Diary is IDiary, Ownable, DiaryLogic, ImageLimitLogic, RewardLogic {
    event PremiumStatusChanged(address indexed user, bool isPremium);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function appendDiary(
        string calldata cid,
        uint8 imagesAdded
    ) external override {
        _enforceImageLimit(msg.sender, imagesAdded);
        _appendDiary(msg.sender, cid);
        _incrementImageCount(msg.sender, imagesAdded);
        _rewardUser(msg.sender);
    }

    function latestCID(
        address user
    ) external view override returns (string memory) {
        return _latestCID(user);
    }

    function getVolumeCount(
        address user
    ) external view override returns (uint256) {
        return userVolumes[user].length;
    }

    function getVolume(
        address user,
        uint256 index
    ) external view override returns (string memory cid, uint256 timestamp) {
        DiaryVolume storage volume = userVolumes[user][index];
        return (volume.cid, volume.timestamp);
    }
}
