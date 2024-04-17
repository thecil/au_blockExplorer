"use client";

import React, { useEffect, useState } from "react";
import { useEtherscanQuery } from "@/queries/etherscan-query";
import Loading from "../Loading";
import TooltipController from "../ToolTipController";
import { Stages } from "@/types/components";

const EtherPrice: React.FC = () => {
  const [stage, setStage] = useState(Stages.loading);
  const { etherPriceQuery } = useEtherscanQuery();
  const { data, isLoading, isRefetching, error, isStale } = etherPriceQuery;

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
    if (!isLoading && !isRefetching && data) {
      if (stage !== Stages.show) {
        setStage(Stages.show);
        return;
      }
    }

    return () => {};
  }, [stage, data, isLoading, isRefetching, error]);

  return (
    <TooltipController content="Latest price for 1 ether" side="bottom">
      <div className="flex space-x-1 items-center border rounded-lg p-1 dark:hover:bg-neutral-800 text-sm">
        <div
          className={`w-3 h-3 ${
            isStale ? "bg-yellow-500" : "bg-green-500"
          } rounded-full`}
        />
        {stage === Stages.loading ? <Loading /> : null}
        {stage === Stages.error && error ? <ErrorData error={error} /> : null}
        {stage === Stages.show && data ? <p>${data}</p> : null}
      </div>
    </TooltipController>
  );
};

const ErrorData: React.FC<{ error: Error }> = ({ error }) => {
  return <p>{error.message}</p>;
};

export default EtherPrice;
