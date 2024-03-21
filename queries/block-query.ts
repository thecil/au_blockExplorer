import { useQuery } from "@tanstack/react-query";
import { useAlchemy } from "@/hooks/useAlchemy";
import type { Hex } from "@/types/web3";

// get and track latest block mined
export const useLatestBlockQuery = () => {
  const { getBlockNumber } = useAlchemy();
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
  const { getBlock, getBlockWithTransactions } = useAlchemy();
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
