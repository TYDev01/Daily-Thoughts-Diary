// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {DiaryStorage} from "../storage/DiaryStorage.sol";

abstract contract RewardLogic is DiaryStorage {
    event RewardIssued(address indexed user, uint256 timestamp);

    function _rewardUser(address user) internal {
        if (block.timestamp - lastRewardTimestamp[user] >= 1 days) {
            lastRewardTimestamp[user] = block.timestamp;
            emit RewardIssued(user, block.timestamp);
        }
    }
}
