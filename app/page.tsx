import { Metadata } from "next";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { useAlchemy } from "@/hooks/useAlchemy";
import { getEthPrice } from "@/lib/actions/etherscan";

import HomePage from "@/components/HomePage";
export const metadata: Metadata = {
  title: "thecil - Ethereum Block Explorer"
};

export default async function Home() {
  const { getBlockNumber } = useAlchemy();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["latestBlockQuery"],
    queryFn: () => getBlockNumber()
  });

  await queryClient.prefetchQuery({
    queryKey: ["etherPrice"],
    queryFn: async () => {
      const _res = await getEthPrice();
      if (_res) {
        const _parse = JSON.parse(_res);
        // Convert the ethusd price to a number, fix to 2 decimal places, and then convert back to a string
        return Number(_parse.result.ethusd).toFixed(2);
      }
      return undefined;
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
