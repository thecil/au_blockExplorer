"use client";

import React from "react";
import { externalTableColumns } from "../columns";
import { DataTable } from "../data-table";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";

const SpecialNftTxsTable: React.FC<{ data: AssetTransfersResult[] }> = ({
  data
}) => {
  const specialNftTxs = data.reduce((accumulator: AssetTransfersResult[], tx) => {
    if (tx.category === AssetTransfersCategory.SPECIALNFT) {
      accumulator.push(tx);
    }
    return accumulator;
  }, []);

  return (
    <>
      <DataTable columns={externalTableColumns} data={specialNftTxs} />
    </>
  );
};

export default SpecialNftTxsTable;