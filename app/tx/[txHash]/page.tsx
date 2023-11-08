"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import { Icons, Stages } from "@/types/components";
import { Transaction } from "@/types/web3";
import iconDesciptions from "@/data/iconDescriptions.json";
import {
  // shortAddress,
  getTransactionFee,
  formatEther,
  formatGwei
} from "@/utils/web3";
import { elapsedTime, unixToDate } from "@/utils/unixTime";
import { useAlchemy } from "@/hooks/useAlchemy";
import Loading from "@/components/Loading";
import IconController from "@/components/IconController";
import BlockOrTxContent from "@/components/web3/BlockOrTxContent";
import CopyToClipboardButton from "@/components/CopyToClipboard";
import Badge from "@/components/Badge";
import TxDetailsAccordion from "@/components/web3/transactions/TxDetailsAccordion";

const Page = ({ params }: { params: { txHash: string } }) => {
  const [stage, setStage] = useState(Stages.loading);
  const [tx, setTx] = useState<Transaction>();
  const { getTransactionReceipt, getTransaction } = useAlchemy();
  const { transaction: iconDescription } = iconDesciptions;

  const _getTx = async () => {
    const _receipt = await getTransactionReceipt(params.txHash);
    const _response = await getTransaction(params.txHash);
    const _transaction: Transaction = {
      receipt: _receipt,
      response: _response
    };
    console.log("_getTx", { _transaction });
    if (_transaction.receipt !== null || _transaction.response !== null)
      setTx(_transaction);
    return;
  };

  useEffect(() => {
    if (!tx) {
      _getTx();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (tx) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, tx]);

  return (
    <div className="p-4 min-h-screen">
      {/* tx hash header*/}
      <div className="py-4 border-b border-gray-500 ">
        <h2 className="font-bold text-xl">Transaction Details</h2>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && tx && (
        <>
          <div className="rounded-lg bg-slate-100 dark:bg-black p-4 mt-2 flex flex-col space-y-2">
            {/* tx hash */}
            <BlockOrTxContent
              title="Transaction Hash"
              iconDescription={iconDescription.txHash}
            >
              <div className="flex space-x-1 items-center">
                <span className="truncate ">{params.txHash}</span>
                <CopyToClipboardButton text={params.txHash} />
              </div>
            </BlockOrTxContent>
            {/* tx status */}
            <BlockOrTxContent
              title="Status"
              iconDescription={iconDescription.status}
            >
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
            <BlockOrTxContent
              title="Block"
              iconDescription={iconDescription.block}
            >
              <div className="flex space-x-1 items-center">
                <Link
                  className="text-blue-300 truncate"
                  href={`${hrefs.block}/${
                    tx.receipt?.blockNumber || tx.response?.blockNumber
                  }`}
                >
                  {tx.receipt?.blockNumber || tx.response?.blockNumber}
                </Link>
                <Badge
                  name="Block Confirmations"
                  value={
                    tx.receipt?.confirmations ||
                    (tx.response?.confirmations as number)
                  }
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
            <BlockOrTxContent
              title="From"
              iconDescription={iconDescription.from}
            >
              <div className="flex space-x-1 items-center">
                <Link
                  className="text-blue-300 truncate"
                  href={`${hrefs.address}/${
                    tx.receipt?.from || tx.response?.from
                  }`}
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
            <BlockOrTxContent
              title="Value"
              iconDescription={iconDescription.value}
            >
              <div className="flex space-x-1 items-center">
                <p>
                  {formatEther(BigInt(tx.response?.value.toString() as string))}{" "}
                  ETH
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
          </div>
          {/* more details accordion */}
          <TxDetailsAccordion tx={tx} />
        </>
      )}
    </div>
  );
};

export default Page;
