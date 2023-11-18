"use client";

import React, { useState, useEffect } from "react";
import { useAlchemy } from "@/hooks/useAlchemy";
import { Stages } from "@/types/components";
import { AccountProps, ENS } from "@/types/web3";
import Loading from "@/components/Loading";

const AccountTags: React.FC<AccountProps> = ({ account }) => {
  const { getEns } = useAlchemy();
  const [stage, setStage] = useState(Stages.loading);
  const [ens, setEns] = useState<ENS | undefined>();

  const _getEns = async () => {
    const _ens = await getEns(account);
    if (_ens) {
      console.log("accountTags: ens", { account,  _ens });
    }
    return;
  };

  useEffect(() => {
    if (!ens) {
      _getEns();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (ens) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, ens]);

  return (
    <div className="m-2">
      {stage === Stages.loading && (
        <div className="w-12">
          <Loading size={12} />
        </div>
      )}
      {stage === Stages.show && ens && <div>{ens}</div>}
    </div>
  );
};

export default AccountTags;
