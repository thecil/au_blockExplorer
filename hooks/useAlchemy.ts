import { Network, Alchemy, type BigNumber } from "alchemy-sdk";
import type {
  Block,
  TransactionResponse,
  BlockWithTransactions,
  TransactionReceiptsResponse,
  TransactionReceipt,
  OwnedNftsResponse,
  OwnedBaseNftsResponse
} from "alchemy-sdk";
import { Web3Address, ENS } from "@/types/web3";
import { GetNftsForOwnerOptions } from "alchemy-sdk";
import contracts from "@/data/contracts.json";

// import { useMemo, useState, useEffect } from "react";
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const _logs = false; // show console.logs for debugging
// alchemy sdk config
const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};
// alchemy instance
const alchemy: Alchemy = new Alchemy(settings);
if (_logs) console.log("useAlchemy:status", alchemy);

/**
 * hook that provides the Alchemy sdk methods
 * ETH MAINNET ONLY FOR NOW
 * Docs: https://docs.alchemy.com/
 */
export const useAlchemy = () => {
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

  /**
   * Returns the block from the network based on the provided block number or hash.
   * In addition to the transaction hashes included in the block, it also returns the full transaction objects.
   */
  const getBlockWithTransactions = async (
    blockHashOrBlockTag: string | number
  ): Promise<BlockWithTransactions | undefined> => {
    try {
      const _blockWithTxns = await alchemy.core.getBlockWithTransactions(
        blockHashOrBlockTag
      );

      console.log("useAlchemy:getBlockWithTransactions", _blockWithTxns);
      return _blockWithTxns;
    } catch (error) {
      console.log("useAlchemy:getBlockWithTransactions:error", { error });
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
      const _tx = await alchemy.core.getTransaction(hash);
      if (_logs) console.log("useAlchemy:getTransaction", _tx);

      return _tx;
    } catch (error) {
      console.log("useAlchemy:getTransaction:error", { error });
      return null;
    }
  };

  // Returns the transaction receipt for hash or null if the transaction has not been mined.
  const getTransactionReceipt = async (
    transactionHash: string
  ): Promise<TransactionReceipt | null> => {
    try {
      const _tx = await alchemy.core.getTransactionReceipt(transactionHash);
      if (_logs) console.log("useAlchemy:getTransactionReceipt ", _tx);
      return _tx;
    } catch (error) {
      console.log("useAlchemy:getTransactionReceipt :error", { error });
      return null;
    }
  };

  // Gets all transaction receipts for a given block by number or block hash.
  const getTransactionReceipts = async (
    blockHash: string
  ): Promise<TransactionReceiptsResponse | null> => {
    try {
      const _tx = await alchemy.core.getTransactionReceipts({
        blockHash
      });
      if (_logs) console.log("useAlchemy:getTransactionReceipts ", _tx);

      return _tx;
    } catch (error) {
      console.log("useAlchemy:getTransactionReceipts :error", { error });
      return null;
    }
  };

  /**
   * @description Get all NFTs for an owner.
   * @param owner The address of the owner.
   * @param options The optional parameters to use for the request.
   * @returns array of objects
   */
  const getNftsForOwner = async (
    owner: Web3Address | ENS,
    options: GetNftsForOwnerOptions
  ): Promise<OwnedNftsResponse | OwnedBaseNftsResponse | null> => {
    try {
      const _nfts = await alchemy.nft.getNftsForOwner(owner, options);
      if (_logs) console.log("useAlchemy:getNftsForOwner", _nfts);

      return _nfts;
    } catch (error) {
      console.log("useAlchemy:getNftsForOwner:error", { error });
      return null;
    }
  };

  /**
   * @description fetch all ENS Domain Names owned by a user.
   * @param owner The address of the owner.
   * @returns array of objects
   */
  const getEns = async (owner: Web3Address | ENS) => {
    try {
      const _options = {
        contractAddresses: [contracts.ens]
      };
      const _ens = await getNftsForOwner(owner, _options);
      if (_logs) console.log("useAlchemy:getEns", _ens);

      return _ens;
    } catch (error) {
      console.log("useAlchemy:getEns:error", { error });
      return null;
    }
  };
  // Subscription for new blocks on Eth Mainnet.
  // const [subBlockNumber, setSubBlockNumber] = useState(0);

  // useEffect(() => {
  //   const eventHandler = (_blockNumber: any) => {
  //     console.log("latest block", _blockNumber);

  //     setSubBlockNumber(_blockNumber);
  //   };

  //   alchemy.ws.on("block", eventHandler);

  //   return () => {
  //     console.log("subs off");

  //     alchemy.ws.off("block", eventHandler);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // // store the latest block number fetched from subscription "block"
  // const latestBlockNumber = useMemo(() => {
  //   if (_logs) console.log("latestBlockNumber", subBlockNumber);
  //   if (subBlockNumber !== 0) return subBlockNumber;
  //   return;
  // }, [subBlockNumber]);

  return {
    // methods core
    getBlockNumber,
    getGasPrice,
    getBlock,
    getBlockWithTransactions,
    getTransaction,
    getTransactionReceipt,
    getTransactionReceipts,
    // methods nft
    getNftsForOwner,
    // other methods
    getEns
    // subscriptions
    // latestBlockNumber
  };
};
