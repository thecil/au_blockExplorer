"use client";

import React from "react";
import { externalTableColumns } from "../columns";
import { DataTable } from "../data-table";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";

const Erc1155TxsTable: React.FC<{ data: AssetTransfersResult[] }> = ({
  data
}) => {
  const erc1155Txs = data.reduce((accumulator: AssetTransfersResult[], tx) => {
    if (tx.category === AssetTransfersCategory.ERC1155) {
      accumulator.push(tx);
    }
    return accumulator;
  }, []);

  return (
    <>
      <DataTable columns={externalTableColumns} data={erc1155Txs} />
    </>
  );
};

export default Erc1155TxsTable;