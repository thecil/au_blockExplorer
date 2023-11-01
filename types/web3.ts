import type { TransactionReceipt, TransactionResponse } from "alchemy-sdk";
// used on tx/page, utils/web3
export interface Transaction {
    receipt: TransactionReceipt | null;
    response: TransactionResponse | null;
}

// used on utils/web3 => getBlockReward
export interface BlockFees {
    totalTxFees: string;
    burntFees: string;
    blockReward: string;
  }