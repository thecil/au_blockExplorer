import { Metadata } from "next";
import { Web3Address } from "@/types/web3";
type Props = {
  params: { address: Web3Address };
};

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  return {
    title: `Transaction ${params.address}`
  };
};

const Page = ({ params }: Props) => {
  return (
    <div className="p-4 min-h-screen">
      {/* tx hash header*/}
      <div className="py-4 border-b border-gray-500 ">
        <h2 className="font-bold text-xl">Address {params.address}</h2>
      </div>
    </div>
  );
};

export default Page;
