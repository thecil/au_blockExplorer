"use client";

import React, { useEffect, useState } from "react";
import ToolTipController from "./ToolTipController";
import { Icons } from "@/types/components";
import IconController from "./IconController";

interface CopyProps {
  text: string;
}

enum Stage {
  idle = "idle",
  copied = "copied",
}

const CopyToClipboardButton: React.FC<CopyProps> = ({ text }) => {
  const [stage, setStage] = useState(Stage.idle);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (copySuccess) {
      if (stage !== Stage.copied) setStage(Stage.copied);
    }
    setTimeout(() => {
      setCopySuccess(false);
      if (stage !== Stage.idle) setStage(Stage.idle);
    }, 1000);
    return () => {};
  }, [stage, copySuccess]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <div>
      {stage === Stage.idle && (
        <ToolTipController content="Copy to Clipboard" side="top">
          <button onClick={() => copyToClipboard()}>
            <IconController icon={Icons.copy} size="14" />
          </button>
        </ToolTipController>
      )}

      {stage === Stage.copied && (
        <ToolTipController content="Copied!" side="top">
          <IconController icon={Icons.check} size="14" />
        </ToolTipController>
      )}
    </div>
  );
};

export default CopyToClipboardButton;
