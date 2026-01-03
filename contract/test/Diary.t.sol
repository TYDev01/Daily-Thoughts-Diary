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

    function setUp() public {
        diary = new Diary(owner);
    }

    function testAppendDiaryStoresVolume() public {
        vm.warp(1000);
        vm.prank(alice);
        diary.appendDiary("cid-1", 1);

        assertEq(diary.getVolumeCount(alice), 1);

        (string memory cid, uint256 timestamp) = diary.getVolume(alice, 0);
        assertEq(cid, "cid-1");
        assertEq(timestamp, 1000);
    }
}
