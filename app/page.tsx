"use client";
import LatestBlocksController from "@/components/web3/LatestBlocksController";
import LatestTransactionController from "@/components/web3/LatestTransactionsController";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-rows-1 gap-4 md:grid-cols-2 ">
        <LatestBlocksController />
        <LatestTransactionController />
      </div>
    </main>
  );
}
