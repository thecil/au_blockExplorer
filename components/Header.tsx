"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import BlockNumber from "./web3/BlockNumber";

const Header: React.FC = () => {
  return (
    <header className="p-2 flex justify-between items-center border-b">
      <Link className="text-2xl font-bold" href="/">
        AU - Explorer
      </Link>
      <div>
        <BlockNumber />
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
