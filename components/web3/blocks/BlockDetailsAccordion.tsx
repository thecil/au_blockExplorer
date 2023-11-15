import React from "react";
import { BlockDetailsProps } from "@/types/web3";
import iconDesciptions from "@/data/iconDescriptions.json";
import Accordion from "@/components/Accordion";
import BlockOrTxContent from "../BlockOrTxContent";

const BlockDetailsAccordion: React.FC<BlockDetailsProps> = ({ block }) => {
  const { block: iconDescription } = iconDesciptions;
  return (
    <Accordion title="More Details:">
      <div className="flex flex-col space-y-2">
        {/* block hash*/}
        <BlockOrTxContent title="Hash" iconDescription={iconDescription.hash}>
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
        <BlockOrTxContent title="Nonce" iconDescription={iconDescription.nonce}>
          <p className="truncate">{block.nonce}</p>
        </BlockOrTxContent>
      </div>
    </Accordion>
  );
};

export default BlockDetailsAccordion;
