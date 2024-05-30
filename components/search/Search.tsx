"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Icons } from "@/types/components";
import useDebounce from "@/hooks/useDebounce";
import IconController from "../IconController";
import SearchResult from "./SearchResult";
import { Hex, ENS } from "@/types/web3";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// zod schema
const schema = z.union([
  // block number
  z.number().positive(),
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

const Search = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<Hex | number | ENS>("0x");
  const debouncedInputValue = useDebounce(inputValue, 500);

  // on handleKeyDown, start routing
  const onSearch = () => {
    if (validInput) setIsOpen(true);
  };

  // on press Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSearch();
  };

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

  useEffect(() => {
    if (validInput) {
      if (isOpen === false) setIsOpen(true);
      return;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validInput]);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "inline-flex text-gray-400  items-center space-x-1 rounded-lg p-2 bg-slate-200 dark:bg-black",
            className
          )}
        >
          <input
            className="px-2 focus:outline-none w-full bg-slate-200 dark:bg-black"
            type="text"
            name="search"
            placeholder="Search by Address / Txn Hash/ Block / Token / Domain Name"
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="outline"
            size="icon"
            disabled={!validInput}
            onClick={onSearch}
          >
            <IconController icon={Icons.search} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full lg:w-[1200px]"
        onInteractOutside={() => setIsOpen(false)}
      >
        <SearchResult input={debouncedInputValue} />
      </PopoverContent>
    </Popover>
  );
};

export default Search;
