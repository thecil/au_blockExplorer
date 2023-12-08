"use client";

import React, { useEffect, useState } from "react";
import { AccountProps } from "@/types/web3";
import { Stages } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { formatEther } from "@/utils/web3";
import Loading from "@/components/Loading";
import TokenHoldings from "./TokenHoldings";

const AccountOverviewController: React.FC<AccountProps> = ({ account }) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [stage, setStage] = useState(Stages.loading);
  const { getBalance } = useAlchemy();

  const _getBalance = async () => {
    const _balance = await getBalance(account);
    if (_balance) setBalance(formatEther(BigInt(_balance.toString())));
    return;
  };

  useEffect(() => {
    if (!balance) {
      _getBalance();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (balance) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, balance]);

  return (
    <>
      {stage === Stages.loading && <Loading />}
      {stage === Stages.show && balance && (
        <div className=" p-4 flex flex-col gap-2 border rounded-lg border-neutral-200 bg-slate-100 dark:border-neutral-800 dark:bg-black ">
          <h2 className="font-bold">Overview</h2>
          <div>
            <h2>ETH BALANCE</h2>
            <p>{balance} ETH</p>
          </div>
          <div>
            <h2>ETH VALUE</h2>
            <p>$ value here</p>
          </div>
          <TokenHoldings account={account} />
        </div>
      )}
    </>
  );
};

export default AccountOverviewController;
