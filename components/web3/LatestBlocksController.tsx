"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { BlockWithTransactions } from "alchemy-sdk";
import { Stages } from "@/types/components";
import { Icons } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { shortAddress } from "@/utils/web3";
import { elapsedTime, sleep } from "@/utils/unixTime";
import IconController from "../IconController";
import BlockReward from "./BlockReward";
import Loading from "../Loading";

interface LatestBlocksControllerProps {
  latestBlockNumber: number;
}

const LatestBlocksController: React.FC<LatestBlocksControllerProps> = ({
  latestBlockNumber
}) => {
  const MAX_BLOCKS_TO_SHOW = 6;
  const { getBlockWithTransactions } = useAlchemy();
  const [stage, setStage] = useState(Stages.loading);
  const [lastBlock, setLastBlock] = useState(0);
  const [blocks, setBlocks] = useState<BlockWithTransactions[]>([]);

  // get latests blocks data
  const _getBlockWithTransactions = async () => {
    for (let i = 0; i < MAX_BLOCKS_TO_SHOW; i++) {
      await sleep(1000);
      const _block = await getBlockWithTransactions(lastBlock - i);
      if (_block) {
        setBlocks((prevBlocks) => [...prevBlocks, _block]);
      }
    }
    return;
  };

  useEffect(() => {
    if (latestBlockNumber && lastBlock === 0) {
      setLastBlock(latestBlockNumber);
      return;
    }
    if (lastBlock !== 0) {
      if (blocks.length === 0) {
        if (stage !== Stages.loading) setStage(Stages.loading);
        _getBlockWithTransactions();
        return;
      }
      if (blocks.length > 0) {
        if (stage !== Stages.show) setStage(Stages.show);
        return;
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, latestBlockNumber, lastBlock, blocks]);

  return (
    <>
      <div className="rounded-lg bg-slate-50 dark:bg-slate-600">
        <div className="border-1 border-b p-2">
          <h2 className=" font-bold">Latest Blocks</h2>
        </div>
        {stage === Stages.loading && <Loading size={64} />}
        {stage === Stages.show && (
          <div className="flex flex-col">
            {blocks.map((block, idx) => (
              <div key={idx}>
                <div className="p-2 border-1 border-b md:flex md:justify-between md:items-center h-28 md:h-24">
                  {/* block number */}
                  <div className="md:flex md:space-x-2 md:items-center">
                    <div className="hidden md:inline">
                      <IconController icon={Icons.block} />
                    </div>
                    <div className="flex md:flex-col space-x-1">
                      <p className="md:hidden">Block</p>
                      <Link
                        className="text-blue-500"
                        href={`/block/${block.number}`}
                      >
                        {block.number}
                      </Link>
                      <p className="text-gray-500">
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
                          href={`/address/${block.miner}`}
                        >
                          {shortAddress(block.miner)}
                        </Link>
                      </div>
                      {/* total transactions on block */}
                      <div className="flex space-x-1">
                        <p>{block.transactions.length} txns</p>
                        <p className="text-gray-500">in 12 secs</p>
                      </div>
                    </div>
                    <BlockReward block={block} miniComp={true} />
                  </div>
                </div>
              </div>
            ))}
            <div className="text-md text-gray-500 text-center py-2">
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
