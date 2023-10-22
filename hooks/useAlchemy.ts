import { Network, Alchemy, type BigNumber } from "alchemy-sdk";
import type { Block, TransactionResponse } from "alchemy-sdk";
import { useMemo, useState, useEffect } from "react";
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const _logs = false; // show console.logs for debugging

/**
 * hook that provides the Alchemy sdk methods
 * ETH MAINNET ONLY FOR NOW
 * Docs: https://docs.alchemy.com/
 */
export const useAlchemy = () => {
  // alchemy sdk config
  const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  // alchemy instance
  const alchemy: Alchemy = new Alchemy(settings);
  if (_logs) console.log("useAlchemy:status", alchemy);

  // Returns the block number of the most recently mined block.
  const getBlockNumber = async (): Promise<number> => {
    try {
      const _blockNumber = await alchemy.core.getBlockNumber();
      if (_logs) console.log("useAlchemy:getBlockNumber", _blockNumber);
      return _blockNumber;
    } catch (error) {
      if (_logs) console.log("useAlchemy:getBlockNumber:error", { error });
      return 0;
    }
  };

  //   Returns the block from the network based on the provided block number or hash.
  const getBlock = async (
    hashOrBlockNumber: string | number
  ): Promise<Block | undefined> => {
    try {
      const _block = await alchemy.core.getBlock(hashOrBlockNumber);
      if (_logs) console.log("useAlchemy:getBlock", _block);
      return _block;
    } catch (error) {
      if (_logs) console.log("useAlchemy:getBlock:error", { error });
      return;
    }
  };

  // Returns the best guess of the current gas price to use in a transaction.
  const getGasPrice = async (): Promise<BigNumber | undefined> => {
    try {
      const _gasPrice = await alchemy.core.getGasPrice();
      if (_logs) console.log("useAlchemy:getGasPrice", _gasPrice);
      return _gasPrice;
    } catch (error) {
      if (_logs) console.log("useAlchemy:getGasPrice:error", { error });
      return;
    }
  };

  /**
   * Returns the transaction with hash or null if the transaction is unknown.
   *
   * If a transaction has not been mined, this method will search the transaction pool.
   * Various backends may have more restrictive transaction pool access
   * (e.g. if the gas price is too low or the transaction was only recently sent and not yet indexed)
   * in which case this method may also return null.
   */
  const getTransaction = async (
    hash: string
  ): Promise<TransactionResponse | null> => {
    try {
      const _tx = await alchemy.transact.getTransaction(hash);
      if (_logs) console.log("useAlchemy:getTransaction", _tx);

      return _tx;
    } catch (error) {
      console.log("useAlchemy:getTransaction:error", { error });
      return null;
    }
  };

  // Subscription for new blocks on Eth Mainnet.
  const [subBlockNumber, setSubBlockNumber] = useState(0);

  useEffect(() => {
    const eventHandler = (_blockNumber: any) => {
      setSubBlockNumber(_blockNumber);
    };

    alchemy.ws.on("block", eventHandler);

    return () => {
      alchemy.ws.off("block", eventHandler);
    };
  }, []);

    // store the latest block number
  const latestBlockNumber = useMemo(() => {
    if (_logs) console.log("latestBlockNumber", subBlockNumber);
    if (subBlockNumber !== 0) return subBlockNumber;
    return;
  }, [subBlockNumber]);

  return {
    // methods
    getBlockNumber,
    getGasPrice,
    getBlock,
    getTransaction,
    // subscriptions
    latestBlockNumber,
  };
};
