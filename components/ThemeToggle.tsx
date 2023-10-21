"use client";

import { useTheme } from "next-themes";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className="p-2 w-fit h-fit border border-solid  border-gray-500 rounded-full"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <IoSunnyOutline className="text-gray-400" size={24} />
        ) : (
          <IoMoonOutline className="text-gray-400" size={24} />
        )}
      </button>
    </>
  );
}
