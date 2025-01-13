"use client";

import React from "react";
import { externalTableColumns } from "../columns";
import { DataTable } from "../data-table";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";

const Erc20TxsTable: React.FC<{ data: AssetTransfersResult[] }> = ({
  data
}) => {
  const erc20Txs = data.reduce((accumulator: AssetTransfersResult[], tx) => {
    if (tx.category === AssetTransfersCategory.ERC20) {
      accumulator.push(tx);
    }
    return accumulator;
  }, []);

  return (
    <>
      <DataTable columns={externalTableColumns} data={erc20Txs} />
    </>
  );
};

export default Erc20TxsTable;