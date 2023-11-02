"use client";
import { useState, useEffect } from "react";
import LatestBlocksController from "@/components/web3/LatestBlocksController";
import LatestTransactionController from "@/components/web3/LatestTransactionsController";
import { useAlchemy } from "@/hooks/useAlchemy";
export default function Home() {
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
    <main className="min-h-screen p-4">
      <div className="grid grid-rows-1 gap-4 md:grid-cols-2 ">
        <LatestBlocksController latestBlockNumber={latestBlock} />
        <LatestTransactionController latestBlockNumber={latestBlock} />
      </div>
    </main>
  );
}
