"use client";

import React, { useEffect, useState } from "react";
import { useAlchemy } from "@/hooks/useAlchemy";
import { Stages } from "@/types/components";
import Loading from "@/components/Loading";
import { sleep } from "@/utils/unixTime";
import { Separator } from "@/components/ui/separator";

const AllBlocksController = () => {
  const [stage, setStage] = useState(Stages.loading);
  const [latestBlockNumber, setLatestBlockNumber] = useState(0);
  const { getBlockNumber } = useAlchemy();

  const _getLastBlockNumber = async () => {
    try {
      await sleep(1000);
      const _latest = await getBlockNumber();
      if (_latest) {
        setLatestBlockNumber(_latest);
        if (stage !== Stages.show) setStage(Stages.show);
        return;
      }
    } catch (error) {
      console.log("AllBlocksController:error", { error });
    }
  };

  useEffect(() => {
    if (latestBlockNumber === 0) _getLastBlockNumber();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBlockNumber]);

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
