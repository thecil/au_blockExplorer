"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AccountProps, AccountBalance } from "@/types/web3";
import { Stages } from "@/types/components";
import { useAccountQuery } from "@/queries/account-query";
import Loading from "@/components/Loading";
import TokenHoldings from "./TokenHoldings";
import { useEtherscanQuery } from "@/queries/etherscan-query";
import { userBalanceInUsd } from "@/utils/web3";

const AccountOverviewController: React.FC<AccountProps> = ({ account }) => {
  const { balanceQuery } = useAccountQuery(account);
  const { data: balance, isLoading } = balanceQuery;
  const [stage, setStage] = useState(Stages.loading);

  useEffect(() => {
    if (isLoading) {
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (balance) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, balance, isLoading]);

  return (
    <>
      {stage === Stages.loading && <Loading />}
      {stage === Stages.show && balance && (
        <div className=" p-4 flex flex-col gap-2 border rounded-lg border-neutral-200 bg-slate-100 dark:border-neutral-800 dark:bg-black ">
          <h2 className="font-bold">Overview</h2>
          <div>
            <h2>ETH BALANCE</h2>
            <p>{Number(balance.inEth).toFixed(3)} ETH</p>
          </div>
          <div>
            <h2>ETH VALUE</h2>
            <EthUsdValue balance={balance} />
          </div>
          <TokenHoldings account={account} />
        </div>
      )}
    </>
  );
};

const EthUsdValue: React.FC<{ balance: AccountBalance }> = ({ balance }) => {
  const { etherPriceQuery } = useEtherscanQuery();
  const { data: ethPrice } = etherPriceQuery;
  const usdValue = useMemo(() => {
    if (ethPrice) return userBalanceInUsd(ethPrice, balance.bigInt);
    return undefined;
  }, [ethPrice, balance]);
  return <p>$ {usdValue}</p>;
};
export default AccountOverviewController;
