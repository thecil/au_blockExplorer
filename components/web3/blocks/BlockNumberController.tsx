"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Stages } from "@/types/components";
import { useBlockQuery, useLatestBlockQuery } from "@/queries/block-query";
import iconDescriptions from "@/data/iconDescriptions.json";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/Loading";
import BlockDetails from "@/components/web3/blocks/BlockDetails";
import BlockDetailsAccordion from "./BlockDetailsAccordion";
import BlockOrTxContent from "../BlockOrTxContent";

interface BlockNumberControllerProps {
  blockNumber: string;
}

const BlockNumberController: React.FC<BlockNumberControllerProps> = ({
  blockNumber
}) => {
  const router = useRouter();
  const { block: iconDescription } = iconDescriptions;
  const [stage, setStage] = useState(Stages.loading);
  const { latestBlockQuery } = useLatestBlockQuery();
  const { blockWithTxsQuery } = useBlockQuery(parseInt(blockNumber));
  const { data: block, isLoading } = blockWithTxsQuery;
  const { data: latestBlockNumber } = latestBlockQuery;

  const uncleBlocks = {
    prev: parseInt(blockNumber) - 1,
    next: parseInt(blockNumber) + 1
  };

  useEffect(() => {
    if (isLoading) {
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (block) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, block, isLoading]);
  return (
    <div className="container grid gap-4 w-full">
      {/* block number header*/}
      <div>
        <div className="flex space-x-2 text-2xl">
          <h2 className="font-bold ">Block</h2>
          {/* block number & prev/next buttons */}
          <div className="flex space-x-1 items-end">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => router.push(`/block/${uncleBlocks.prev}`)}
            >
              <ChevronLeft />
            </Button>
            <p className="text-gray-400">#{blockNumber}</p>
            {latestBlockNumber && uncleBlocks.next <= latestBlockNumber ? (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => router.push(`/block/${uncleBlocks.next}`)}
              >
                <ChevronRight />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" />
      {stage === Stages.loading && (
        <Loading size={64} text="Loading Block Details" />
      )}
      {stage === Stages.show && block && (
        <>
          <div className="p-4 grid gap-4 rounded-lg bg-slate-100 dark:bg-black">
            {/* block height */}
            <BlockOrTxContent
              title="Block Heigh"
              iconDescription={iconDescription.blockHeight}
            >
              <p>{block.number}</p>
            </BlockOrTxContent>
            <BlockDetails block={block} />
          </div>
          {/* more details accordion */}
          <BlockDetailsAccordion block={block} />
        </>
      )}
    </div>
  );
};

export default BlockNumberController;
