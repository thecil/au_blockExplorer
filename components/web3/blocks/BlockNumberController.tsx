"use client";

import React, { useState, useEffect } from "react";
import type { BlockWithTransactions } from "alchemy-sdk";
import { Stages } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import iconDesciptions from "@/data/iconDescriptions.json";
import Loading from "@/components/Loading";
import BlockDetails from "@/components/web3/blocks/BlockDetails";
import BlockDetailsAccordion from "./BlockDetailsAccordion";
import { Separator } from "@/components/ui/separator";
import BlockOrTxContent from "../BlockOrTxContent";

interface BlockNumberControllerProps {
  blockNumber: string;
}

const BlockNumberController: React.FC<BlockNumberControllerProps> = ({
  blockNumber
}) => {
  const [stage, setStage] = useState(Stages.loading);
  const [block, setBlock] = useState<BlockWithTransactions>();
  const { getBlockWithTransactions } = useAlchemy();
  const { block: iconDescription } = iconDesciptions;

  const _getBlock = async () => {
    const _block = await getBlockWithTransactions(parseInt(blockNumber));
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
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, block]);
  return (
    <div className="p-4 grid gap-4 w-full">
      {/* block number header*/}
      <div>
        <div className="flex space-x-2 text-2xl">
          <h2 className="font-bold">Block</h2>
          <p className="text-gray-400">#{blockNumber}</p>
        </div>
      </div>
      <Separator orientation="horizontal" />
      {stage === Stages.loading && (
        <Loading size={64} text="Loading Block Details" />
      )}
      {stage === Stages.show && block && (
        <>
          <div className="p-4 grid gap-4 rounded-lg bg-slate-100 dark:bg-black">
            {/* block heigth */}
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
