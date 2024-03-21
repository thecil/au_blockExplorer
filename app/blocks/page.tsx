import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { useAlchemy } from "@/hooks/useAlchemy";
import AllBlocksController from "@/components/web3/blocks/AllBlocksController";

export const metadata: Metadata = {
  title: "All Blocks"
};

const Page = async () => {
  const { getBlockNumber } = useAlchemy();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["latestBlockQuery"],
    queryFn: () => getBlockNumber()
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4 container">
        <AllBlocksController />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
