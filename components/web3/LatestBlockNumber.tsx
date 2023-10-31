"use client";

import React from "react";
import Link from "next/link";

interface LastBlockNumberProps {
  latestBlockNumber: number;
}

const LatestBlockNumber: React.FC<LastBlockNumberProps> = ({
  latestBlockNumber
}) => {
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
