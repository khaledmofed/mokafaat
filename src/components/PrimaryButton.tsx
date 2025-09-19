import { PrimaryButtonProps } from "@interfaces";
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  type = "button",
  children,
  visibility = "block",
  isLoading,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${visibility} lg:inline-block text-white bg-gradient-to-l from-primary to-secondary shadow-lg rounded-md 
      text-sm p-4 text-center capitalize wow fadeInUp`}
      data-wow-delay="0.2s"
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default PrimaryButton;
