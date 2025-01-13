"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "@/components/tables/data-table-pagination";
import { Hex } from "@/types/web3";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [inputValue, setInputValue] = useState<Hex>("" as Hex);
  const debouncedInputValue = useDebounce(inputValue, 10);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  });

  useEffect(() => {
    if (debouncedInputValue.length === 0) {
      table.getColumn("to")?.setFilterValue("");
      table.getColumn("hash")?.setFilterValue("");
      return;
    }
    //is address
    if (debouncedInputValue.length <= 42) {
      table.getColumn("to")?.setFilterValue(debouncedInputValue);
      return;
    }
    // is hash
    if (debouncedInputValue.length > 42) {
      table.getColumn("hash")?.setFilterValue(debouncedInputValue);
      return;
    }
  }, [table, debouncedInputValue]);

  return (
    <div className="grid gap-2">
      {/* filters */}
      <div className="flex items-center">
        {/* to address filter */}
        <Input
          placeholder="To Address..."
          value={debouncedInputValue}
          onChange={(e) => setInputValue(e.target.value as Hex)}
          className="max-w-sm"
        />
        {/* columns filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination controls */}
      <DataTablePagination table={table} />
    </div>
  );
}

// const PaginationBtns:<TData>=({
//     table
//   }: DataTablePaginationProps<TData>)=> {
//   return (
//     <div className="flex items-center justify-end space-x-2 py-4">
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => table.previousPage()}
//         disabled={!table.getCanPreviousPage()}
//       >
//         Previous
//       </Button>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => table.nextPage()}
//         disabled={!table.getCanNextPage()}
//       >
//         Next
//       </Button>
//     </div>
//   );
// };
