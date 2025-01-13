import React from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import { Icons } from "@/types/components";
import type { TransactionResponse } from "alchemy-sdk";
import { shortAddress, formatEther } from "@/utils/web3";
import { elapsedTime } from "@/utils/unixTime";

import IconController from "@/components/IconController";
import ToolTipController from "@/components/ToolTipController";
const TransactionItem = ({
  txn
}: {
  txn: TransactionResponse;
}) => {
  return (
    <div className="md:h-28 p-4 grid gap-4 md:grid-flow-col ">
      {/* txn blockHash */}
      <div className="md:flex md:space-x-2 md:items-center">
        <div className="hidden md:inline">
          <IconController icon={Icons.transaction} />
        </div>
        <div className="md:grid">
          <p className="md:hidden">Transaction</p>
          <Link href={`${hrefs.transaction}/${txn.hash}`}>
            <p className="text-blue-500 w-20 truncate">{txn.hash}</p>
          </Link>
          {txn.timestamp && (
            <p className="text-gray-400">{elapsedTime(txn.timestamp)}</p>
          )}
        </div>
      </div>
      {/* from/to */}
      <div className="self-center">
        {/* From */}
        <div className="flex space-x-1 items-center">
          <p>From </p>
          <Link className="text-blue-500" href={`${hrefs.address}/${txn.from}`}>
            {shortAddress(txn.from)}
          </Link>
        </div>
        {/* To */}
        {txn.to && (
          <div className="flex space-x-1 items-center">
            <p>To </p>
            <Link className="text-blue-500" href={`${hrefs.address}/${txn.to}`}>
              {shortAddress(txn.to)}
            </Link>
          </div>
        )}
      </div>
      {/* gas price */}
      {txn.gasPrice && (
        <div className="place-self-start md:place-self-center">
          <ToolTipController content="Amount" side="top">
            <div className="px-2 border rounded-lg w-fit h-fit font-medium">
              <p>
                {formatEther(BigInt(txn.value.toString()))?.slice(0, 5)} Eth
              </p>
            </div>
          </ToolTipController>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;

