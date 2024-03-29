"use client";

import React, { useEffect, useState } from "react";
import type {
  BlockWithTransactions,
  TransactionReceiptsResponse,
  TransactionReceipt
} from "alchemy-sdk";
import { BlockFees, Hex } from "@/types/web3";
import { Stages } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { getBlockReward } from "@/utils/web3";
import iconDesciptions from "@/data/iconDescriptions.json";
import Loading from "../Loading";
import BlockOrTxContent from "./BlockOrTxContent";
import TooltipController from "../ToolTipController";

interface BlockRewardProps {
  block: BlockWithTransactions;
  miniComp?: boolean; // to show the comp as mini size
}

const BlockReward: React.FC<BlockRewardProps> = ({ block, miniComp }) => {
  const [stage, setStage] = useState(Stages.loading);
  const [blockFees, setBlockFees] = useState<BlockFees | undefined>(undefined);
  const [txnsReceipts, setTxnsReceipts] = useState<
    TransactionReceipt[] | undefined
  >(undefined);
  const { getTransactionReceipts } = useAlchemy();
  const { block: iconDescription } = iconDesciptions;

  const _getTransactionReceipts = async () => {
    const _txnsReceipts: TransactionReceiptsResponse | null =
      await getTransactionReceipts(block.hash as Hex);
    if (_txnsReceipts && _txnsReceipts.receipts)
      setTxnsReceipts(_txnsReceipts.receipts);
    return;
  };

  useEffect(() => {
    if (!blockFees) {
      if (block.hash && !txnsReceipts) {
        _getTransactionReceipts();
        return;
      }
      if (txnsReceipts) {
        const _fees = getBlockReward(block, txnsReceipts);
        // const _fees = null;
        if (_fees) setBlockFees(_fees);
      }
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (blockFees) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, block, txnsReceipts, blockFees]);

  return (
    <>
      {stage === Stages.loading && <Loading size={24} />}
      {stage === Stages.show && blockFees && (
        <>
          {miniComp ? (
            <div className="px-2 border rounded-lg w-fit h-fit font-medium place-self-center">
              <TooltipController content="Block Reward" side="top">
                <p>{blockFees.blockReward.slice(0, 7)} Eth</p>
              </TooltipController>
            </div>
          ) : (
            <BlockOrTxContent
              title="Block Reward"
              iconDescription={iconDescription.blockReward}
            >
              <span>
                {blockFees.blockReward} ETH (0 + {blockFees.totalTxFees} -{" "}
                {blockFees.burntFees})
              </span>
            </BlockOrTxContent>
          )}
        </>
      )}
    </>
  );
};

export default BlockReward;
