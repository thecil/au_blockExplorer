"use client";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import Search from "../search/Search";
import { Separator } from "@/components/ui/separator";

import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header: React.FC = () => {
  return (
    <header className="p-2 flex justify-between items-center border-b">
      <div>
        <Link className="lg:text-2xl font-bold" href="/">
          thecil - Block Explorer
        </Link>
      </div>
      <div className="flex space-x-2 items-center">
        <Search />
        <Separator className="h-10" orientation="vertical" />
        <ConnectButton />
        <Separator className="h-10" orientation="vertical" />
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
