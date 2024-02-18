"use client";

import React, { useState, useEffect } from "react";
import { useAlchemy } from "@/hooks/useAlchemy";
import LatestBlocksController from "@/components/web3/LatestBlocksController";
import LatestTransactionController from "@/components/web3/LatestTransactionsController";
import Search from "./search/Search";

const HomePage: React.FC = () => {
  const { getBlockNumber } = useAlchemy();
  const [latestBlock, setLatestBlock] = useState(0);

  const _getLastestBlock = async () => {
    const _block = await getBlockNumber();
    if (_block) setLatestBlock(_block);
    return;
  };

  useEffect(() => {
    if (latestBlock === 0) _getLastestBlock();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBlock]);
  return (
    <div className="md:container">
      <Search />
      <div className="grid grid-rows-1 gap-4 md:grid-cols-2">
        <LatestBlocksController latestBlockNumber={latestBlock} />
        <LatestTransactionController latestBlockNumber={latestBlock} />
      </div>
    </div>
  );
};

export default HomePage;
