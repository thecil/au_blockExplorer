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
    <div className="flex flex-col space-y-2 md:flex-row justify-start">
      {/* title */}
      <div className=" md:w-96 flex space-x-4 items-center font-semibold dark:text-neutral-400">
        <ToolTipController content={iconDescription} side="top">
          <IconController icon={Icons.help} />
        </ToolTipController>
        <p>{title}:</p>
      </div>
      {/* children */}
      {children}
    </div>
  );
};

export default BlockOrTxContent;
