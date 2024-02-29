import React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="flex p-4 justify-between border-t">
        <p className="font-bold">Alchemy University</p>
        <p className="text-center">Ethereum Block Explorer - thecil</p>
        <div className="flex space-x-1">
          <Link href="https://github.com/thecil" target="_blank">
            <Github />
          </Link>
          <Link href="https://www.linkedin.com/in/carlos-zambrano-thecil/" target="_blank">
            <Linkedin />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
