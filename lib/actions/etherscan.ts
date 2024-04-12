"use server";

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
