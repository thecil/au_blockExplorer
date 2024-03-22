/**
 * Alchemy sdk methods
 * ETH MAINNET ONLY FOR NOW
 * Docs: https://docs.alchemy.com/
 */
import { Network, Alchemy, type BigNumber } from "alchemy-sdk";
import type {
  Block,
  TransactionResponse,
  BlockWithTransactions,
  TransactionReceiptsResponse,
  TransactionReceipt,
  OwnedNftsResponse,
  OwnedBaseNftsResponse,
  GetTokensForOwnerResponse,
  AssetTransfersParams,
  AssetTransfersCategory,
  AssetTransfersResponse
} from "alchemy-sdk";
import { Web3Address, ENS, Hex } from "@/types/web3";
import { GetNftsForOwnerOptions, SortingOrder } from "alchemy-sdk";
import contracts from "@/data/contracts.json";

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

// Checks if the provided address is a smart contract.
export const isContractAddress = async (address: Web3Address): Promise<boolean> => {
  try {
    const _isContract = await alchemy.core.isContractAddress(address);
    if (_logs) console.log("useAlchemy:isContractAddress", _isContract);
    return _isContract;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getBlockNumber:error", { error });
  }
  return false;
};

// Returns the block number of the most recently mined block.
export const getBlockNumber = async (): Promise<number> => {
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
export const getBlock = async (
  hashOrBlockNumber: Hex | number
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
export const getBlockWithTransactions = async (
  blockHashOrBlockTag: Hex | number
): Promise<BlockWithTransactions | undefined> => {
  try {
    const _blockWithTxns =
      await alchemy.core.getBlockWithTransactions(blockHashOrBlockTag);

    if (_logs)
      console.log("useAlchemy:getBlockWithTransactions", _blockWithTxns);
    return _blockWithTxns;
  } catch (error) {
    if (_logs)
      console.log("useAlchemy:getBlockWithTransactions:error", { error });
    return;
  }
};
// Returns the best guess of the current gas price to use in a transaction.
export const getGasPrice = async (): Promise<BigNumber | undefined> => {
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
export const getTransaction = async (
  hash: Hex
): Promise<TransactionResponse | null> => {
  try {
    const _tx = await alchemy.core.getTransaction(hash);
    if (_logs) console.log("useAlchemy:getTransaction", _tx);
    return _tx;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getTransaction:error", { error });
    return null;
  }
};

// Returns the transaction receipt for hash or null if the transaction has not been mined.
export const getTransactionReceipt = async (
  transactionHash: Hex
): Promise<TransactionReceipt | null> => {
  try {
    const _tx = await alchemy.core.getTransactionReceipt(transactionHash);
    if (_logs) console.log("useAlchemy:getTransactionReceipt ", _tx);
    return _tx;
  } catch (error) {
    if (_logs)
      console.log("useAlchemy:getTransactionReceipt :error", { error });
    return null;
  }
};

// Gets all transaction receipts for a given block by number or block hash.
export const getTransactionReceipts = async (
  blockHash: Hex
): Promise<TransactionReceiptsResponse | null> => {
  try {
    const _tx = await alchemy.core.getTransactionReceipts({
      blockHash
    });
    if (_logs) console.log("useAlchemy:getTransactionReceipts ", _tx);

    return _tx;
  } catch (error) {
    if (_logs)
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
export const getNftsForOwner = async (
  owner: Web3Address | ENS,
  options: GetNftsForOwnerOptions
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse | null> => {
  try {
    const _nfts = await alchemy.nft.getNftsForOwner(owner, options);
    if (_logs) console.log("useAlchemy:getNftsForOwner", _nfts);

    return _nfts;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getNftsForOwner:error", { error });
    return null;
  }
};

/**
 * @description fetch all ENS Domain Names owned by a user.
 * @param owner The address of the owner.
 * @returns array of objects
 */
export const getEns = async (owner: Web3Address | ENS) => {
  try {
    const _options = {
      contractAddresses: [contracts.ens]
    };
    const _ens = await getNftsForOwner(owner, _options);
    if (_logs) console.log("useAlchemy:getEns", _ens);

    return _ens;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getEns:error", { error });
    return null;
  }
};

/**
 * @description resolve a user's address from an ENS Domain Name owned by the user.
 * @param ens domain name to resolve
 * @returns Web3Address | null
 */
export const getEnsOwner = async (ens: ENS) => {
  try {
    const _address = await alchemy.core.resolveName(ens);
    if (_logs) console.log("useAlchemy:getEnsOwner:success", { _address });

    return _address;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getEnsOwner:error", { error });
    return null;
  }
};
/**
 * @description Returns the balance of a given address as of the provided block.
 * @param addressOrName The address or ENS name of the account to get the balance for.
 * @returns This is an estimate of the balance of gas. Properties returned in this object include:
 * 1. hex: string This is the hex.
 * 2. type: string BigNumber.
 *
 */
export const getBalance = async (
  addressOrName: Web3Address | ENS
): Promise<BigNumber | null> => {
  try {
    const response = await alchemy.core.getBalance(addressOrName);
    if (_logs) console.log("useAlchemy:getEns", response);

    return response;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getEns:error", { error });
    return null;
  }
};

/**
 * @description Returns the tokens that the specified address owns, along with the amount of each token and the relevant metadata.
 * @param addressOrName The owner address to get the tokens with balances for.
 * @returns Owned tokens for the provided addresses along with relevant metadata.
 */
export const getTokensForOwner = async (
  addressOrName: Web3Address | ENS
): Promise<GetTokensForOwnerResponse | null> => {
  try {
    const response = await alchemy.core.getTokensForOwner(addressOrName);
    if (_logs) console.log("useAlchemy:getEns", response);

    return response;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getEns:error", { error });
    return null;
  }
};

export const getAssetTransfers = async (
  address: Web3Address,
  category: AssetTransfersCategory
): Promise<AssetTransfersResponse | null> => {
  const options: AssetTransfersParams = {
    fromBlock: "0x0",
    fromAddress: address,
    category: [category],
    order: SortingOrder.DESCENDING
  };
  try {
    const response = await alchemy.core.getAssetTransfers({ ...options });
    if (_logs) console.log("useAlchemy:getAssetTransfers", response);

    return response;
  } catch (error) {
    if (_logs) console.log("useAlchemy:getAssetTransfers:error", { error });
    return null;
  }
};
