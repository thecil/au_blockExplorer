"use client";

import React, { useState, useEffect } from "react";
import { Stages } from "@/types/components";
import { AccountProps } from "@/types/web3";
import { useEnsName } from "wagmi";
import Loading from "@/components/Loading";
import BadgeController from "@/components/BadgeController";

const EnsTags: React.FC<AccountProps> = ({ account }) => {
  const { data, isError, isLoading } = useEnsName({
    address: account
  });
  const [stage, setStage] = useState(Stages.loading);

  useEffect(() => {
    if (data) {
      console.log("EnsTags:data:", { data });
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
    <div className="mt-2">
      {stage === Stages.hidden && <></>}
      {stage === Stages.loading && (
        <div className="w-12">
          <Loading size={12} />
        </div>
      )}
      {stage === Stages.show && data && (
        <>
          <BadgeController name={data} variant="secondary" />
        </>
      )}
    </div>
  );
};

export default EnsTags;
