"use client";

import React from "react";
import HelpIcon from "@/components/icons/HelpIcon";
import Link from "next/link";

interface BlockOrTxProps {
  title: string;
  data: {
    value: string | number;
    extra?: {
      value: string | number;
      style?: string;
    };
    link?: {
      title: string;
      href: string;
    };
  };
  iconDescription?: string; // @TODO add description on each help icon
}

const BlockOrTxData: React.FC<BlockOrTxProps> = ({ title, data }) => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row">
      {/* title */}
      <div className=" md:w-96 flex space-x-4 items-center font-semibold dark:text-gray-400">
        <HelpIcon />
        <p>{title}:</p>
      </div>
      {/* data */}
      <div className="flex flex-col">
        <div className="flex space-x-1">
          {data.link && (
            <Link className="text-blue-500" href={data.link.href}>
              {data.link.title}
            </Link>
          )}
          <p>{data.value}</p>
        </div>
        {data.extra && <p className={data.extra.style}>{data.extra.value}</p>}
      </div>
    </div>
  );
};

export default BlockOrTxData;
