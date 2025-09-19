import { PrimaryButtonProps } from "@interfaces";
import { Button } from "primereact/button";
import React from "react";

const SignContractButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  type = "button",
  children,
  isLoading,
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      loading={isLoading}
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary text-white font-semibold text-sm p-4 rounded-lg capitalize 
  flex items-center justify-center gap-2  wow fadeInUp`}
      data-wow-delay="0.2s"
    >
      {children}
    </Button>
  );
};

export default SignContractButton;
