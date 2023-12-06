import { ReactNode, useMemo } from "react";

interface ToolTipProps {
  message: string;
  children: ReactNode;
  direction?: "top" | "bottom" | "right";
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
        return "bottom-full mx-auto";
      case "bottom":
        return "top-full mx-auto";
      case "right":
        return "right-full my-auto";
      default:
        return "top-full my-auto";
    }
  }, [direction]);

  return (
    <div className="relative flex items-center group">
      {children}
      <div className={`absolute ${toolTipDirection} hidden group-hover:flex`}>
        <span
          className={`${
            minWith ? "w-fit" : "w-64"
          } z-10 static p-2 text-sm leading-none bg-white dark:text-white whitespace-no-wrap dark:bg-neutral-900 shadow-lg rounded-md`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
