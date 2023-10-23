"use client";
import { IoSync } from "react-icons/io5";

type LoadingProps = {
  size?: number;
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({ size = 24, className }) => {
  return (
    <div
      className={`flex justify-center items-center my-48 ${
        className ? className : "text-slate-500"
      }`}
    >
      <IoSync className="animate-spin" size={size} aria-label="Loading" />
    </div>
  );
};

export default Loading;
