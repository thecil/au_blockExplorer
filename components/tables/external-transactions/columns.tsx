"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import { ArrowUpDown } from "lucide-react";
import { AssetTransfersResult } from "alchemy-sdk";
import { fromHex, shortAddress } from "@/utils/web3";
import { Hex } from "@/types/web3";
import { Button } from "@/components/ui/button";

const SortableCell = ({
  column,
  text
}: {
  column: Column<AssetTransfersResult, unknown>;
  text: string;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {text}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
export const columns: ColumnDef<AssetTransfersResult>[] = [
  {
    accessorKey: "hash",
    header: "Tx Hash",
    cell: ({ row }) => {
      const _hash = row.original.hash;
      return (
        <Link className="text-blue-400" href={`${hrefs.transaction}/${_hash}`}>
          {shortAddress(_hash)}
        </Link>
      );
    }
  },
  {
    accessorKey: "blockNum",
    header: ({ column }) => {
      return <SortableCell column={column} text="Block" />;
    },
    cell: ({ row }) => {
      const _block = row.original.blockNum;
      return (
        <Link
          className="text-blue-400"
          href={`${hrefs.block}/${fromHex(_block as Hex, "number")}`}
        >
          {fromHex(_block as Hex, "number")}
        </Link>
      );
    }
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => {
      const _from = row.original.from;
      return <p>{shortAddress(_from)}</p>;
    }
  },
  {
    accessorKey: "to",
    header: ({ column }) => {
      return <SortableCell column={column} text="To" />;
    },
    cell: ({ row }) => {
      const _to = row.original.to;
      return (
        <Link className="text-blue-400" href={`${hrefs.address}/${_to}`}>
          {shortAddress(_to as string)}
        </Link>
      );
    }
  },
  {
    accessorKey: "Value",
    header: ({ column }) => {
      return <SortableCell column={column} text="Value" />;
    },
    cell: ({ row }) => {
      const _value = row.original.value;
      return <p>{_value}</p>;
    }
  },
  {
    accessorKey: "asset",
    header: "Asset",
    cell: ({ row }) => {
      const _asset = row.original.asset;
      return <p>{_asset}</p>;
    }
  }
];
