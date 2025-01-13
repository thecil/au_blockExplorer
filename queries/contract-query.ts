import { useQuery } from "@tanstack/react-query";
import type { Web3Address } from "@/types/web3";
import { useAlchemy } from "@/hooks/useAlchemy";
import { useEtherscanQuery } from "./etherscan-query";

export const useContractQuery = (address: Web3Address) => {
  const { isContractAddress } = useAlchemy();
  const { contractAbiQuery } = useEtherscanQuery(address);

  // verify if given address is a contract
  const isContract = useQuery({
    queryKey: ["isContract", address],
    queryFn: () => isContractAddress(address),
    enabled: Boolean(address)
  });

  return {
    isContract,
    contractAbiQuery
  };
};
