"use client";

import { useState, useEffect } from "react";
import type { TransactionResponse } from "alchemy-sdk";
import { Stages } from "@/types/components";
import { Icons } from "@/types/components";
import iconDesciptions from "@/data/iconDescriptions.json";
import { useAlchemy } from "@/hooks/useAlchemy";
import {
  shortAddress,
  getTransactionFee,
  formatEther,
  formatGwei
} from "@/utils/web3";
import { elapsedTime, unixToDate } from "@/utils/unixTime";
import Tooltip from "@/components/ToolTip";
import Loading from "@/components/Loading";
import IconController from "@/components/IconController";
import BlockOrTxData from "@/components/web3/BlockOrTxData";

const Page = ({ params }: { params: { txHash: string } }) => {
  const [stage, setStage] = useState(Stages.loading);
  const [tx, setTx] = useState<TransactionResponse>();
  const { getTransaction } = useAlchemy();
  const { transaction: iconDescription } = iconDesciptions;

  const _getTx = async () => {
    const _tx = await getTransaction(params.txHash);
    console.log("_getTx", { _tx });
    if (_tx) setTx(_tx);
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
        <h2 className="font-bold">Transaction Details</h2>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && tx && (
        <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4 mt-2 flex flex-col space-y-2">
          {/* tx hash */}
          <BlockOrTxData
            title="Transaction Hash"
            data={{
              value: tx.hash
            }}
            iconDescription={iconDescription.txHash}
          />
          {/* tx block hash */}
          <BlockOrTxData
            title="Block"
            data={{
              value: "",
              link: {
                title: `${tx.blockNumber as number}`,
                href: `/block/${tx.blockNumber as number}`
              }
            }}
            iconDescription={iconDescription.block}
          />
          {/* tx timestamp */}
          {tx.timestamp && (
            <div className="flex flex-col space-y-2  md:flex-row">
              <div className="md:w-96 flex space-x-4 items-center font-semibold dark:text-gray-400">
                <Tooltip message={iconDescription.timestamp}>
                  <IconController icon={Icons.help} />
                </Tooltip>
                <p>Timestamp:</p>
              </div>
              <div className="flex space-x-1 items-center">
                <IconController icon={Icons.time} size="1.2em" />
                <p>{elapsedTime(tx.timestamp)}</p>
                <p>({unixToDate(tx.timestamp)})</p>
              </div>
            </div>
          )}
          {/* tx from */}
          <BlockOrTxData
            title="From"
            data={{
              value: "",
              link: {
                title: `${shortAddress(tx.from)}`,
                href: `/address/${tx.from}`
              }
            }}
            iconDescription={iconDescription.from}
            copy={tx.from}
          />
          {/* tx to */}
          {tx.to && (
            <BlockOrTxData
              title="To"
              data={{
                value: "",
                link: {
                  title: `${shortAddress(tx.to)}`,
                  href: `/address/${tx.to}`
                }
              }}
              iconDescription={iconDescription.to}
              copy={tx.to}
            />
          )}
          {/* tx value */}
          <BlockOrTxData
            title="Value"
            data={{
              value: `${formatEther(BigInt(tx.value.toString()))} ETH`
            }}
            iconDescription={iconDescription.value}
          />
          {/* tx fee */}
          <BlockOrTxData
            title="Transaction Fee"
            data={{
              value: `${getTransactionFee(tx)} ETH`
            }}
            iconDescription={iconDescription.txFee}
          />
          {/* tx gas price */}
          <BlockOrTxData
            title="Transaction Fee"
            data={{
              value: `${formatGwei(
                BigInt(tx.gasPrice?.toString() as string)
              )} Gwei (${formatEther(
                BigInt(tx.gasPrice?.toString() as string)
              )} ETH)`
            }}
            iconDescription={iconDescription.txFee}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
