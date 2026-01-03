// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {DiaryStorage, DiaryVolume} from "../storage/DiaryStorage.sol";

abstract contract DiaryLogic is DiaryStorage {
    event DiaryUpdated(address indexed user, string cid, uint256 timestamp);

    function _appendDiary(address user, string calldata cid) internal {
        userVolumes[user].push(
            DiaryVolume({cid: cid, timestamp: block.timestamp})
        );

        emit DiaryUpdated(user, cid, block.timestamp);
    }

    function _latestCID(address user) internal view returns (string memory) {
        uint256 len = userVolumes[user].length;
        require(len > 0, "No diary volumes");
        return userVolumes[user][len - 1].cid;
    }
}
