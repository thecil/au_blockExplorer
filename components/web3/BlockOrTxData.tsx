"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "@/types/components";
import IconController from "../IconController";
import Tooltip from "../ToolTip";
import CopyToClipboardButton from "../CopyToClipboard";
interface BlockOrTxProps {
  title: string;
  data: {
    value: string | number;
    extra?: {
      value: string | number;
      style?: string;
      noFlex: boolean;
    };
    link?: {
      title: string;
      href: string;
    };
  };
  iconDescription: string;
  copy?: string; // allow the value to be copied to clipboard if neccesary
}

const BlockOrTxData: React.FC<BlockOrTxProps> = ({
  title,
  data,
  iconDescription,
  copy
}) => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row">
      {/* title */}
      <div className=" md:w-96 flex space-x-4 items-center font-semibold dark:text-gray-400">
        <Tooltip message={iconDescription}>
          <IconController icon={Icons.help} />
        </Tooltip>
        <p>{title}:</p>
      </div>
      {/* data */}
      <div
        className={`flex ${data.extra && data.extra.noFlex ? "space-x-1" : "flex-col"}`}
      >
        <div className="flex space-x-1 items-center">
          {data.link && (
            <Link className="text-blue-500" href={data.link.href}>
              {data.link.title}
            </Link>
          )}
          <p className="truncate">{data.value}</p>
          {copy && <CopyToClipboardButton text={copy} />}
        </div>
        {data.extra && <p className={data.extra.style}>{data.extra.value}</p>}
      </div>
    </div>
  );
};

export default BlockOrTxData;
