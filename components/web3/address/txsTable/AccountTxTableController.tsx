"use client";

import React, { useMemo, useState } from "react";
import { AssetTransfersCategory } from "alchemy-sdk";
import { AccountProps } from "@/types/web3";
import TxTagsFilter from "./TxTagsFilter";
import ExternalTxTable from "./tables/ExternalTxTable";

const AccountTxTableController: React.FC<AccountProps> = ({ account }) => {
  const [tagFilter, setTagFilter] = useState(AssetTransfersCategory.EXTERNAL);

  const getTable = useMemo(() => {
    switch (tagFilter) {
      case AssetTransfersCategory.EXTERNAL:
        return <ExternalTxTable account={account} />;
      case AssetTransfersCategory.INTERNAL:
        return <>{tagFilter}</>;
      case AssetTransfersCategory.ERC20:
        return <>{tagFilter}</>;
      case AssetTransfersCategory.ERC721:
        return <>{tagFilter}</>;
      case AssetTransfersCategory.ERC1155:
        return <>{tagFilter}</>;
      case AssetTransfersCategory.SPECIALNFT:
        return <>{tagFilter}</>;
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagFilter]);

  return (
    <div className="grid gap-2 w-full">
      <TxTagsFilter tagFilter={tagFilter} setTagFilter={setTagFilter} />
      <div className="w-full overflow-auto border rounded-lg p-2 border-neutral-200 bg-slate-100 dark:border-neutral-800 dark:bg-black">
        {getTable}
      </div>
    </div>
  );
};

export default AccountTxTableController;
