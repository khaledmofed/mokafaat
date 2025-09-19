import { PrimaryGradientButtonProps } from "@interfaces";
import React from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";

const PrimaryGradientButton: React.FC<PrimaryGradientButtonProps> = ({
  to,
  type = "submit",
  className = "",
  children,
  textTransform = "capitalize",
  visibility = "hidden",
  onClick,
  isLoading,
}) => {
  const content = to ? (
    <Link to={to}>
      <button
        type={type}
        className={`${visibility} lg:inline-block text-white bg-[#fd671a] shadow-lg rounded-lg text-sm px-6 py-3 text-center ${textTransform} ${className} wow fadeInUp justify-center`}
        data-wow-delay="0.2s"
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={`lg:inline-block text-white bg-[#fd671a] shadow-lg rounded-md text-sm px-6 py-4 text-center ${textTransform} ${className} wow fadeInUp justify-center`}
      data-wow-delay="0.2s"
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );

  return content;
};

export default PrimaryGradientButton;
