import { Metadata } from "next";
import TransactionHashController from "@/components/web3/transactions/TransactionHashController";

export const metadata: Metadata = {
  title: "Transaction Details"
};

const Page = ({ params }: { params: { txHash: string } }) => {
  return <TransactionHashController txHash={params.txHash} />;
};

export default Page;
