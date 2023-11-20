"use client";

import React, { useState, useEffect } from "react";
import { Stages } from "@/types/components";
import { AccountProps } from "@/types/web3";
import { useEnsName } from "wagmi";
import Loading from "@/components/Loading";

const EnsTags: React.FC<AccountProps> = ({ account }) => {
  const { data, isError, isLoading } = useEnsName({
    address: account
  });
  const [stage, setStage] = useState(Stages.loading);

  useEffect(() => {
    if (data) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    if (isLoading) {
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (isError || !data) {
      console.log("ens error");
      if (stage !== Stages.hidden) setStage(Stages.hidden);
      return;
    }
  }, [stage, data, isError, isLoading]);

  return (
    <div className="m-2">
      {stage === Stages.hidden && <></>}
      {stage === Stages.loading && (
        <div className="w-12">
          <Loading size={12} />
        </div>
      )}
      {stage === Stages.show && (
        <div className="w-fit flex space-x-1 items-center px-2 border rounded-full border-gray-500">
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default EnsTags;
