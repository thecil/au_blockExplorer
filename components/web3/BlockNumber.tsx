"use client";

import { useAlchemy } from "@/hooks/useAlchemy";
import Link from "next/link";

const BlockNumber = () => {
  const { blockNumber } = useAlchemy();

  return (
    <>
      {blockNumber && blockNumber !== 0 && (
        <div className="flex space-x-1">
          <p>Last Block:</p>
          <Link className="text-blue-400" href={`/block/${blockNumber}`}>
            {blockNumber}
          </Link>
        </div>
      )}
    </>
  );
};

export default BlockNumber;
