import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DiaryUpdated,
  OwnershipTransferred,
  PremiumStatusChanged,
  RewardIssued
} from "../generated/Diary/Diary"

export function createDiaryUpdatedEvent(
  user: Address,
  cid: string,
  timestamp: BigInt
): DiaryUpdated {
  let diaryUpdatedEvent = changetype<DiaryUpdated>(newMockEvent())

  diaryUpdatedEvent.parameters = new Array()

  diaryUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  diaryUpdatedEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )
  diaryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return diaryUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPremiumStatusChangedEvent(
  user: Address,
  isPremium: boolean
): PremiumStatusChanged {
  let premiumStatusChangedEvent =
    changetype<PremiumStatusChanged>(newMockEvent())

  premiumStatusChangedEvent.parameters = new Array()

  premiumStatusChangedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  premiumStatusChangedEvent.parameters.push(
    new ethereum.EventParam("isPremium", ethereum.Value.fromBoolean(isPremium))
  )

  return premiumStatusChangedEvent
}

export function createRewardIssuedEvent(
  user: Address,
  timestamp: BigInt
): RewardIssued {
  let rewardIssuedEvent = changetype<RewardIssued>(newMockEvent())

  rewardIssuedEvent.parameters = new Array()

  rewardIssuedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  rewardIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return rewardIssuedEvent
}
