"use client";

import React, { ChangeEvent, useState } from "react";
import { Icons } from "@/types/components";
import IconController from "../IconController";
import useDebounce from "@/hooks/useDebounce";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const onSearch = () => {
    console.log("onSearch", { debouncedInputValue });
  };
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setInputValue(target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSearch();
  };

  return (
    <div className="text-gray-400 my-2 relative w-full flex space-x-1 border rounded-lg dark:border-gray-600 p-2 bg-white dark:bg-black">
      <input
        className="px-2 w-full h-8 focus:outline-none  bg-white dark:bg-black"
        type="text"
        name="search"
        placeholder="Search by Address / Txn Hash/ Block / Token / Domain Name"
        onChange={searchHandler}
        onKeyDown={handleKeyDown}
      />
      <button className="hover:border hover:border-gray-400 rounded-lg px-2" onClick={onSearch}>
        <IconController icon={Icons.search} />
      </button>
    </div>
  );
};

export default Search;
