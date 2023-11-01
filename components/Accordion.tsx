"use client";

import { useState } from "react";
import { Icons } from "@/types/components";
import IconController from "./IconController";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-2 w-full py-4 px-4 border rounded-lg bg-slate-100 dark:border-0 dark:bg-black">
      {isOpen && <div className="py-2 mb-4 border-b dark:border-b-gray-700 ">{children}</div>}
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-gray-400 font-semibold">{title}</p>
        <div className="text-blue-300 flex items-center space-x-1">
          <IconController icon={isOpen ? Icons.remove : Icons.add} />
          <p>{isOpen ? "Click to show less" : "Click to show more"}</p>
        </div>
      </button>
    </div>
  );
};

export default Accordion;
