"use client";

import React, { useEffect, useState } from "react";
import { Stages } from "@/types/components";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { useLatestBlockQuery } from "@/queries/block-query";

const AllBlocksController = () => {
  const [stage, setStage] = useState(Stages.loading);
  const [latestBlockNumber, setLatestBlockNumber] = useState(0);
  const { latestBlockQuery } = useLatestBlockQuery();
  const { data: blockNumber, isLoading } = latestBlockQuery;

  useEffect(() => {
    if (latestBlockNumber === 0 && isLoading) {
      if (stage !== Stages.loading) {
        setStage(Stages.loading);
        return;
      }
    }
    if (latestBlockNumber === 0 && blockNumber) {
      setLatestBlockNumber(blockNumber);
      if (stage !== Stages.show) {
        setStage(Stages.show);
        return;
      }
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, blockNumber, isLoading]);

  return (
    <>
      {stage === Stages.loading ? (
        <Loading size={84} text="Loading Latest Block" />
      ) : null}

      {stage === Stages.show ? (
        <div className="grid gap-4 grid-cols-1">
          <h2 className="text-2xl">Blocks</h2>
          <Separator />

          <div className="flex space-x-2 items-center">
            <div className="p-4 border rounded-lg bg-slate-100 dark:bg-black">
              <h3>Last Safe Block</h3>
              <p>{latestBlockNumber}</p>
            </div>
          </div>

          <div>Table should be here</div>
        </div>
      ) : null}
    </>
  );
};

export default AllBlocksController;
