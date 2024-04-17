"use client";

import React from "react";
import { externalTableColumns } from "../columns";
import { DataTable } from "../data-table";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";

const ExternalTxsTable: React.FC<{ data: AssetTransfersResult[] }> = ({
  data
}) => {
  const externalTxs = data.reduce((accumulator: AssetTransfersResult[], tx) => {
    if (tx.category === AssetTransfersCategory.EXTERNAL) {
      accumulator.push(tx);
    }
    return accumulator;
  }, []);

  return (
    <>
      <DataTable columns={externalTableColumns} data={externalTxs} />
    </>
  );
};

export default ExternalTxsTable;
