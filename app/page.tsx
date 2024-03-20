import { Metadata } from "next";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { useAlchemy } from "@/hooks/useAlchemy";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
