import type { Block } from "alchemy-sdk";
import { formatEther } from "viem";

export const shortAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(
    address.length - 5,
    address.length
  )}`;

export const blockReward = (block: Block) => {
  if (block.baseFeePerGas) {
    const _blockReward = block.baseFeePerGas.mul(block.gasUsed);
    return formatEther(BigInt(_blockReward.toString()));
  }
};