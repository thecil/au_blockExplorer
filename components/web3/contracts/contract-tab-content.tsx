import { useContractQuery } from "@/queries/contract-query";
import { Web3Address } from "@/types/web3";
import React from "react";
import ContractAbi from "./contract-abi";

const ContractTabContent: React.FC<{ address: Web3Address }> = ({
  address
}) => {
  const { contractAbiQuery } = useContractQuery(address);
  return (
    <div className="border rounded-md p-4">
      <ContractAbi abiQuery={contractAbiQuery} />
    </div>
  );
};

export default ContractTabContent;
