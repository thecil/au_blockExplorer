"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import type { BlockWithTransactions } from "alchemy-sdk";
import { Icons } from "@/types/components";
import { Stages } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { shortAddress, formatEther } from "@/utils/web3";
import { elapsedTime } from "@/utils/unixTime";
import IconController from "../IconController";
import Loading from "../Loading";
import ToolTipController from "../ToolTipController";
import { Hex } from "@/types/web3";

interface LatestTransactionsControllerProps {
  latestBlockNumber: number;
}

const LatestTransactionsController: React.FC<
  LatestTransactionsControllerProps
> = ({ latestBlockNumber }) => {
  const MAX_TXNS_TO_SHOW = 6;
  const { getBlockWithTransactions } = useAlchemy();
  const [stage, setStage] = useState(Stages.loading);
  const [blockHashOrBlockTag, setBlock] = useState<Hex | number>();
  const [txns, setTxns] = useState<BlockWithTransactions>();

  const _getBlockWithTransactions = async () => {
    const _blockWithTxns = await getBlockWithTransactions(
      blockHashOrBlockTag as number | Hex
    );
    if (_blockWithTxns) setTxns(_blockWithTxns);
    return;
  };

  useEffect(() => {
    if (!txns) {
      if (latestBlockNumber && !blockHashOrBlockTag) {
        setBlock(latestBlockNumber);
        return;
      }
      if (blockHashOrBlockTag) _getBlockWithTransactions();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (txns) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, latestBlockNumber, blockHashOrBlockTag, txns]);

  return (
    <div className="rounded-lg bg-slate-100 dark:bg-black">
      <div className="border-1 border-b p-2 dark:border-b-neutral-800">
        <h2 className="font-bold">Latest Transactions</h2>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && txns && (
        <div className="flex flex-col">
          {txns.transactions.toReversed().map((txn, idx) => (
            <>
              {idx < MAX_TXNS_TO_SHOW && (
                <div
                  key={idx}
                  className="h-28 p-2 border-1 border-b dark:border-b-neutral-800 md:flex md:justify-between md:items-center  md:h-24"
                >
                  {/* txn blockHash */}
                  <div className="md:flex md:space-x-2 md:items-center">
                    <div className="hidden md:inline">
                      <IconController icon={Icons.transaction} />
                    </div>
                    <div className="flex md:flex-col space-x-1">
                      <p className="md:hidden">Transaction</p>
                      <Link
                        className="text-blue-500 w-20 truncate"
                        href={`${hrefs.transaction}/${txn.hash}`}
                      >
                        {txn.hash}
                      </Link>
                      {txn.timestamp && (
                        <p className="text-gray-400">
                          {elapsedTime(txn.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* from/to */}
                  <div className="md:grid md:grid-cols-2 md:gap-2 md:w-2/3 md:justify-items-start">
                    <div className="flex flex-col">
                      {/* From */}
                      <div className="flex space-x-1 ">
                        <p>From </p>
                        <Link
                          className="text-blue-500"
                          href={`${hrefs.address}/${txn.from}`}
                        >
                          {shortAddress(txn.from)}
                        </Link>
                      </div>
                      {/* To */}
                      {txn.to && (
                        <div className="flex space-x-1 ">
                          <p>To </p>
                          <Link
                            className="text-blue-500"
                            href={`${hrefs.address}/${txn.to}`}
                          >
                            {shortAddress(txn.to)}
                          </Link>
                        </div>
                      )}
                    </div>
                    {/* gas price */}
                    {txn.gasPrice && (
                      <div className="px-2 border rounded-lg w-fit h-fit font-medium place-self-center">
                        <ToolTipController content="Amount" side="top">
                          <p>
                            {formatEther(BigInt(txn.value.toString()))?.slice(
                              0,
                              7
                            )}{" "}
                            Eth
                          </p>
                        </ToolTipController>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
          <div className="text-md text-gray-500 text-center py-2">
            <Link className="" href={`${hrefs.transactions}`}>
              View All Transactions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestTransactionsController;
