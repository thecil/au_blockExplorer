import BlockNumberController from "@/components/web3/blocks/BlockNumberController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block Details"
};

const Page = ({ params }: { params: { blockNumber: string } }) => {
  return <BlockNumberController blockNumber={params.blockNumber} />;
};

export default Page;
