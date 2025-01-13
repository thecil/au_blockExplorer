"use server";

import { contractAbiResponse } from "@/types/etherscan";
import { Web3Address } from "@/types/web3";

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

// Returns the ether price
export const getEthPrice = async () => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error(`getEthPrice: ${error}`);
    throw error;
  }
};

// Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract.
export const getContractAbi = async (address: Web3Address) => {
  if (!address) return;
  try {
    const response = await fetch(
      `https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: contractAbiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`getContractAbi: ${error}`);
    throw error;
  }
};
