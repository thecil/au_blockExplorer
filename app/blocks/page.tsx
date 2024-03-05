import AllBlocksController from "@/components/web3/blocks/AllBlocksController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blocks"
};

const Page = () => {
  return (
    <div className="p-4 container">
      <AllBlocksController />
    </div>
  );
};

export default Page;
