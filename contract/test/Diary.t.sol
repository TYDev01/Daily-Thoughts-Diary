// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";

import {Diary} from "../src/Diary.sol";

contract DiaryTest is Test {
    event DiaryUpdated(address indexed user, string cid, uint256 timestamp);
    event RewardIssued(address indexed user, uint256 timestamp);

    Diary private diary;
    address private owner = address(this);
    address private alice = address(0xA11CE);
}
