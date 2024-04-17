"use client";

import React, { useEffect, useState } from "react";
import { AssetTransfersCategory } from "alchemy-sdk";
import { AccountProps } from "@/types/web3";
import ExternalTxsTable from "@/components/tables/external-transactions";
import InternalTxsTable from "@/components/tables/internal-transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountQuery } from "@/queries/account-query";
import { Stages } from "@/types/components";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Erc20TxsTable from "@/components/tables/erc20-transactions";

const typesOftx = [
  { name: "Transactions", value: AssetTransfersCategory.EXTERNAL },
  { name: "Internal Transactions", value: AssetTransfersCategory.INTERNAL },
  { name: "Token Transfers (ERC-20)", value: AssetTransfersCategory.ERC20 },
  { name: "NFT Transfers (ERC-721)", value: AssetTransfersCategory.ERC721 },
  { name: "NFT Transfers (ERC-1155)", value: AssetTransfersCategory.ERC1155 },
  { name: "Special NFT", value: AssetTransfersCategory.SPECIALNFT }
];

const AccountTxTableController: React.FC<AccountProps> = ({ account }) => {
  const [stage, setStage] = useState(Stages.loading);
  const { assetsTxsQuery } = useAccountQuery(account);
  const { data, isLoading, isRefetching, error, refetch } = assetsTxsQuery;

  useEffect(() => {
    if (isLoading || isRefetching) {
      if (stage !== Stages.loading) {
        setStage(Stages.loading);
        return;
      }
    }
    if (!data && error) {
      if (stage !== Stages.error) {
        setStage(Stages.error);
        return;
      }
    }
    if (data) {
      if (stage !== Stages.show) {
        setStage(Stages.show);
        return;
      }
    }
  }, [stage, data, isLoading, isRefetching, error]);

  return (
    <>
      {stage === Stages.loading && (
        <Loading size={48} text="Loading Transactions" />
      )}
      {stage === Stages.show && data && (
        <Tabs defaultValue={typesOftx[0].value}>
          <TabsList className="min-w-full flex flex-row flex-nowrap overflow-x-auto justify-around">
            {typesOftx.map((type, idx) => (
              <TabsTrigger key={idx} value={type.value}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={typesOftx[0].value}>
            <ExternalTxsTable data={data.transfers} />
          </TabsContent>
          <TabsContent value={typesOftx[1].value}>
            <InternalTxsTable data={data.transfers} />
          </TabsContent>
          <TabsContent value={typesOftx[2].value}>
            <Erc20TxsTable data={data.transfers} />
          </TabsContent>
          <TabsContent value={typesOftx[3].value}>
            <p>nft transfer 721</p>
          </TabsContent>
          <TabsContent value={typesOftx[4].value}>
            <p>nft transfer 1155</p>
          </TabsContent>
          <TabsContent value={typesOftx[5].value}>
            <p>special nft</p>
          </TabsContent>
        </Tabs>
      )}
      {stage === Stages.error && error && (
        <ErrorStage error={error} refetch={refetch} />
      )}
    </>
  );
};

const ErrorStage = ({
  error,
  refetch
}: {
  error: Error;
  refetch: () => void;
}) => {
  return (
    <div>
      <h2>something went wrong...</h2>
      <p>{error.message}</p>
      <Button onClick={refetch}>Retry</Button>
    </div>
  );
};
export default AccountTxTableController;
