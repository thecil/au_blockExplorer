"use client";

import React from "react";
import Link from "next/link";
import { useBlockQuery } from "@/queries/block-query";
import Loading from "../Loading";
import TooltipController from "../ToolTipController";
const LatestBlockNumber: React.FC = () => {
  const { latestBlockQuery } = useBlockQuery();
  const {
    data: blockNumber,
    isLoading,
    isRefetching,
    error,
    isStale
  } = latestBlockQuery;

  if (isLoading || isRefetching) return <Loading />;
  if (error) return <ErrorData error={error} />;
  if (blockNumber)
    return (
      <TooltipController
        content="Latest block number minded every 12 secs"
        side="bottom"
      >
        <div className="flex space-x-1 items-center">
          <div
            className={`w-3 h-3 ${
              isStale ? "bg-yellow-600" : "bg-green-600"
            } rounded-full`}
          ></div>
          <Link
            className="text-blue-400 text-sm"
            href={`/block/${blockNumber}`}
          >
            {blockNumber}
          </Link>
        </div>
      </TooltipController>
    );
};

const ErrorData: React.FC<{ error: Error }> = ({ error }) => {
  return <p>{error.message}</p>;
};

export default LatestBlockNumber;
