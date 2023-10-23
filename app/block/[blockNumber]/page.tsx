"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Block } from "alchemy-sdk";
import { useAlchemy } from "@/hooks/useAlchemy";
import Loading from "@/components/Loading";
import HelpIcon from "@/components/icons/HelpIcon";
import TimeIcon from "@/components/icons/TimeIcon";
import { elapsedTime, unixToDate } from "@/utils/unixTime";
import { shortAddress } from "@/utils/web3";

enum Stages {
  loading = "loading",
  showBlock = "show block",
}
const Page = ({ params }: { params: { blockNumber: string } }) => {
  const [stage, setStage] = useState(Stages.loading);
  const [block, setBlock] = useState<Block>();
  const { getBlock } = useAlchemy();

  const _getBlock = async () => {
    const _block = await getBlock(parseInt(params.blockNumber));
    console.log("_getBlock", { _block });
    if (_block) setBlock(_block);
    return;
  };

  useEffect(() => {
    if (!block) {
      _getBlock();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (block) {
      if (stage !== Stages.showBlock) setStage(Stages.showBlock);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, block]);

  return (
    <div className="p-4 min-h-screen">
      {/* block number header*/}
      <div className="py-4 border-b border-gray-500 ">
        <div className="flex space-x-2">
          <h2 className="font-bold">Block</h2>
          <p className="text-gray-400">#{params.blockNumber}</p>
        </div>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.showBlock && block && (
        <>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4 mt-2 flex flex-col space-y-4">
            {/* block heigth */}
            <div className="flex space-x-4 items-center">
              <HelpIcon />
              <p>Block Height:</p>
              <p>{block.number}</p>
            </div>
            {/* block timestamp */}
            <div className="flex-col space-y-4">
              <div className="flex space-x-4 items-center">
                <HelpIcon />
                <p>Timestamp:</p>
              </div>
              <div className="flex space-x-1">
                <TimeIcon />
                <p>{elapsedTime(block.timestamp)}</p>
                <p>({unixToDate(block.timestamp)})</p>
              </div>
            </div>
            {/* block transactions */}
            <div className="flex-col space-y-4">
              <div className="flex space-x-4 items-center">
                <HelpIcon />
                <p>Transactions:</p>
              </div>
              <div className="flex space-x-1">
                <p>{block.transactions.length} transactions in this block</p>
              </div>
            </div>
            {/* block fee recipient */}
            <div className="flex-col space-y-4">
              <div className="flex space-x-4 items-center">
                <HelpIcon />
                <p>Fee Recipient:</p>
              </div>
              <div className="flex space-x-1">
                <Link
                  className="text-blue-500"
                  href={`/address/${block.miner}`}
                >
                  {shortAddress(block.miner)}
                </Link>
                <p>in 12 secs</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
