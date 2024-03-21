"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLatestBlockQuery } from "@/queries/block-query";
import Loading from "../Loading";
import TooltipController from "../ToolTipController";
import { Stages } from "@/types/components";

const LatestBlockNumber: React.FC = () => {
  const [stage, setStage] = useState(Stages.loading);
  const { latestBlockQuery } = useLatestBlockQuery();
  const {
    data: blockNumber,
    isLoading,
    isRefetching,
    error,
    isStale
  } = latestBlockQuery;

  useEffect(() => {
    if (isLoading || isRefetching) {
      if (stage !== Stages.loading) {
        setStage(Stages.loading);
        return;
      }
    }
    if (error) {
      if (stage !== Stages.error) {
        setStage(Stages.error);
        return;
      }
    }
    if (!isLoading && !isRefetching && blockNumber) {
      if (stage !== Stages.show) {
        setStage(Stages.show);
        return;
      }
    }

    return () => {};
  }, [stage, blockNumber, isLoading, isRefetching, error]);

  return (
    <TooltipController content="Latest block mined every 12 secs" side="bottom">
      <div className="flex space-x-1 items-center border rounded-lg p-1 dark:hover:bg-neutral-800">
        <div
          className={`w-3 h-3 ${
            isStale ? "bg-yellow-500" : "bg-green-500"
          } rounded-full`}
        />
        {stage === Stages.loading ? <Loading /> : null}
        {stage === Stages.error && error ? <ErrorData error={error} /> : null}
        {stage === Stages.show && blockNumber ? (
          <Link
            className="text-blue-400 text-sm"
            href={`/block/${blockNumber}`}
          >
            {blockNumber}
          </Link>
        ) : null}
      </div>
    </TooltipController>
  );
};

const ErrorData: React.FC<{ error: Error }> = ({ error }) => {
  return <p>{error.message}</p>;
};

export default LatestBlockNumber;
