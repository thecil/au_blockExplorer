"use client";

import React, { useState, useEffect } from "react";
import type { BlockWithTransactions } from "alchemy-sdk";
import { Stages } from "@/types/components";
import { Icons } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import iconDesciptions from "@/data/iconDescriptions.json";
import Tooltip from "@/components/ToolTip";
import Loading from "@/components/Loading";
import IconController from "@/components/IconController";
import BlockDetails from "@/components/web3/blocks/BlockDetails";
import BlockDetailsAccordion from "./BlockDetailsAccordion";

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
    <div className="p-4 min-h-screen md:mx-auto md:w-9/12">
      {/* block number header*/}
      <div className="py-4 border-b border-gray-500 ">
        <div className="flex space-x-2">
          <h2 className="font-bold">Block</h2>
          <p className="text-gray-400">#{blockNumber}</p>
        </div>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && block && (
        <>
          <div className="rounded-lg bg-slate-100 dark:bg-black p-4 mt-2 flex flex-col space-y-2">
            {/* block heigth */}
            <div className="flex flex-col space-y-2  md:flex-row">
              <div className="md:w-96 flex space-x-4 items-center font-semibold dark:text-gray-400">
                <Tooltip message={iconDescription.blockHeight} direction="top">
                  <IconController icon={Icons.help} />
                </Tooltip>
                <p>Block Height:</p>
              </div>
              <p>{block.number}</p>
            </div>
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
