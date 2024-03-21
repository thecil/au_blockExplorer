"use client";

import React, { useState, useEffect } from "react";
import LatestBlocksController from "@/components/web3/LatestBlocksController";
import LatestTransactionController from "@/components/web3/LatestTransactionsController";
import Search from "./search/Search";

import { useLatestBlockQuery } from "@/queries/block-query";
const HomePage: React.FC = () => {
  const { latestBlockQuery } = useLatestBlockQuery();
  const { data } = latestBlockQuery;
  const [latestBlock, setLatestBlock] = useState(0);

  useEffect(() => {
    if (latestBlock === 0 && data) setLatestBlock(data);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBlock, data]);
  return (
    <div className="container grid grid-cols-1 gap-4">
      <Search />
      <div className="grid grid-rows-1 gap-4 md:grid-cols-2">
        <LatestBlocksController latestBlockNumber={latestBlock} />
        <LatestTransactionController latestBlockNumber={latestBlock} />
      </div>
    </div>
  );
};

export default HomePage;
