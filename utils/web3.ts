import type { BigNumber, BlockWithTransactions } from "alchemy-sdk";
import { formatEther } from "viem";

export * from "viem";

export const shortAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(
    address.length - 5,
    address.length
  )}`;

// calculate the block rewards
export const blockReward = (block: BlockWithTransactions): string | undefined => {
  if (block.baseFeePerGas) {
    const _blockReward = block.baseFeePerGas.mul(block.gasUsed);
    return formatEther(BigInt(_blockReward.toString()));
  }
  return undefined;
};

export const formatGasToLocaleString = (amount: BigNumber) =>
  Number(amount).toLocaleString();
