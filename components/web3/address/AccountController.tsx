"use client";

import React from "react";
import { AccountProps } from "@/types/web3";
import AccountTags from "@/components/web3/address/AccountTags";
import AccountOverview from "@/components/web3/address/AccountOverview";

const AccountController: React.FC<AccountProps> = ({ account }) => {
  return (
    <>
      <AccountTags account={account} />
      <AccountOverview account={account} />
    </>
  );
};

export default AccountController;
