"use client";

import React from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import iconDesciptions from "@/data/iconDescriptions.json";
import { Icons } from "@/types/components";
import { BlockDetailsProps } from "@/types/web3";
import { elapsedTime, unixToDate } from "@/utils/unixTime";
import {
  shortAddress,
  getBlockBurnedFees,
  formatGasToLocaleString,
  fromHex,
  formatEther,
  formatGwei
} from "@/utils/web3";
import IconController from "@/components/IconController";
import BlockOrTxContent from "@/components/web3/BlockOrTxContent";
import BlockReward from "@/components/web3/BlockReward";
import CopyToClipboardButton from "@/components/CopyToClipboard";

const BlockDetails: React.FC<BlockDetailsProps> = ({ block }) => {
  const { block: iconDescription } = iconDesciptions;

  return (
    <>
      {/* block timestamp */}
      <BlockOrTxContent
        title="Timestamp"
        iconDescription={iconDescription.timestamp}
      >
        <div className="flex space-x-1 items-center">
          <IconController icon={Icons.time} size="1.2em" />
          <p>{elapsedTime(block.timestamp)}</p>
          <p>({unixToDate(block.timestamp)})</p>
        </div>
      </BlockOrTxContent>
      {/* block transactions */}
      <BlockOrTxContent
        title="Transactions"
        iconDescription={iconDescription.transactions}
      >
        <p>{block.transactions.length} transactions in this block</p>
      </BlockOrTxContent>
      {/* block fee recipient */}
      <BlockOrTxContent
        title="Fee Recipient"
        iconDescription={iconDescription.feeRecipient}
      >
        <div className="flex space-x-1 items-center">
          <Link
            className="text-blue-300 truncate"
            href={`${hrefs.block}/${block.miner}`}
          >
            {shortAddress(block.miner)}
          </Link>
          <p>in 12 secs</p>
          <CopyToClipboardButton text={block.miner} />
        </div>
      </BlockOrTxContent>
      {/* block reward */}
      <BlockReward block={block} />
      {/* block difficulty */}
      <BlockOrTxContent
        title="Total Difficulty"
        iconDescription={iconDescription.totalDifficulty}
      >
        <p>{block._difficulty.toString()} </p>
      </BlockOrTxContent>
      {/* block gas used */}
      <BlockOrTxContent
        title="Gas Used"
        iconDescription={iconDescription.gasUsed}
      >
        <p>{formatGasToLocaleString(block.gasUsed)} </p>
      </BlockOrTxContent>
      {/* block gas limit */}
      <BlockOrTxContent
        title="Gas Limit"
        iconDescription={iconDescription.gasLimit}
      >
        <p>{formatGasToLocaleString(block.gasLimit)} </p>
      </BlockOrTxContent>
      {/* block base fee per gas */}
      {block.baseFeePerGas && (
        <BlockOrTxContent
          title="Base Fee Per Gas"
          iconDescription={iconDescription.baseFeePerGas}
        >
          <div className="flex space-x-1 items-center">
            <p>{formatEther(BigInt(block.baseFeePerGas.toString()))} ETH</p>
            <p className="text-neutral-400">
              ({formatGwei(BigInt(block.baseFeePerGas.toString()))} Gwei)
            </p>
          </div>
        </BlockOrTxContent>
      )}
      {/* block burnt fees */}
      <BlockOrTxContent
        title="Burnt Fees"
        iconDescription={iconDescription.burntFees}
      >
        <p>{getBlockBurnedFees(block)} ETH</p>
      </BlockOrTxContent>
      {/* block extra data */}
      <BlockOrTxContent
        title="Extra Data"
        iconDescription={iconDescription.extraData}
      >
        <div className="flex flex-col md:flex-row md:space-x-1 items-start truncate">
          <p>{fromHex(block.extraData as `0x${string}`, "string")}</p>
          <p className="text-neutral-400 ">(Hex: {block.extraData})</p>
        </div>
      </BlockOrTxContent>
    </>
  );
};

export default BlockDetails;
