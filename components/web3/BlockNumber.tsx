"use client";

import { useAlchemy } from "@/hooks/useAlchemy";

const BlockNumber = () => {
  const { blockNumber } = useAlchemy();

  return (
    <>{blockNumber && blockNumber !== 0 && <div>Block: {blockNumber}</div>}</>
  );
};

export default BlockNumber;
