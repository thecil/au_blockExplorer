import { Metadata } from "next";
import TransactionHashController from "@/components/web3/transactions/TransactionHashController";

type Props = {
  params: { txHash: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Transaction ${params.txHash}`
  };
};

const Page = ({ params }: Props) => {
  return <TransactionHashController txHash={params.txHash} />;
};

export default Page;
