import React from "react";
import { Icons } from "@/types/components";
import IconController from "../IconController";
import useDebounce from "@/hooks/useDebounce";

const Search = () => {
  return (
    <div className="text-gray-400 my-2 relative w-full flex space-x-1 border rounded-lg dark:border-gray-600 p-2 bg-white dark:bg-black">
      <input
        placeholder="Search by Address / Txn Hash/ Block / Token / Domain Name"
        type="text"
        className="px-2 w-full h-8 focus:outline-none  bg-white dark:bg-black"
      />
      <button className="hover:border hover:border-gray-400 rounded-lg px-2">
        <IconController icon={Icons.search} />
      </button>
    </div>
  );
};

export default Search;
