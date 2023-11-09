import { ReactNode, useMemo } from "react";

interface ToolTipProps {
  message: string;
  children: ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  minWith?: boolean;
}

const Tooltip: React.FC<ToolTipProps> = ({
  message,
  children,
  direction,
  minWith
}) => {
  const toolTipDirection = useMemo(() => {
    switch (direction) {
      case "top":
        return "bottom-full left-1/2";
      case "bottom":
        return "top-full left-1/2";
      case "left":
        return "right-full top-1/2";
      case "right":
      default:
        return "left-full top-1/2";
    }
  }, [direction]);

  return (
    <div className="relative flex items-center group">
      {children}
      <div className={`absolute ${toolTipDirection} hidden group-hover:flex`}>
        <span
          className={`${
            minWith ? "w-fit" : "w-64"
          } z-10 relative p-4 text-sm leading-none bg-white dark:text-white whitespace-no-wrap dark:bg-neutral-900 shadow-lg rounded-md`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
