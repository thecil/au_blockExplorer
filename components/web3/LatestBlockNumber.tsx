"use client";

import { useAlchemy } from "@/hooks/useAlchemy";
import Link from "next/link";

const LatestBlockNumber = () => {
  const { latestBlockNumber } = useAlchemy();

  return (
    <>
      {latestBlockNumber && latestBlockNumber !== 0 && (
        <div className="flex space-x-1">
          <p>Last Block:</p>
          <Link className="text-blue-400" href={`/block/${latestBlockNumber}`}>
            {latestBlockNumber}
          </Link>
        </div>
      )}
    </>
  );
};

export default LatestBlockNumber;
