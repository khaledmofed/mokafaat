import { SuccessDangerToastProps } from "@interfaces";
import React from "react";

const SuccessDangerToast: React.FC<SuccessDangerToastProps> = ({
  Icon,
  text,
  color,
}) => {
  return (
    <div
      className={`p-4 flex gap-4 justify-start items-center bg-${color} bg-opacity-10
      border border-${color} rounded-lg wow fadeInUp w-full`}
      data-wow-delay="0.2s"
    >
      <Icon className={`text-${color} text-xl`} />
      <h1 className={`capitalize font-bold text-${color} text-sm`}>{text}</h1>
    </div>
  );
};

export default SuccessDangerToast;
