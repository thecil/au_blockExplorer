import React from "react";
import { IconContext } from "react-icons";
import { IoTimeOutline } from "react-icons/io5";
interface IconProps {
  size?: string;
}
const TimeIcon: React.FC<IconProps> = ({ size }) => {
  return (
    <IconContext.Provider value={{ size: size ? size : "1.3em" }}>
      <div>
        <IoTimeOutline />
      </div>
    </IconContext.Provider>
  );
};

export default TimeIcon;
