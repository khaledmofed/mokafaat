import React from "react";
import { ReactSVG } from "react-svg";

interface DetailsGroupProps {
  icon: string;
  text: string;
}

const DetailsGroup: React.FC<DetailsGroupProps> = ({ icon, text }) => {
  return (
    <div className="details-group flex gap-2 items-center justify-start">
      <ReactSVG src={icon} color="text-sub-title" />
      <span className="text-sub-title text-sm">{text}</span>
    </div>
  );
};

export default DetailsGroup;
