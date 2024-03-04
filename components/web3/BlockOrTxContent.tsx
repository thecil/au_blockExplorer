"use client";

import React from "react";
import { Icons } from "@/types/components";
import IconController from "../IconController";
import ToolTipController from "../ToolTipController";

interface BlockOrTxProps {
  title: string;
  children: React.ReactNode;
  iconDescription: string;
}

const BlockOrTxContent: React.FC<BlockOrTxProps> = ({
  title,
  iconDescription,
  children
}) => {
  return (
    <div className="grid md:grid-flow-col justify-items-start ">
      {/* title */}
      <div className="place-self-start flex space-x-2 items-center font-semibold dark:text-neutral-400">
        <ToolTipController content={iconDescription} side="right">
          <IconController icon={Icons.help} />
        </ToolTipController>
        <p>{title}:</p>
      </div>
      {/* children */}
      <div className="md:place-self-end">{children}</div>
    </div>
  );
};

export default BlockOrTxContent;
