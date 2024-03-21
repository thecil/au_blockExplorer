"use client";

import React from "react";
import { AccountProps } from "@/types/web3";
import EnsTags from "@/components/web3/address/EnsTags";
import AccountOverviewController from "@/components/web3/address/overview";
import AccountTxTableController from "./txsTable/AccountTxTableController";

const AccountController: React.FC<AccountProps> = ({ account }) => {
  return (
    <div className="grid gap-2">
      <EnsTags account={account} />
      <div className="grid md:grid-cols-2 gap-2">
        <AccountOverviewController account={account} />
        <div className="p-4 border rounded-lg border-neutral-200 bg-slate-100 dark:border-neutral-800 dark:bg-black">more info</div>
      </div>
      <AccountTxTableController account={account} />
    </div>
  );
};

export default AccountController;
