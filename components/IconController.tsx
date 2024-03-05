"use client";

import React from "react";
import {
  Box, // block icon
  HelpCircle, //help icon
  Clock, // time icon
  Copy, // copy icon
  Check, // check icon
  FileText, // tx icon
  Plus,
  Minus,
  CheckCircle2,
  XCircle,
  Leaf,
  Flame,
  ChevronDown,
  Wallet,
  Eye,
  Search,
  ExternalLink // external links
} from "lucide-react";
import { Icons } from "@/types/components";

interface IconProps {
  icon: Icons;
  size?: string;
}

const IconController: React.FC<IconProps> = ({ icon, size }) => {
  const _size = `${size ? `w-${size}` : "w-4"}`;

  const getIcon = (icon: Icons) => {
    switch (icon) {
      case Icons.block:
        return <Box className={_size} />;
      case Icons.help:
        return <HelpCircle className={_size} />;
      case Icons.time:
        return <Clock className={_size} />;
      case Icons.copy:
        return <Copy className={_size} />;
      case Icons.check:
        return <Check className={`${_size} text-green-500`} />;
      case Icons.transaction:
        return <FileText className={_size} />;
      case Icons.add:
        return <Plus className={_size} />;
      case Icons.remove:
        return <Minus className={_size} />;
      case Icons.circleCheck:
        return <CheckCircle2 className={`${_size} text-green-500`} />;
      case Icons.circleClose:
        <CheckCircle2 className={`${_size} text-green-500`} />;
        return <XCircle className={`${_size} text-red-500`} />;
      case Icons.leaf:
        return <Leaf className={`${_size} text-green-500`} />;
      case Icons.flame:
        return <Flame className={`${_size} text-red-500`} />;
      case Icons.down:
        return <ChevronDown className={_size} />;
      case Icons.wallet:
        return <Wallet className={_size} />;
      case Icons.eye:
        return <Eye className={_size} />;
      case Icons.search:
        return <Search className={_size} />;
      case Icons.link:
        return <ExternalLink className={`${_size} text-blue-500`} />;
      default:
        return null;
    }
  };

  return <>{getIcon(icon)}</>;
};

export default IconController;
