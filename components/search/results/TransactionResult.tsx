"use client";

import React from "react";
import Link from "next/link";
import type { TransactionResponse } from "alchemy-sdk";
import hrefs from "@/data/hrefs.json";
import CopyToClipboardButton from "@/components/CopyToClipboard";

interface TransactionResultProps {
  txn: TransactionResponse;
}
const TransactionResult: React.FC<TransactionResultProps> = ({ txn }) => {
  return (
    <div className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg p-2">
      <h2 className="text-lg font-bold">Transaction Hash:</h2>
      <div className="flex space-x-1 items-center">
        <Link className="text-blue-500 truncate" href={`${hrefs.transaction}/${txn.hash}`}>
          {txn.hash}
        </Link>
        <CopyToClipboardButton text={txn.hash} />
      </div>
    </div>
  );
};

export default TransactionResult;
