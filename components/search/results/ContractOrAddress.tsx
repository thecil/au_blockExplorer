"use client";

import React from "react";
import Link from "next/link";
import { Web3Address } from "@/types/web3";
import hrefs from "@/data/hrefs.json";
import CopyToClipboardButton from "@/components/CopyToClipboard";

interface ContractOrAddressProps {
  address: Web3Address;
  isContract?: boolean;
}
const ContractOrAddress: React.FC<ContractOrAddressProps> = ({
  address,
  isContract
}) => {
  return (
    <div className="hover:bg-slate-200 dark:hover:bg-neutral-800 rounded-lg p-2">
      <div className="flex space-x-1 items-center">
        {isContract ? (
          <>
            <h2 className="text-lg font-bold">Contract:</h2>
            <Link
              className="text-blue-500 text-lg truncate"
              href={`${hrefs.address}/${address}`}
            >
              {address}
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">Address:</h2>
            <Link
              className="text-blue-500 text-lg truncate"
              href={`${hrefs.address}/${address}`}
            >
              {address}
            </Link>
          </>
        )}
        <CopyToClipboardButton text={address} />
      </div>
    </div>
  );
};

export default ContractOrAddress;
