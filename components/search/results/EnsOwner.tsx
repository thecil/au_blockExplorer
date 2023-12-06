"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "@/types/components";
import { ENS, Web3Address } from "@/types/web3";
import hrefs from "@/data/hrefs.json";
import CopyToClipboardButton from "@/components/CopyToClipboard";
import IconController from "@/components/IconController";
interface EnsOwnerProps {
  address: Web3Address;
  ens: ENS;
}
const EnsOwner: React.FC<EnsOwnerProps> = ({ address, ens }) => {
  return (
    <div className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg p-2">
      <>
        {address === "0x" ? (
          <>
            <h2 className="text-lg font-bold">
              Domain name has not been claimed
            </h2>
            <Link
              className="text-blue-500"
              target="_blank"
              href={`https://app.ens.domains/${ens}/register`}
            >
              <div className="flex space-x-1 items-center">
                <p>Register</p>
                <IconController icon={Icons.open} size="16"/>
              </div>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">ENS Owner:</h2>
            <div className="flex space-x-1 items-center">
              <Link
                className="text-blue-500 truncate"
                href={`${hrefs.address}/${address}`}
              >
                {address}
              </Link>
              <CopyToClipboardButton text={address} />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default EnsOwner;
