"use client";

import { ENS, Web3Address } from "@/types/web3";
import { ColumnDef } from "@tanstack/react-table";

export type Block = {
  id: string;
  block: number;
  age: number; //timestamp
  txn: number;
  feeRecipient: Web3Address | ENS;
  gasUsed: {
    max: number;
    used: number;
  };
  gasLimit: number;
  baseFee: number;
  reward: string;
  burntFees: string;
};

export const columns: ColumnDef<Block>[] = [
  {
    accessorKey: "block",
    header: "Block"
  },
  {
    accessorKey: "age",
    header: "Age"
  },
  {
    accessorKey: "txn",
    header: "Txn"
  },
  {
    accessorKey: "feeRecipient",
    header: "Fee Recipient"
  },
  {
    accessorKey: "gasUsed",
    header: "Gas Used"
  },
  {
    accessorKey: "gasLimit",
    header: "Gas Limit"
  },
  {
    accessorKey: "baseFee",
    header: "Base Fee"
  },
  {
    accessorKey: "reward",
    header: "Reward"
  },
  {
    accessorKey: "burntFees",
    header: "Burnt Fees"
  }
];
