import React from "react";
import { BlockDetailsProps } from "@/types/web3";
import iconDesciptions from "@/data/iconDescriptions.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import BlockOrTxContent from "../BlockOrTxContent";

const BlockDetailsAccordion: React.FC<BlockDetailsProps> = ({ block }) => {
  const { block: iconDescription } = iconDesciptions;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>More Details:</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-2 p-2 bg-slate-100 dark:bg-black rounded-lg">
            {/* block hash*/}
            <BlockOrTxContent
              title="Hash"
              iconDescription={iconDescription.hash}
            >
              <p className="truncate">{block.hash}</p>
            </BlockOrTxContent>
            {/* block parent hash*/}
            <BlockOrTxContent
              title="Parent Hash"
              iconDescription={iconDescription.parentHash}
            >
              <p className="truncate">{block.parentHash}</p>
            </BlockOrTxContent>
            {/* block state root */}
            <BlockOrTxContent
              title="StateRoot"
              iconDescription={iconDescription.stateRoot}
            >
              <p>state root here</p>
            </BlockOrTxContent>
            {/* block withdrawal root*/}
            <BlockOrTxContent
              title="WithdrawalsRoot"
              iconDescription={iconDescription.withdrawalsRoot}
            >
              <p>withdrawal root here</p>
            </BlockOrTxContent>
            {/* block nonce*/}
            <BlockOrTxContent
              title="Nonce"
              iconDescription={iconDescription.nonce}
            >
              <p className="truncate">{block.nonce}</p>
            </BlockOrTxContent>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BlockDetailsAccordion;
