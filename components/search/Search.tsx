"use client";

import React, { ChangeEvent, useMemo, useState } from "react";
import { z } from "zod";
import { Icons } from "@/types/components";
import useDebounce from "@/hooks/useDebounce";
import IconController from "../IconController";
import SearchResult from "./SearchResult";
import { Hex, ENS } from "@/types/web3";

// zod schema
const schema = z.union([
  // block number
  z.number(),
  // hash
  z.string().refine(
    (value) =>
      // address = 42 chars | txOrBlock hash = 66 char
      value.startsWith("0x") && (value.length === 42 || value.length === 66),
    {
      message: "Hash starting with 0x should be of length 42 or 66"
    }
  ),
  // ens
  z.string().refine((value) => value.endsWith(".eth"), {
    message: "Domain Name should end with .eth"
  })
]);

const Search = () => {
  const [inputValue, setInputValue] = useState<Hex | number | ENS>("0x");
  const debouncedInputValue = useDebounce(inputValue, 500);

  // onChange set input
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    // input contains only numbers
    if (/^\d+$/.test(target.value)) {
      // block number
      setInputValue(Number(target.value));
    } else {
      // hash
      setInputValue(target.value.toLocaleLowerCase() as Hex | ENS);
    }
  };

  // if valid zod schema, will return true to show search results
  const validInput = useMemo(() => {
    if (inputValue === "0x") return false;
    if (typeof inputValue === "string" && inputValue.length === 0) return false;
    if (debouncedInputValue !== "0x") {
      try {
        const validate = schema.safeParse(debouncedInputValue);
        if (validate.success) {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }, [inputValue, debouncedInputValue]);

  // on handleKeyDown, start routing
  const onSearch = () => {
    if (validInput) console.log("onSearch", { debouncedInputValue });
  };

  // on press Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSearch();
  };

  return (
    <div className="sticky my-2 w-full">
      <div className="text-gray-400 relative w-full flex space-x-1 border rounded-lg dark:border-neutral-600 p-2 bg-slate-100 dark:bg-black">
        <input
          className="px-2 w-full h-8 focus:outline-none bg-slate-100 dark:bg-black"
          type="text"
          name="search"
          placeholder="Search by Address / Txn Hash/ Block / Token / Domain Name"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <button
          className="hover:border hover:border-neutral-200 rounded-lg px-2"
          disabled={!validInput}
          onClick={onSearch}
        >
          <IconController icon={Icons.search} />
        </button>
      </div>
      {validInput ? <SearchResult input={debouncedInputValue} /> : null}
    </div>
  );
};

export default Search;
