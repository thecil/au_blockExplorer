import {
  BigNumber,
  BlockWithTransactions,
  Block,
  TransactionReceipt
} from "alchemy-sdk";
import { formatEther } from "viem";
import { BlockFees, Transaction } from "@/types/web3";

export * from "viem";

// returns shorted address as '0x1223...1233'
export const shortAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(
    address.length - 5,
    address.length
  )}`;
// calculate the total fee of a transaction
// gas price * gas limit = transaction fee
export const getTransactionFee = (tx: Transaction): string => {
  if (tx.receipt && tx.response) {
    if (tx.response.gasPrice) {
      const _fee = tx.response.gasPrice.mul(tx.receipt.gasUsed);
      return formatEther(BigInt(_fee.toString()));
    }
  }
  return formatEther(BigInt(0));
};

/**
 *  calculate the block rewards
 * block base reward + (total tx fees - burnt fees) = block reward
 * block base reward is 0
 * @param block Object<BlockWithTransactions>
 * @param txnsReceipts Array<TransactionReceipt>
 * @returns Object<BlockFees> | undefined
 */
export const getBlockReward = (
  block: BlockWithTransactions,
  txnsReceipts: TransactionReceipt[]
): BlockFees | undefined => {
  let totalTxFees = BigNumber.from(0);
  let burntFees = BigNumber.from(0);
  for (const tx of block.transactions) {
    const _txReceipt = txnsReceipts.find(
      (value) => value.transactionHash === tx.hash
    );
    if (_txReceipt && tx.gasPrice) {
      const _fee = tx.gasPrice.mul(_txReceipt.gasUsed);
      totalTxFees = totalTxFees.add(_fee);
    }
  }
  if (block.baseFeePerGas) burntFees = block.baseFeePerGas.mul(block.gasUsed);
  const blockReward = totalTxFees.sub(burntFees);

  const res: BlockFees = {
    totalTxFees: formatEther(BigInt(totalTxFees.toString())),
    burntFees: formatEther(BigInt(burntFees.toString())),
    blockReward: formatEther(BigInt(blockReward.toString()))
  };
  return res;
};

/**
 * Calculate the tx fee that is burnt in a block
 * gas used * base fee
 * @param block Object<Block | BlockWithTransactions>
 * @returns string | undefined
 */
export const getBlockBurnedFees = (
  block: Block | BlockWithTransactions
): string | undefined => {
  if (block.baseFeePerGas) {
    const _blockFees = block.gasUsed.mul(block.baseFeePerGas);
    return formatEther(BigInt(_blockFees.toString()));
  }
  return undefined;
};

/**
 * Calculate the tx fee that is burnt in a transaction
 * gas used * base fee
 * @param gasUsed BigNumber
 * @param effectiveGasPrice BigNumber
 * @param maxPriorityFeePerGas BigNumber
 * @returns string
 */
export const getTxBurnedFees = (
  gasUsed: BigNumber,
  effectiveGasPrice: BigNumber,
  maxPriorityFeePerGas: BigNumber
): string => {
  const _baseFee = getBaseFee(effectiveGasPrice, maxPriorityFeePerGas);
  const _burnedFees = gasUsed.mul(_baseFee);
  if (_burnedFees.isNegative())
    return formatEther(BigInt(_burnedFees.abs().toString()));
  return formatEther(BigInt(_burnedFees.toString()));
};
/**
 * returns a number splited on decimals
 * ex:"0,000,000"
 * @param amount BigNumber
 * @returns string
 */
export const formatGasToLocaleString = (amount: BigNumber): string =>
  Number(amount).toLocaleString();

/**
 * Calculate the % of gas used
 */
export const getGasUsagePercentage = (
  gasLimit: BigNumber,
  gasUsed: BigNumber
): string => {
  const _gasLimit = gasLimit.toNumber();
  const _gasUsed = gasUsed.toNumber();
  return ((_gasUsed / _gasLimit) * 100).toFixed(2);
};

/**
 * Calculate the base fee for given params
 * @param effectiveGasPrice BigNumber
 * @param maxPriorityFeePerGas BigNumber
 * @returns BigNumber
 */
export const getBaseFee = (
  effectiveGasPrice: BigNumber,
  maxPriorityFeePerGas: BigNumber
) => effectiveGasPrice.sub(maxPriorityFeePerGas);

/**
 * the amount returned to your wallet after the priority tip and basefee are paid.
 * (max fee - priority fee - basefee) * gas used
 */
export const getTxSavingFees = (
  maxFeePerGas: BigNumber,
  maxPriorityFeePerGas: BigNumber,
  effectiveGasPrice: BigNumber,
  gasUsed: BigNumber
): string => {
  const _baseFee = getBaseFee(effectiveGasPrice, maxPriorityFeePerGas);
  // (max fee - priority fee - basefee)
  const _sub = maxFeePerGas.sub(maxPriorityFeePerGas).sub(_baseFee);
  // sub * gasUsed
  const _res = _sub.mul(gasUsed);
  return formatEther(BigInt(_res.toString()));
};
