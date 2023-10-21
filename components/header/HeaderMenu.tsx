import React, { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";

import ThemeToggle from "../ThemeToggle";
import BlockNumber from "../web3/BlockNumber";

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
        className="p-2 border border-solid hover:border-gray-400 rounded-full"
      >
        <IoMenu />
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-12 right-1 z-50 p-4 w-fit rounded-md divide-y divide-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-slate-100 dark:ring-slate-600 dark:bg-slate-700"
        >
          <BlockNumber />
          <div className="flex items-center justify-between gap-2 p-2">
            <p>Theme: </p>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
