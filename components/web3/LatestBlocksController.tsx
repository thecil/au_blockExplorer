"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import type { BlockWithTransactions } from "alchemy-sdk";
import { Stages } from "@/types/components";
import { Icons } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { shortAddress } from "@/utils/web3";
import { elapsedTime, sleep } from "@/utils/unixTime";
import IconController from "../IconController";
import BlockReward from "./BlockReward";
import Loading from "../Loading";
import { Separator } from "../ui/separator";

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
      const _block = await getBlockWithTransactions(lastBlock - i);
      if (_block) {
        setBlocks((prevBlocks) => [...prevBlocks, _block]);
        await sleep(1000);
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
      <div className="rounded-lg bg-slate-100 dark:bg-black h-fit">
        <div className="p-4">
          <h2 className=" font-bold text-xl">Latest Blocks</h2>
        </div>
        <Separator orientation="horizontal" />
        {stage === Stages.loading && (
          <Loading size={64} text="Loading Latest Blocks" className="p-8"/>
        )}
        {stage === Stages.show && (
          <>
            <div className="grid">
              {blocks.map((block, idx) => (
                <>
                  <div key={idx} className="md:h-28 p-4 grid gap-4 md:grid-flow-col ">
                    {/* block number */}
                    <div className="md:flex md:space-x-2 md:items-center">
                      <div className="hidden md:inline">
                        <IconController icon={Icons.block} />
                      </div>
                      <div className="flex md:flex-col space-x-1 items-center">
                        <p className="md:hidden">Block</p>
                        <Link
                          className="text-blue-500"
                          href={`${hrefs.block}/${block.number}`}
                        >
                          {block.number}
                        </Link>
                        <p className="text-gray-500 text-xs">
                          {elapsedTime(block.timestamp)}
                        </p>
                      </div>
                    </div>
                    {/* fee recipient */}
                    <div className="flex space-x-1 items-center">
                      <p>Fee recipient</p>
                      <Link
                        className="text-blue-500"
                        href={`/address/${block.miner}`}
                      >
                        {shortAddress(block.miner)}
                      </Link>
                    </div>
                    {/* total transactions on block */}
                    <div className="flex space-x-1 items-center">
                      <p>{block.transactions.length} txns</p>
                      <p className="text-gray-500 text-sm">in 12 secs</p>
                    </div>
                    {/* block reward */}
                    <div className="place-content-start self-center">
                      <BlockReward block={block} miniComp={true} />
                    </div>
                  </div>
                  {idx < MAX_BLOCKS_TO_SHOW - 1 && (
                    <Separator orientation="horizontal" />
                  )}
                </>
              ))}
            </div>
            <Separator orientation="horizontal" />
            <div className="text-md text-gray-500 text-center py-2">
              <Link className="" href="/blocks">
                View All Blocks
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LatestBlocksController;
