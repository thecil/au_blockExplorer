"use client";

import React, { useEffect, useState } from "react";
import ToolTipController from "./ToolTipController";
import { Icons } from "@/types/components";
import IconController from "./IconController";

interface CopyProps {
  text: string;
}

const CopyToClipboardButton: React.FC<CopyProps> = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);

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
    <ToolTipController
      content={copySuccess ? "Copied!" : "Copy to Clipboard"}
      side="top"
    >
      <button disabled={copySuccess} onClick={() => copyToClipboard()}>
        <IconController
          icon={copySuccess ? Icons.check : Icons.copy}
          size="14"
        />
      </button>
    </ToolTipController>
  );
};

export default CopyToClipboardButton;
