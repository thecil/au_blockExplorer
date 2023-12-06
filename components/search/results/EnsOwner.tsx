"use client";

import React from "react";
import Link from "next/link";
import { Web3Address } from "@/types/web3";
import hrefs from "@/data/hrefs.json";
import CopyToClipboardButton from "@/components/CopyToClipboard";

interface EnsOwnerProps {
  address: Web3Address;
}
const EnsOwner: React.FC<EnsOwnerProps> = ({ address }) => {
  return (
    <div className="hover:bg-neutral-800 rounded-lg p-2">
      <h2 className="text-lg font-bold">ENS Owner:</h2>
      <div className="flex space-x-1 items-center">
        <Link className="text-blue-500" href={`${hrefs.address}/${address}`}>
          {address}
        </Link>
        <CopyToClipboardButton text={address} />
      </div>
    </div>
  );
};

export default EnsOwner;
