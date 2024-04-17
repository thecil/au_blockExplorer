import React from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import { Icons } from "@/types/components";
import { useBlockQuery } from "@/queries/block-query";
import { elapsedTime } from "@/utils/unixTime";
import { shortAddress } from "@/utils/web3";
import Loading from "@/components/Loading";
import IconController from "@/components/IconController";
import BlockReward from "@/components/web3/BlockReward";

const BlockItem = ({ blockNumber, key }: { blockNumber: number, key: number }) => {
  const { blockWithTxsQuery } = useBlockQuery(blockNumber);
  const { data: block, isLoading } = blockWithTxsQuery;
  if (isLoading) return <Loading size={24} className="my-8"/>;
  if (block)
    return (
      <div key={key} className="md:h-28 p-4 grid gap-4 md:grid-flow-col ">
        {/* block number */}
        <div className="md:flex md:space-x-2 md:items-center">
          <div className="hidden md:inline">
            <IconController icon={Icons.block} />
          </div>
          <div className="flex md:flex-col space-x-1 items-center">
            <p className="md:hidden">Block</p>
            <Link
              className="text-blue-500"
              href={`${hrefs.block}/${block.number}`}
            >
              {block.number}
            </Link>
            <p className="text-gray-500 text-xs">
              {elapsedTime(block.timestamp)}
            </p>
          </div>
        </div>
        {/* fee recipient */}
        <div className="flex space-x-1 items-center">
          <p>Fee recipient</p>
          <Link className="text-blue-500" href={`/address/${block.miner}`}>
            {shortAddress(block.miner)}
          </Link>
        </div>
        {/* total transactions on block */}
        <div className="flex space-x-1 items-center">
          <p>{block.transactions.length} txns</p>
          <p className="text-gray-500 text-sm">in 12 secs</p>
        </div>
        {/* block reward */}
        <div className="place-content-start self-center">
          <BlockReward block={block} miniComp={true} />
        </div>
      </div>
    );
};

export default BlockItem;

