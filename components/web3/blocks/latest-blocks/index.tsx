"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Stages } from "@/types/components";
import { sleep } from "@/utils/unixTime";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import BlockItem from "./block-item";

interface LatestBlocksControllerProps {
  latestBlockNumber: number;
}

const LatestBlocksController = ({
  latestBlockNumber
}: LatestBlocksControllerProps) => {
  const MAX_BLOCKS_TO_SHOW = 6;
  const [stage, setStage] = useState(Stages.loading);
  const [lastBlock, setLastBlock] = useState(0);
  const [blocks, setBlocks] = useState<number[]>([]);

  // set past blocks numbers
  const setPastBlocks = async () => {
    for (let i = 0; i < MAX_BLOCKS_TO_SHOW; i++) {
      setBlocks((prevBlocks) => [...prevBlocks, lastBlock - i]);
      await sleep(1000);
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
        setPastBlocks();
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
    <div className="rounded-lg bg-slate-100 dark:bg-black h-fit">
      <div className="p-4">
        <h2 className=" font-bold text-xl">Latest Blocks</h2>
      </div>
      <Separator orientation="horizontal" />
      {stage === Stages.loading && (
        <Loading size={64} text="Loading Latest Blocks" className="p-8" />
      )}
      {stage === Stages.show && (
        <>
          <div className="grid">
            {blocks.map((blockNumber, idx) => (
              <>
                <BlockItem blockNumber={blockNumber} key={idx} />
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
  );
};

export default LatestBlocksController;
