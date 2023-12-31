import React from "react";
import type { BigNumber } from "alchemy-sdk";
import { TxDetailsProps } from "@/types/web3";
import { Icons } from "@/types/components";
import iconDesciptions from "@/data/iconDescriptions.json";
import {
  formatGwei,
  formatGasToLocaleString,
  getGasUsagePercentage,
  getTxSavingFees,
  getTxBurnedFees
} from "@/utils/web3";
import Accordion from "@/components/Accordion";
import BlockOrTxContent from "../BlockOrTxContent";
import Badge from "@/components/Badge";

const TxDetailsAccordion: React.FC<TxDetailsProps> = ({ tx }) => {
  const { transaction: iconDescription } = iconDesciptions;

  return (
    <Accordion title="More Details:">
      <div className="flex flex-col space-y-2">
        {/* tx gas limit & usage */}
        <BlockOrTxContent
          title="Gas Limit & Usage by Txn"
          iconDescription={iconDescription.gasLimitUsage}
        >
          <p>{`${formatGasToLocaleString(
            tx.response?.gasLimit as BigNumber
          )}  | ${formatGasToLocaleString(
            tx.receipt?.gasUsed as BigNumber
          )} (${getGasUsagePercentage(
            tx.response?.gasLimit as BigNumber,
            tx.receipt?.gasUsed as BigNumber
          )}%)`}</p>
        </BlockOrTxContent>
        {/* tx gas price */}
        {tx.receipt &&
        tx.response &&
        tx.response.maxPriorityFeePerGas &&
        tx.response.maxFeePerGas ? (
            <BlockOrTxContent
              title="Gas Fees"
              iconDescription={iconDescription.gasFees}
            >
              <p>{`Base: ${formatGwei(
                BigInt(
                tx.receipt.effectiveGasPrice
                  .sub(tx.response.maxPriorityFeePerGas as BigNumber)
                  .toString() as string
                )
              )} Gwei | Max: ${formatGwei(
                BigInt(tx.response.maxFeePerGas.toString() as string)
              )} Gwei | Max Priority: ${formatGwei(
                BigInt(tx.response.maxPriorityFeePerGas.toString() as string)
              )} Gwei`}</p>
            </BlockOrTxContent>
          ) : null}

        {/* tx burnt & saving fees */}
        {tx.receipt &&
        tx.response &&
        tx.receipt.gasUsed &&
        tx.response.maxPriorityFeePerGas &&
        tx.response.maxFeePerGas &&
        tx.receipt.effectiveGasPrice ? (
            <BlockOrTxContent
              title="Burnt & Savings Fees"
              iconDescription={iconDescription.burntSavingFees}
            >
              <div className="flex flex-col space-y-1 items-start md:flex-row md:space-x-1 md:space-y-0">
                <Badge
                  name="Burnt:"
                  value={`${getTxBurnedFees(
                  tx.receipt.gasUsed as BigNumber,
                  tx.response.maxPriorityFeePerGas as BigNumber,
                  tx.receipt.effectiveGasPrice as BigNumber
                  )} ETH`}
                  icon={Icons.flame}
                />
                <Badge
                  name="Txns Savings:"
                  value={`${getTxSavingFees(
                  tx.response.maxFeePerGas as BigNumber,
                  tx.response.maxPriorityFeePerGas as BigNumber,
                  tx.receipt.effectiveGasPrice as BigNumber,
                  tx.receipt.gasUsed as BigNumber
                  )} ETH`}
                  icon={Icons.leaf}
                />
              </div>
            </BlockOrTxContent>
          ) : null}

        {/* tx other attributes */}
        <BlockOrTxContent
          title="Other Attributes"
          iconDescription={iconDescription.otherAttributes}
        >
          <div className="flex flex-col space-y-1 items-start md:flex-row md:space-x-1 md:space-y-0">
            <Badge name="Txn Type:" value={tx.receipt?.type as number} />
            <Badge name="Nonce:" value={tx.response?.nonce as number} />
            <Badge
              name="Position in Block:"
              value={tx.receipt?.transactionIndex as number}
            />
          </div>
        </BlockOrTxContent>
      </div>
    </Accordion>
  );
};

export default TxDetailsAccordion;
