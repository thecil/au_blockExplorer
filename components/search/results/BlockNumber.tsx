"use client";

import React from "react";
import Link from "next/link";
import type { Block } from "alchemy-sdk";
import hrefs from "@/data/hrefs.json";

interface BlockNumberProps {
  block: Block;
}
const BlockNumber: React.FC<BlockNumberProps> = ({ block }) => {
  return (
    <div className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg p-2">
      <div className="flex space-x-1 items-center">
        <h2 className="text-lg font-bold">Block #</h2>
        <Link
          className="text-blue-500 text-lg"
          href={`${hrefs.block}/${block.number}`}
        >
          {block.number}
        </Link>
      </div>
    </div>
  );
};

export default BlockNumber;
