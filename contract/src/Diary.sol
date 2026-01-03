// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {DiaryLogic} from "./logic/DiaryLogic.sol";
import {ImageLimitLogic} from "./logic/ImageLimitLogic.sol";
import {RewardLogic} from "./logic/RewardLogic.sol";
import {DiaryVolume} from "./storage/DiaryStorage.sol";

contract Diary is Ownable, DiaryLogic, ImageLimitLogic, RewardLogic {
    event PremiumStatusChanged(address indexed user, bool isPremium);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function appendDiary(
        string calldata cid,
        uint8 imagesAdded
    ) external {
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

    function setPremium(
        address user,
        bool isPremium
    ) external override onlyOwner {
        premiumUser[user] = isPremium;
        emit PremiumStatusChanged(user, isPremium);
    }
}
