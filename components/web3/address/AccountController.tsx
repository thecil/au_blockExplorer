"use client";

import React from "react";
import { AccountProps } from "@/types/web3";
import EnsTags from "@/components/web3/address/EnsTags";
import AccountOverview from "@/components/web3/address/AccountOverview";

const AccountController: React.FC<AccountProps> = ({ account }) => {
  return (
    <>
      <EnsTags account={account} />
      <AccountOverview account={account} />
    </>
  );
};

export default AccountController;
