import { FormDatePickerProps } from "@interfaces";
import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import ErrorMessage from "./ErrorMessage";

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  id,
  handleChangeDate,
  error,
}) => {
  const [date, setDate] = useState<Nullable<Date>>(new Date());

  const handleChange = (date: Nullable<Date>) => {
    setDate(date);
    handleChangeDate(date);
  };

  return (
    <>
      <div
        className="input-group flex flex-col wow fadeInUp"
        data-wow-delay="0.2s"
      >
        <label htmlFor={id} className="text-sm text-title font-bold capitalize">
          {label}
        </label>
        <Calendar
          value={date}
          onChange={(e) => handleChange(e.value)}
          showIcon
          className="p-2 h-12 rounded-md w-full text-sm border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 mt-2"
        />
        <ErrorMessage message={error || ""} />
      </div>
    </>
  );
};

export default FormDatePicker;
