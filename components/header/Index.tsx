"use client";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";

const Header: React.FC = () => {
  return (
    <header className="p-2 flex justify-between items-center border-b">
      <div>
        <Link className="lg:text-2xl font-bold" href="/">
          thecil - Block Explorer
        </Link>
      </div>
      <HeaderMenu />
    </header>
  );
};

export default Header;
