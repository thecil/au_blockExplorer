import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { ReactNode } from "react";

interface ToolTipProps {
  content: string;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

const TooltipController: React.FC<ToolTipProps> = ({ content, children, side }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipController;
