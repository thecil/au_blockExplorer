import type {
  TransactionReceipt,
  TransactionResponse,
  BlockWithTransactions
} from "alchemy-sdk";

export type Web3Address = `0x${string}`;
export type ENS = `${string}.eth`;

// used on @tx/page, utils/web3
export interface Transaction {
  receipt: TransactionReceipt | null;
  response: TransactionResponse | null;
}

// used on @utils/web3 => getBlockReward
export interface BlockFees {
  totalTxFees: string;
  burntFees: string;
  blockReward: string;
}

// used on @comps/transactions
export interface TxDetailsProps {
  tx: Transaction;
}

// used on @comps/blocks
export interface BlockDetailsProps {
  block: BlockWithTransactions;
}

export interface AccountProps {
  account: Web3Address;
}