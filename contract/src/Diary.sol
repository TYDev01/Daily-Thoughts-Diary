// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IDiary} from "./interfaces/IDiary.sol";
import {DiaryLogic} from "./logic/DiaryLogic.sol";
import {ImageLimitLogic} from "./logic/ImageLimitLogic.sol";
import {RewardLogic} from "./logic/RewardLogic.sol";

abstract contract Diary is IDiary, Ownable, DiaryLogic, ImageLimitLogic, RewardLogic {
    event PremiumStatusChanged(address indexed user, bool isPremium);

    constructor(address initialOwner) Ownable(initialOwner) {}
}
