"use client";

import React from "react";
import { IconContext } from "react-icons";
import {
  IoCubeOutline, // block icon
  IoHelpCircleOutline, // help icon
  IoTimeOutline, // time icon
  IoCopyOutline, // copy icon
  IoCheckmark, // check mark icon
  IoReaderOutline, // tx icon
  IoAdd,
  IoRemove
} from "react-icons/io5";
import { Icons } from "@/types/components";

interface IconProps {
  icon: Icons;
  size?: string;
}

const IconController: React.FC<IconProps> = ({ icon, size }) => {
  const getIcon = (icon: Icons) => {
    switch (icon) {
      case Icons.block:
        return <IoCubeOutline />;
      case Icons.help:
        return <IoHelpCircleOutline />;
      case Icons.time:
        return <IoTimeOutline />;
      case Icons.copy:
        return <IoCopyOutline />;
      case Icons.check:
        return (
          <div className="text-green-500">
            <IoCheckmark />
          </div>
        );
      case Icons.transaction:
        return <IoReaderOutline />;
      case Icons.add:
        return <IoAdd />;
      case Icons.remove:
        return <IoRemove />;
      default:
        return null;
    }
  };

  return (
    <IconContext.Provider value={{ size: size ? size : "1.3em" }}>
      <div>{getIcon(icon)}</div>
    </IconContext.Provider>
  );
};

export default IconController;
