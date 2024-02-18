"use client";

import React from "react";
import IconController from "./IconController";
import { Icons } from "@/types/components";
import { Badge } from "@/components/ui/badge";

interface BadgeProps {
  name: string;
  value: string | number;
  icon?: Icons;
  variant?: "secondary" | "destructive" | "outline";
}

const BadgeController: React.FC<BadgeProps> = ({
  name,
  value,
  icon,
  variant
}) => {
  return (
    <Badge variant={variant ? variant : "default"}>
      <div className="w-fit flex space-x-1 px-1 py-1 text-xs">
        {icon && <IconController icon={icon} />}
        <p className="text-neutral-400">{name}</p>
        <span>{value}</span>
      </div>
    </Badge>
  );
};

export default BadgeController;
