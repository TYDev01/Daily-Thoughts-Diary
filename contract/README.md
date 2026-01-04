## ChainDiary Contracts (Foundry)

Modular smart contracts for an on-chain diary on Base. The system separates
storage and logic for clarity and auditability.

## Structure

src/Diary.sol  
src/storage/DiaryStorage.sol  
src/logic/DiaryLogic.sol  
src/logic/RewardLogic.sol  
src/logic/ImageLimitLogic.sol  
src/interfaces/IDiary.sol  

## Requirements

- Foundry
- OpenZeppelin Contracts in `lib/openzeppelin-contracts`

If you need to install OpenZeppelin:

```shell
forge install OpenZeppelin/openzeppelin-contracts
```

## Build

```shell
forge build
```

## Test

```shell
forge test
```

## Deploy (Base Sepolia)

Create `contract/.env` with:

```
PRIVATE_KEY=...
BASE_SEPOLIA_RPC_URL=...
ETHERSCAN_API_KEY=...
```

Deploy using the script:

```shell
source .env
forge script script/DiaryDeploy.s.sol:DiaryDeploy --rpc-url "$BASE_SEPOLIA_RPC_URL" --broadcast
```

## Verify (Base Sepolia)

Constructor args use the deployer address as owner.

```shell
source .env
cast abi-encode "constructor(address)" <deployer_address>
forge verify-contract --chain base-sepolia --etherscan-api-key "$ETHERSCAN_API_KEY" --constructor-args <encoded_args> <deployed_address> src/Diary.sol:Diary --watch
```
