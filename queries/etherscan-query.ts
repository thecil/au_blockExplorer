import { useQuery } from "@tanstack/react-query";
import { getEthPrice } from "@/lib/actions/etherscan";

export const useEtherscanQuery = () => {
  // get ether price
  const etherPriceQuery = useQuery({
    queryKey: ["etherPrice"],
    queryFn: async () => {
      const _res = await getEthPrice();
      if (_res) {
        const _parse = JSON.parse(_res);
        // Convert the ethusd price to a number, fix to 2 decimal places, and then convert back to a string
        return Number(_parse.result.ethusd).toFixed(2);
      }
      return undefined;
    },
    refetchInterval: 10 * 60 * 1000, // every 10 minutes
    staleTime: 9 * 60 * 1000 // every 9 minutes
  });

  return {
    etherPriceQuery
  };
};
