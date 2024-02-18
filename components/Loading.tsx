"use client";
import { Loader2 } from "lucide-react";

type LoadingProps = {
  size?: number;
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({ size = 24, className }) => {
  return (
    <div
      className={`flex justify-center w-full ${
        className ? className : "text-slate-500"
      }`}
    >
      <Loader2 className="animate-spin" size={size} aria-label="Loading" />
    </div>
  );
};

export default Loading;
