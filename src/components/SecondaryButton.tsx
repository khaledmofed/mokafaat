import { PrimaryGradientButtonProps } from "@interfaces";
import React from "react";
import { Link } from "react-router-dom";

const SecondaryButton: React.FC<PrimaryGradientButtonProps> = ({
  to,
  className = "",
  children,
  textTransform = "capitalize",
  visibility = "flex",
}) => {
  return (
    <Link
      to={to || ""}
      className={`${visibility} lg:inline-block text-white bg-secondary rounded-full text-md px-6 py-3 text-center ${textTransform} ${className} wow fadeInUp`}
      data-wow-delay="0.2s"
    >
      {children}
    </Link>
  );
};

export default SecondaryButton;
