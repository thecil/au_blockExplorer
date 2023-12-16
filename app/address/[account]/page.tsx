import { Metadata } from "next";
import { Web3Address } from "@/types/web3";
import CopyToClipboardButton from "@/components/CopyToClipboard";
import AccountController from "@/components/web3/address/AccountController";

type Props = {
  params: { account: Web3Address };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Address ${params.account}`
  };
};

const Page = ({ params }: Props) => {
  return (
    <div className="p-4 min-h-screen md:mx-auto md:w-9/12">
      {/* header*/}
      <div className="py-4 border-b border-gray-500 ">
        <div className="flex items-center space-x-2">
          <h2 className="font-bold text-xl">Address</h2>
          <p className="text-xl truncate">{params.account}</p>
          <CopyToClipboardButton text={params.account} />
        </div>
      </div>
      <AccountController account={params.account} />
    </div>
  );
};

export default Page;
