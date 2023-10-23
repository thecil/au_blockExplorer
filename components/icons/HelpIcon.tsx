import React from "react";
import { IconContext } from "react-icons";
import { IoHelpCircleOutline } from "react-icons/io5";
interface IconProps {
  size?: string;
}
const HelpIcon: React.FC<IconProps> = ({ size }) => {
  return (
    <IconContext.Provider value={{ size: size ? size : "1.3em" }}>
      <div>
        <IoHelpCircleOutline />
      </div>
    </IconContext.Provider>
  );
};

export default HelpIcon;
