"use client";
import { Loader2 } from "lucide-react";

type LoadingProps = {
  size?: number;
  className?: string;
  text?: string;
};

const Loading: React.FC<LoadingProps> = ({ size = 24, className, text }) => {
  return (
    <div
      className={`grid justify-center justify-items-center h-full w-full ${
        className ? className : "text-slate-500"
      }`}
    >
      <Loader2 className="animate-spin" size={size} aria-label="Loading" />
      {text && <h2 className="text-2xl">{text}</h2>}
    </div>
  );
};

export default Loading;
