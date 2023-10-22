"use client";

import type { Block } from "alchemy-sdk";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAlchemy } from "@/hooks/useAlchemy";
import { IconContext } from "react-icons";
import { IoCubeOutline } from "react-icons/io5";
import { shortAddress, blockReward } from "@/utils/web3";
import { elapsedTime } from "@/utils/unixTime";

const LatestBlocks = () => {
  const { getBlock, latestBlockNumber } = useAlchemy();
  const MAX_BLOCKS_TO_SHOW = 6;
  const [blocks, setBlocks] = useState<Block[]>([]);

  const _getBlock = async () => {
    const _block = await getBlock(latestBlockNumber as number);
    if (_block) {
      setBlocks((prevBlocks) => [...prevBlocks, _block]);
    }
    return;
  };
  useEffect(() => {
    if (latestBlockNumber) {
      if (blocks.length < MAX_BLOCKS_TO_SHOW) _getBlock();
    }
    return;
  }, [latestBlockNumber]);

  return (
    <>
      <div className="rounded-lg bg-slate-50 dark:bg-slate-600">
        <div className="border-1 border-b p-2">
          <h2 className=" font-bold">Latest Blocks</h2>
        </div>
        <div className="flex flex-col">
          {blocks.length > 0 && (
            <>
              {blocks.toReversed().map((block, idx) => (
                <div key={idx}>
                  <div className="p-2 border-1 border-b md:flex md:justify-between">
                    {/* block number */}
                    <div className="md:flex md:space-x-2 md:items-center">
                      <div className="hidden md:inline">
                        <IconContext.Provider value={{ size: "2em" }}>
                          <div>
                            <IoCubeOutline />
                          </div>
                        </IconContext.Provider>
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
                    <div className="md:grid md:grid-cols-2 md:gap-2 md:w-2/3">
                      <div className="flex flex-col items-start">
                        {/* fee recipient */}
                        <div className="flex space-x-1 ">
                          <p>Fee recipient </p>
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
            </>
          )}
          <div className="text-md text-gray-400 text-center py-2">
            <Link className="" href="/blocks">
              View All Blocks
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestBlocks;
