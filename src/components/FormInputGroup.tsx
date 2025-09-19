import { FormInputGroupProps } from "@interfaces";
import React from "react";
import ErrorMessage from "./ErrorMessage";

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  label,
  type,
  id,
  className,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="input-group wow fadeInUp" data-wow-delay="0.2s">
      <label htmlFor={id} className="text-sm text-title font-bold capitalize">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        placeholder={placeholder}
        className={`p-4 h-12 rounded-md w-full text-sm border border-gray-200 bg-gray-50 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 mt-2 ${className}`}
      />
      <ErrorMessage message={error || ""} />
    </div>
  );
};

export default FormInputGroup;
