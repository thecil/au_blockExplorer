"use client";
import LatestBlocksController from "@/components/web3/LatestBlocksController";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="">
        <LatestBlocksController />
      </div>
    </main>
  );
}
