"use client";

import React from "react";
import IconController from "./IconController";
import { Icons } from "@/types/components";

interface BadgeProps {
  name: string;
  value: string | number;
  icon?: Icons;
}

const Badge: React.FC<BadgeProps> = ({ name, value, icon }) => {
  return (
    <div className="w-fit flex space-x-1 py-1 px-2  border rounded-lg text-xs bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
      {icon && <IconController icon={icon} />}
      <p className="text-neutral-400">{name}</p>
      <span>{value}</span>
    </div>
  );
};

export default Badge;
