"use client";

import React, { useEffect, useState } from "react";
import { Icons } from "@/types/components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import IconController from "./IconController";

interface CopyProps {
  text: string;
}

const CopyToClipboardButton: React.FC<CopyProps> = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }
    return () => {};
  }, [copySuccess]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip open={isHovered || copySuccess}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            disabled={copySuccess}
            onClick={() => copyToClipboard()}
            size="icon"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <IconController
              icon={copySuccess ? Icons.check : Icons.copy}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{copySuccess ? "Copied!" : "Copy to Clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboardButton;
