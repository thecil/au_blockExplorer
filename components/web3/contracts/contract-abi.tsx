import Loading from "@/components/Loading";
import { contractAbiResponse } from "@/types/etherscan";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { ListChecks } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CopyToClipboardButton from "@/components/CopyToClipboard";

const ContractAbi: React.FC<{
  abiQuery: UseQueryResult<contractAbiResponse | undefined, Error>;
}> = ({ abiQuery }) => {
  const { data: abi, isLoading: isLoadingAbi, isError: isErrorAbi } = abiQuery;

  if (!abi) return <div>Contract is not verified</div>;
  if (isLoadingAbi) return <Loading />;
  if (isErrorAbi)
    return <div>Something went wrong fetching the Abi, refresh the page</div>;
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks />
          <p>Contract Abi</p>
        </div>
        <CopyToClipboardButton text={abi.result.toString()} hoverText="Copy Abi to clipboard"/>
      </div>
      <div className="">
        <ScrollArea className="bg-neutral-900 p-4 rounded-md">
          <pre className="text-wrap max-h-[300px]">
            <code className="text-white">{abi.result}</code>
          </pre>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ContractAbi;
