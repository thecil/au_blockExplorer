"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderMenu from "./HeaderMenu";
import Search from "../search/Search";
import { Separator } from "@/components/ui/separator";

import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <header className="p-4 border-b">
      <div className="container flex justify-between items-center ">
        <Link className="lg:text-2xl font-bold" href="/">
          thecil - Block Explorer
        </Link>
        {pathname !== "/" ? <Search className="w-1/3" /> : null}
        <div className="flex space-x-2 items-center">
          <ConnectButton />
          <Separator className="h-10" orientation="vertical" />
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
