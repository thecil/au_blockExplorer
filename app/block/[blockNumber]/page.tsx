"use client";

import { useState, useEffect } from "react";
import type { BlockWithTransactions } from "alchemy-sdk";
import { useAlchemy } from "@/hooks/useAlchemy";
import { Stages } from "@/types/components";
import { elapsedTime, unixToDate } from "@/utils/unixTime";
import {
  shortAddress,
  getBurnedFees,
  formatGasToLocaleString,
  fromHex,
  formatEther,
  formatGwei
} from "@/utils/web3";
import Loading from "@/components/Loading";
import HelpIcon from "@/components/icons/HelpIcon";
import TimeIcon from "@/components/icons/TimeIcon";
import BlockOrTxData from "@/components/web3/BlockOrTxData";
import BlockReward from "@/components/web3/BlockReward";

const Page = ({ params }: { params: { blockNumber: string } }) => {
  const [stage, setStage] = useState(Stages.loading);
  const [block, setBlock] = useState<BlockWithTransactions>();
  const { getBlockWithTransactions } = useAlchemy();

  const _getBlock = async () => {
    const _block = await getBlockWithTransactions(parseInt(params.blockNumber));
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
    <div className="p-4 min-h-screen">
      {/* block number header*/}
      <div className="py-4 border-b border-gray-500 ">
        <div className="flex space-x-2">
          <h2 className="font-bold">Block</h2>
          <p className="text-gray-400">#{params.blockNumber}</p>
        </div>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && block && (
        <>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4 mt-2 flex flex-col space-y-2">
            {/* block heigth */}
            <div className="flex flex-col space-y-2  md:flex-row">
              <div className="md:w-96 flex space-x-4 items-center font-semibold dark:text-gray-400">
                <HelpIcon />
                <p>Block Height:</p>
              </div>
              <p>{block.number}</p>
            </div>
            {/* block timestamp */}
            <div className="flex flex-col space-y-2  md:flex-row">
              <div className="md:w-96 flex space-x-4 items-center font-semibold dark:text-gray-400">
                <HelpIcon />
                <p>Timestamp:</p>
              </div>
              <div className="flex space-x-1 items-center">
                <TimeIcon size="1.2em" />
                <p>{elapsedTime(block.timestamp)}</p>
                <p>({unixToDate(block.timestamp)})</p>
              </div>
            </div>
            {/* block transactions */}
            <BlockOrTxData
              title="Transactions"
              data={{
                value: `${block.transactions.length} transactions in this block`
              }}
            />
            {/* block fee recipient */}
            <BlockOrTxData
              title="Fee Recipient"
              data={{
                value: "in 12 secs",
                link: {
                  title: shortAddress(block.miner),
                  href: `/address/${block.miner}`
                }
              }}
            />

            {/* block reward */}
            <BlockReward block={block} />
            {/* block difficulty */}
            <BlockOrTxData
              title="Total Difficulty"
              data={{
                value: block._difficulty.toString()
              }}
            />
            {/* block gas used */}
            <BlockOrTxData
              title="Gas Used"
              data={{
                value: formatGasToLocaleString(block.gasUsed)
              }}
            />
            {/* block gas limit */}
            <BlockOrTxData
              title="Gas Limit"
              data={{
                value: formatGasToLocaleString(block.gasLimit)
              }}
            />
            {/* block base fee per gas */}
            {block.baseFeePerGas && (
              <BlockOrTxData
                title="Base Fee Per Gas"
                data={{
                  value: `${formatEther(
                    BigInt(block.baseFeePerGas.toString())
                  )} ETH (${formatGwei(
                    BigInt(block.baseFeePerGas.toString())
                  )} Gwei)`
                }}
              />
            )}
            {/* block burnt fees */}
            <BlockOrTxData
              title="Burnt Fees"
              data={{
                value: `${getBurnedFees(block)} ETH`
              }}
            />
            {/* block extra data */}
            <BlockOrTxData
              title="Extra Data"
              data={{
                value: fromHex(block.extraData as `0x${string}`, "string"),
                extra: {
                  value: `(Hex: ${block.extraData})`,
                  style: "truncate"
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
