import React from "react";
import { IconContext } from "react-icons";
import { IoCubeOutline } from "react-icons/io5";
interface IconProps {
  size?: string;
}
const BlockIcon: React.FC<IconProps> = ({ size }) => {
  return (
    <IconContext.Provider value={{ size: size ? size : "2em" }}>
      <div>
        <IoCubeOutline />
      </div>
    </IconContext.Provider>
  );
};

export default BlockIcon;
