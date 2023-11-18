"use client";

import React from "react";
import { AccountProps } from "@/types/web3";

const AccountOverview:React.FC<AccountProps> = ({ account }) => {
  return (
    <div className="w-1/4 m-2 p-4 flex flex-col gap-2 border rounded-lg border-gray-500  ">
      <h2 className="font-bold">Overview</h2>
      <div>
        <h2>ETH BALANCE</h2>
        <p>eth balance here</p>
      </div>
      <div>
        <h2>ETH VALUE</h2>
        <p>$ value here</p>
      </div>
      <div>
        <h2>TOKEN HOLDINGS</h2>
        <p>tokens list here</p>
      </div>
    </div>
  );
};

export default AccountOverview;
