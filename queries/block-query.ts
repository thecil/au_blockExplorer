import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlchemy } from "@/hooks/useAlchemy";

export const useBlockQuery = () => {
  const { getBlockNumber } = useAlchemy();
  const queryClient = useQueryClient();

  // get latest block mined
  const latestBlockQuery = useQuery({
    queryKey: ["latestBlockQuery"],
    queryFn: () => getBlockNumber(),
    refetchInterval: 12 * 1000, // every 12 seconds
    staleTime: 12 * 1000, // every 12 seconds
  });

  return {
    latestBlockQuery,
  };
};

