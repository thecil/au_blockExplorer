import { useQuery } from "@tanstack/react-query";
import type { Hex } from "@/types/web3";
import {
  getBlock,
  getBlockNumber,
  getBlockWithTransactions
} from "@/lib/actions/alchemy";
// get and track latest block mined
export const useLatestBlockQuery = () => {
  // get latest block mined
  const latestBlockQuery = useQuery({
    queryKey: ["latestBlockQuery"],
    queryFn: () => getBlockNumber(),
    refetchInterval: 12 * 1000, // every 12 seconds
    staleTime: 11 * 1000 // every 12 seconds
  });

  return {
    latestBlockQuery
  };
};

// get block data
export const useBlockQuery = (blockHashOrBlockTag: number | Hex) => {
  // get block data
  const blockQuery = useQuery({
    queryKey: ["blockQuery", blockHashOrBlockTag],
    queryFn: () => getBlock(blockHashOrBlockTag),
    enabled: false
  });
  // get block data with transactions
  const blockWithTxsQuery = useQuery({
    queryKey: ["blockWithTxsQuery", blockHashOrBlockTag],
    queryFn: () => getBlockWithTransactions(blockHashOrBlockTag)
  });
  return {
    blockQuery,
    blockWithTxsQuery
  };
};
