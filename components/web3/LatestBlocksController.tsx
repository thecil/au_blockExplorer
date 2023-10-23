"use client";

import type { Block } from "alchemy-sdk";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../Loading";
import { useAlchemy } from "@/hooks/useAlchemy";
import { shortAddress, blockReward } from "@/utils/web3";
import { elapsedTime } from "@/utils/unixTime";
import BlockIcon from "../icons/BlockIcon";

enum Stages {
  loading = "loading",
  showList = "show list",
}

const LatestBlocksController: React.FC = () => {
  const [stage, setStage] = useState(Stages.loading);
  const { getBlock, latestBlockNumber } = useAlchemy();
  const MAX_BLOCKS_TO_SHOW = 6;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [lastBlock, setLastBlock] = useState(0);

  // get latests blocks data
  const _getBlocks = async () => {
    for (let i = 0; i < MAX_BLOCKS_TO_SHOW; i++) {
      const _block = await getBlock(lastBlock - i);
      if (_block) {
        setBlocks((prevBlocks) => [...prevBlocks, _block]);
      }
    }
    return;
  };

  useEffect(() => {
    if (latestBlockNumber && lastBlock === 0) setLastBlock(latestBlockNumber);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBlockNumber]);

  useEffect(() => {
    if (lastBlock !== 0) {
      if (blocks.length === 0) {
        _getBlocks();
        if (stage !== Stages.loading) setStage(Stages.loading);
        return;
      }
      if (blocks.length > 0) {
        if (stage !== Stages.showList) setStage(Stages.showList);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, lastBlock, blocks]);

  return (
    <>
      <div className="rounded-lg bg-slate-50 dark:bg-slate-600">
        <div className="border-1 border-b p-2">
          <h2 className=" font-bold">Latest Blocks</h2>
        </div>
        {stage === Stages.loading && <Loading size={64} />}
        {stage === Stages.showList && (
          <div className="flex flex-col">
            {blocks.map((block, idx) => (
              <div key={idx}>
                <div className="p-2 border-1 border-b md:flex md:justify-between md:items-center h-28 md:h-24">
                  {/* block number */}
                  <div className="md:flex md:space-x-2 md:items-center">
                    <div className="hidden md:inline">
                      <BlockIcon />
                    </div>
                    <div className="flex md:flex-col space-x-1">
                      <p className="md:hidden">Block</p>
                      <Link
                        className="text-blue-500"
                        href={`/block/${block.number}`}
                      >
                        {block.number}
                      </Link>
                      <p className="text-gray-400">
                        {elapsedTime(block.timestamp)}
                      </p>
                    </div>
                  </div>
                  {/* block data */}
                  <div className="md:grid md:grid-cols-2 md:gap-2 md:w-2/3 md:justify-items-start">
                    <div className="flex flex-col">
                      {/* fee recipient */}
                      <div className="flex space-x-1 ">
                        <p>Fee recipient</p>
                        <Link
                          className="text-blue-500"
                          href={`/block/${block.number}`}
                        >
                          {shortAddress(block.miner)}
                        </Link>
                      </div>
                      {/* total transactions on block */}
                      <div className="flex space-x-1">
                        <p>{block.transactions.length} txns</p>
                        <p className="text-gray-400">in 12 secs</p>
                      </div>
                    </div>
                    <div className="px-2 border rounded-lg w-fit h-fit font-medium place-self-center">
                      <p>{blockReward(block)?.slice(0, 7)} Eth</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-md text-gray-400 text-center py-2">
              <Link className="" href="/blocks">
                View All Blocks
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LatestBlocksController;
