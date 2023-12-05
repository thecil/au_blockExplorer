import { Metadata } from "next";
import TransactionHashController from "@/components/web3/transactions/TransactionHashController";
import { Hex } from "@/types/web3";

type Props = {
  params: { txHash: string | Hex };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Transaction ${params.txHash}`
  };
};

const Page = ({ params }: Props) => {
  return <TransactionHashController txHash={params.txHash as Hex} />;
};

export default Page;
