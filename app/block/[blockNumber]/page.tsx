import BlockNumberController from "@/components/web3/blocks/BlockNumberController";
import { Metadata } from "next";

type Props = {
  params: { blockNumber: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Block #${params.blockNumber}`
  };
};

const Page = ({ params }: Props) => {
  return <BlockNumberController blockNumber={params.blockNumber} />;
};

export default Page;
