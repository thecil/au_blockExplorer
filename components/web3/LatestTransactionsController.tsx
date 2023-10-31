/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import type { BlockWithTransactions } from "alchemy-sdk";
import Link from "next/link";
import { useAlchemy } from "@/hooks/useAlchemy";
import { IconContext } from "react-icons";
import { IoReaderOutline } from "react-icons/io5";
import { shortAddress, formatEther } from "@/utils/web3";
import { elapsedTime } from "@/utils/unixTime";
import { Stages } from "@/types/components";
import Loading from "../Loading";

interface LatestTransactionsControllerProps {
  latestBlockNumber: number;
}

const LatestTransactionsController: React.FC<
  LatestTransactionsControllerProps
> = ({ latestBlockNumber }) => {
  const MAX_TXNS_TO_SHOW = 6;
  const { getBlockWithTransactions } = useAlchemy();
  const [stage, setStage] = useState(Stages.loading);
  const [blockHashOrBlockTag, setBlock] = useState<string | number>();
  const [txns, setTxns] = useState<BlockWithTransactions>();

  const _getBlockWithTransactions = async () => {
    const _blockWithTxns = await getBlockWithTransactions(
      blockHashOrBlockTag as number | string
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
  }, [stage, latestBlockNumber, blockHashOrBlockTag, txns]);

  return (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-600">
      <div className="border-1 border-b p-2">
        <h2 className=" font-bold">Latest Transactions</h2>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && txns && (
        <div className="flex flex-col">
          {txns.transactions.toReversed().map((txn, idx) => (
            <>
              {idx < MAX_TXNS_TO_SHOW && (
                <div key={idx}>
                  <div className="h-28 p-2 border-1 border-b md:flex md:justify-between md:items-center  md:h-24">
                    {/* txn blockHash */}
                    <div className="md:flex md:space-x-2 md:items-center">
                      <div className="hidden md:inline">
                        <IconContext.Provider value={{ size: "2em" }}>
                          <div>
                            <IoReaderOutline />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="flex md:flex-col space-x-1">
                        <p className="md:hidden">Transaction</p>
                        <Link
                          className="text-blue-500 w-20 truncate"
                          href={`/tx/${txn.hash}`}
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
                            href={`/block/${txn.from}`}
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
                              href={`/txn/${txn.to}`}
                            >
                              {shortAddress(txn.to)}
                            </Link>
                          </div>
                        )}
                      </div>
                      {txn.gasPrice && (
                        <div className="px-2 border rounded-lg w-fit h-fit font-medium place-self-center">
                          <p>
                            {formatEther(BigInt(txn.value.toString()))?.slice(
                              0,
                              7
                            )}{" "}
                            Eth
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
          <div className="text-md text-gray-500 text-center py-2">
            <Link className="" href="/txs">
              View All Transactions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestTransactionsController;
