// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {DiaryStorage} from "../storage/DiaryStorage.sol";

abstract contract ImageLimitLogic is DiaryStorage {
    function _enforceImageLimit(address user, uint8 imagesAdded) internal view {
        require(
            premiumUser[user] || freeImageUploadsUsed[user] + imagesAdded <= 5,
            "Free image limit reached"
        );
    }

    function _incrementImageCount(address user, uint8 imagesAdded) internal {
        if (!premiumUser[user] && imagesAdded > 0) {
            freeImageUploadsUsed[user] += imagesAdded;
        }
    }
}
