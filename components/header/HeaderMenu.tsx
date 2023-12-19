import React, { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import ThemeToggle from "../ThemeToggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserSignButton } from "../UserSignButton";

// import LatestBlockNumber from "../web3/LatestBlockNumber";

const HeaderMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current !== event.target
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <button
        ref={menuButtonRef}
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 border border-solid hover:border-gray-400 rounded-lg"
      >
        <IoMenu className="text-gray-400" />
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-12 right-4  z-50 p-4 w-fit rounded-md divide-y divide-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-slate-200 dark:divide-neutral-900 dark:ring-neutral-900 dark:bg-neutral-950"
        >
          <div>
            <UserSignButton />
          </div>
          <div>
            <ConnectButton />
          </div>
          <div className="flex items-center justify-between space-x-1 p-2">
            <p>Option1:</p>
            <p>Enable/Disable</p>
          </div>
          <div className="flex items-center justify-between space-x-1 p-2">
            <p>Theme:</p>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
