"use client";

import React, { useEffect, useState } from "react";
import Tooltip from "./ToolTip";
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
    }, 2000);
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
        <Tooltip message="Copy to Clipboard">
          <button onClick={() => copyToClipboard()}>
            <IconController icon={Icons.copy} size="14" />
          </button>
        </Tooltip>
      )}

      {stage === Stage.copied && (
        <IconController icon={Icons.check} size="14" />
      )}
    </div>
  );
};

export default CopyToClipboardButton;
