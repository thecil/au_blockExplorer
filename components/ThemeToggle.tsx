"use client";

import { useTheme } from "next-themes";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className="p-2 w-fit h-fit border border-solid  border-gray-500 rounded-full text-gray-400"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <IoSunnyOutline size={12} />
        ) : (
          <IoMoonOutline size={12} />
        )}
      </button>
    </>
  );
}
