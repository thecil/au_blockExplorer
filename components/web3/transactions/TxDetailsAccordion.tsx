import React from "react";
import type { BigNumber } from "alchemy-sdk";
import { TxDetailsProps } from "@/types/web3";
import { Icons } from "@/types/components";
import iconDescriptions from "@/data/iconDescriptions.json";
import {
  formatGwei,
  formatGasToLocaleString,
  getGasUsagePercentage,
  getTxSavingFees,
  getTxBurnedFees
} from "@/utils/web3";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import BlockOrTxContent from "../BlockOrTxContent";
import BadgeController from "@/components/BadgeController";

const TxDetailsAccordion: React.FC<TxDetailsProps> = ({ tx }) => {
  const { transaction: iconDescription } = iconDescriptions;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>More Details:</AccordionTrigger>
        <AccordionContent>
          <div className="p-4 grid gap-4 bg-slate-100 dark:bg-black rounded-lg">
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
                    <BadgeController
                      name="Burnt:"
                      value={`${getTxBurnedFees(
                      tx.receipt.gasUsed as BigNumber,
                      tx.response.maxPriorityFeePerGas as BigNumber,
                      tx.receipt.effectiveGasPrice as BigNumber
                      )} ETH`}
                      icon={Icons.flame}
                      variant="secondary"
                    />
                    <BadgeController
                      name="Txns Savings:"
                      value={`${getTxSavingFees(
                      tx.response.maxFeePerGas as BigNumber,
                      tx.response.maxPriorityFeePerGas as BigNumber,
                      tx.receipt.effectiveGasPrice as BigNumber,
                      tx.receipt.gasUsed as BigNumber
                      )} ETH`}
                      icon={Icons.leaf}
                      variant="secondary"
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
                <BadgeController
                  name="Txn Type:"
                  value={tx.receipt?.type as number}
                  variant="secondary"
                />
                <BadgeController
                  name="Nonce:"
                  value={tx.response?.nonce as number}
                  variant="secondary"
                />
                <BadgeController
                  name="Position in Block:"
                  value={tx.receipt?.transactionIndex as number}
                  variant="secondary"
                />
              </div>
            </BlockOrTxContent>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TxDetailsAccordion;
