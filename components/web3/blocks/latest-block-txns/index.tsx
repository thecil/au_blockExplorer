"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import { useBlockQuery } from "@/queries/block-query";
import {  Stages } from "@/types/components";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import TransactionItem from "./transaction-item";

interface LatestBlockTxnsControllerProps {
  latestBlockNumber: number;
}

const LatestBlockTxnsController = ({
  latestBlockNumber
}: LatestBlockTxnsControllerProps) => {
  const MAX_TXNS_TO_SHOW = 6;
  const { blockWithTxsQuery } = useBlockQuery(latestBlockNumber);
  const { data: block, isLoading } = blockWithTxsQuery;
  const [stage, setStage] = useState(Stages.loading);

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
    <div className="rounded-lg bg-slate-100 dark:bg-black">
      <div className="p-4">
        <h2 className="font-bold text-xl">Latest Transactions</h2>
      </div>
      <Separator orientation="horizontal" />
      {stage === Stages.loading && (
        <Loading size={64} text="Loading Latest Transactions" className="p-8" />
      )}
      {stage === Stages.show && block && (
        <div className="grid">
          {block.transactions.toReversed().map((txn, idx) => (
            <>
              {idx < MAX_TXNS_TO_SHOW && (
                <>
                  <TransactionItem key={idx} txn={txn} />
                  {idx < MAX_TXNS_TO_SHOW - 1 && (
                    <Separator orientation="horizontal" />
                  )}
                </>
              )}
            </>
          ))}
          <Separator orientation="horizontal" />
          <div className="text-md text-gray-500 text-center py-2">
            <Link className="" href={`${hrefs.transactions}`}>
              View All Transactions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestBlockTxnsController;
