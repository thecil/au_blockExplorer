"use client";

import React, { useEffect, useState } from "react";
import { OwnedToken } from "alchemy-sdk";
import { AccountProps } from "@/types/web3";
import { Stages } from "@/types/components";
import { formatGasToLocaleString } from "@/utils/web3";
import { useAccountQuery } from "@/queries/account-query";
import Loading from "@/components/Loading";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const TokenHoldings: React.FC<AccountProps> = ({ account }) => {
  const { tokensQuery } = useAccountQuery(account);
  const { data: tokens, isLoading } = tokensQuery;
  const [stage, setStage] = useState(Stages.loading);

  useEffect(() => {
    if (isLoading) {
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (tokens) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, tokens, isLoading]);

  return (
    <div>
      <h2>TOKEN HOLDINGS</h2>
      {stage === Stages.loading && <Loading size={12} />}
      {stage === Stages.show && tokens?.tokens && (
        <ComboboxDemo tokens={tokens.tokens} />
      )}
    </div>
  );
};

const ComboboxDemo = ({ tokens }: { tokens: Array<OwnedToken> }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {`(${tokens.length}) tokens`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command
          filter={(value, search) => {
            console.log(`currentValue => ${value}, search: ${search}`);
            if (value.toLocaleLowerCase().includes(search)) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search token..." />
          <CommandList>
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.contractAddress}
                  onSelect={() =>
                    console.log(
                      "should redirect to token contract address",
                      token.contractAddress
                    )
                  }
                  value={token.symbol}
                >
                  <div className="w-full flex items-center justify-between">
                    <p>{token.symbol}</p>
                    <p>{formatGasToLocaleString(token.balance as string)}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TokenHoldings;
