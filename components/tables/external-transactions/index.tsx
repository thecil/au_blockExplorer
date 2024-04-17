"use client";

import React, { useEffect, useState } from "react";
import { AccountProps } from "@/types/web3";
import { Stages } from "@/types/components";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAccountQuery } from "@/queries/account-query";
import Loading from "@/components/Loading";

const ExternalTxsTable: React.FC<AccountProps> = ({ account }) => {
  const [stage, setStage] = useState(Stages.loading);
  const { externalTxsQuery } = useAccountQuery(account);
  const { data, isLoading } = externalTxsQuery;

  useEffect(() => {
    if (isLoading) {
      if (stage !== Stages.loading) {
        setStage(Stages.loading);
        return;
      }
    }
    if (data) {
      if (stage !== Stages.show) {
        setStage(Stages.show);
        return;
      }
    }
    return () => {};
  }, [stage, data, isLoading]);

  return (
    <>
      {stage === Stages.loading && (
        <Loading size={48} text="Loading External Transactions" />
      )}
      {stage === Stages.show && data && (
        <DataTable columns={columns} data={data.transfers} />
      )}
    </>
  );
};

export default ExternalTxsTable;
