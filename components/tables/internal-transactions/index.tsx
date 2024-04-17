"use client";

import React from "react";
import { internalTableColumns } from "../columns";
import { DataTable } from "../data-table";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";

const InternalTxsTable: React.FC<{ data: AssetTransfersResult[] }> = ({
  data
}) => {
  const internalTxs = data.reduce((accumulator: AssetTransfersResult[], tx) => {
    if (tx.category === AssetTransfersCategory.INTERNAL) {
      accumulator.push(tx);
    }
    return accumulator;
  }, []);

  return (
    <>
      <DataTable columns={internalTableColumns} data={internalTxs} />
    </>
  );
};

export default InternalTxsTable;