// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";

import {Diary} from "../src/Diary.sol";

contract DiaryDeploy is Script {
    function run() external returns (Diary deployed) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        deployed = new Diary(msg.sender);
        vm.stopBroadcast();
    }
}
