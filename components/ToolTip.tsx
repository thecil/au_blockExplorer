import { ReactNode } from "react";

const Tooltip = ({
  message,
  children
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute left-full flex flex-col items-start hidden ml-6 group-hover:flex">
        <span className="w-64 relative z-10 p-4 text-sm leading-none bg-white dark:text-white whitespace-no-wrap dark:bg-neutral-900 shadow-lg rounded-md">
          {message}
        </span>
        <div className="absolute top-1/2 left-0 w-3 h-3 -ml-1 transform -translate-y-1/2 rotate-45 bg-white dark:bg-neutral-900"></div>
      </div>
    </div>
  );
};

export default Tooltip;
