"use client";

import React from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import iconDesciptions from "@/data/iconDescriptions.json";
import { Icons } from "@/types/components";
import { TxDetailsProps } from "@/types/web3";
import { getTransactionFee, formatEther, formatGwei } from "@/utils/web3";
import { elapsedTime, unixToDate } from "@/utils/unixTime";
import CopyToClipboardButton from "@/components/CopyToClipboard";
import IconController from "@/components/IconController";
import BadgeController from "@/components/BadgeController";
import BlockOrTxContent from "@/components/web3/BlockOrTxContent";

const TxDetails: React.FC<TxDetailsProps> = ({ tx }) => {
  const { transaction: iconDescription } = iconDesciptions;

  return (
    <>
      {/* tx status */}
      <BlockOrTxContent title="Status" iconDescription={iconDescription.status}>
        {tx.receipt?.status === 1 ? (
          <div className=" flex space-x-1 items-center w-fit py-1 px-2 border border-green-700 rounded-lg bg-emerald-950 text-emerald-500 text-sm">
            <IconController icon={Icons.circleCheck} size="16" />
            <p>Success</p>
          </div>
        ) : (
          <div className="flex space-x-1 items-center w-fit py-1 px-2 border border-red-700 rounded-lg bg-pink-950 text-red-500 text-sm">
            <IconController icon={Icons.circleClose} size="16" />
            <p>Fail</p>
          </div>
        )}
      </BlockOrTxContent>
      {/* tx block */}
      <BlockOrTxContent title="Block" iconDescription={iconDescription.block}>
        <div className="flex space-x-1 items-center">
          <Link
            className="text-blue-300 truncate"
            href={`${hrefs.block}/${
              tx.receipt?.blockNumber || tx.response?.blockNumber
            }`}
          >
            {tx.receipt?.blockNumber || tx.response?.blockNumber}
          </Link>
          <BadgeController
            name="Block Confirmations"
            value={
              tx.receipt?.confirmations ||
              (tx.response?.confirmations as number)
            }
            variant="secondary"
          />
        </div>
      </BlockOrTxContent>
      {/* tx timestamp */}
      {tx.response?.timestamp && (
        <BlockOrTxContent
          title="Timestamp"
          iconDescription={iconDescription.timestamp}
        >
          <div className="flex flex-col space-y-2  md:flex-row">
            <div className="flex space-x-1 items-center">
              <IconController icon={Icons.time} size="1.2em" />
              <p>{elapsedTime(tx.response.timestamp as number)}</p>
              <p>({unixToDate(tx.response.timestamp as number)})</p>
            </div>
          </div>
        </BlockOrTxContent>
      )}
      {/* tx from */}
      <BlockOrTxContent title="From" iconDescription={iconDescription.from}>
        <div className="flex space-x-1 items-center">
          <Link
            className="text-blue-300 truncate"
            href={`${hrefs.address}/${tx.receipt?.from || tx.response?.from}`}
          >
            {tx.receipt?.from || tx.response?.from}
          </Link>
          <CopyToClipboardButton
            text={tx.receipt?.from || (tx.response?.from as string)}
          />
        </div>
      </BlockOrTxContent>
      {/* tx to */}
      <BlockOrTxContent
        title="Interacted With (To)"
        iconDescription={iconDescription.to}
      >
        <div className="flex space-x-1 items-center">
          <Link
            className="text-blue-300 truncate"
            href={`${hrefs.address}/${tx.receipt?.to || tx.response?.to}`}
          >
            {tx.receipt?.to || tx.response?.to}
          </Link>
          <CopyToClipboardButton
            text={tx.receipt?.to || (tx.response?.to as string)}
          />
        </div>
      </BlockOrTxContent>
      {/* tx value */}
      <BlockOrTxContent title="Value" iconDescription={iconDescription.value}>
        <div className="flex space-x-1 items-center">
          <p>
            {formatEther(BigInt(tx.response?.value.toString() as string))} ETH
          </p>
        </div>
      </BlockOrTxContent>
      {/* tx fee */}
      <BlockOrTxContent
        title="Transaction Fee"
        iconDescription={iconDescription.txFee}
      >
        <div className="flex space-x-1 items-center">
          <p>{getTransactionFee(tx)} ETH</p>
        </div>
      </BlockOrTxContent>
      {/* tx gas price */}
      <BlockOrTxContent
        title="Effective Gas Price"
        iconDescription={iconDescription.txFee}
      >
        <div className="flex space-x-1 items-center">
          <p>
            {formatGwei(
              BigInt(tx.receipt?.effectiveGasPrice?.toString() as string)
            )}{" "}
            Gwei
          </p>
          <p className="text-neutral-400">
            {`(${formatEther(
              BigInt(tx.receipt?.effectiveGasPrice?.toString() as string)
            )} ETH)`}
          </p>
        </div>
      </BlockOrTxContent>
    </>
  );
};

export default TxDetails;
