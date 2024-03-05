/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useAlchemy } from "@/hooks/useAlchemy";
import { Stages } from "@/types/components";
import { Block, columns } from "./columns";
import { DataTable } from "./data-table";

const AllBlocksTable = ({
  latestBlockNumber
}: {
  latestBlockNumber: number;
    }) => {
  const [data, setData] = useState<Block[]>([]);
  return <DataTable columns={columns} data={data} />
  ;
};

export default AllBlocksTable;
