"use client";

import React from "react";
import { externalTableColumns } from "../columns";
import { DataTable } from "../data-table";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";

const Erc721TxsTable: React.FC<{ data: AssetTransfersResult[] }> = ({
  data
}) => {
  const erc721Txs = data.reduce((accumulator: AssetTransfersResult[], tx) => {
    if (tx.category === AssetTransfersCategory.ERC721) {
      accumulator.push(tx);
    }
    return accumulator;
  }, []);

  return (
    <>
      <DataTable columns={externalTableColumns} data={erc721Txs} />
    </>
  );
};

export default Erc721TxsTable;