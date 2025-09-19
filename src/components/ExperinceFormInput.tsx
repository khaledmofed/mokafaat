import { ExperinceFormInputProps } from "@interfaces";
import React from "react";
import ErrorMessage from "./ErrorMessage";

const ExperinceFormInput: React.FC<ExperinceFormInputProps> = ({
  label,
  type,
  id,
  value,
  className,
  placeholder,
  handleOnChange,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (handleOnChange) {
      handleOnChange(newValue);
    }
  };

  return (
    <div className="input-group wow fadeInUp" data-wow-delay="0.2s">
      <label htmlFor={id} className="text-sm text-title font-bold capitalize">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`p-4 rounded-md h-12 w-full text-sm border bg-[#f9fafb] mt-2 ${className}`}
      />
      <ErrorMessage message={error || ""} />
    </div>
  );
};
export default ExperinceFormInput;
