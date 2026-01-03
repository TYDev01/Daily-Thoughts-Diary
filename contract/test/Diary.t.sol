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

    function testImageLimitEnforcement() public {
        vm.warp(1000);
        vm.startPrank(alice);
        diary.appendDiary("cid-1", 5);

        vm.expectRevert(bytes("Free image limit reached"));
        diary.appendDiary("cid-2", 1);
        vm.stopPrank();
    }

    function testPremiumBypass() public {
        diary.setPremium(alice, true);

        vm.prank(alice);
        diary.appendDiary("cid-1", 6);

        assertEq(diary.freeImageUploadsUsed(alice), 0);
        assertTrue(diary.premiumUser(alice));
    }

    function testRewardTiming() public {
        vm.warp(1 days);
        vm.prank(alice);
        diary.appendDiary("cid-1", 0);

        uint256 firstReward = diary.lastRewardTimestamp(alice);
        assertEq(firstReward, 1 days);

        vm.warp(1 days + 1 hours);
        vm.prank(alice);
        diary.appendDiary("cid-2", 0);
        assertEq(diary.lastRewardTimestamp(alice), firstReward);

        vm.warp(2 days + 1);
        vm.prank(alice);
        diary.appendDiary("cid-3", 0);
        assertEq(diary.lastRewardTimestamp(alice), 2 days + 1);
    }
}
