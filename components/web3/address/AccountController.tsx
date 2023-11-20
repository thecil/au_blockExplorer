"use client";

import React from "react";
import { AccountProps } from "@/types/web3";
import EnsTags from "@/components/web3/address/EnsTags";
import AccountOverviewController from "@/components/web3/address/overview/AccountOverviewController";

const AccountController: React.FC<AccountProps> = ({ account }) => {
  return (
    <>
      <EnsTags account={account} />
      <AccountOverviewController account={account} />
    </>
  );
};

export default AccountController;
