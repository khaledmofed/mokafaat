import { SelectDropdownProps } from "@interfaces";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import ErrorMessage from "./ErrorMessage";

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  id,
  placeholder,
  optionLabel,
  items,
  selectedItem,
  onSelectItemChange,
  error,
}) => {
  return (
    <div
      className="input-group flex flex-col wow fadeInUp"
      data-wow-delay="0.2s"
    >
      <label htmlFor={id} className="text-sm text-title font-bold capitalize">
        {placeholder}
      </label>
      <Dropdown
        value={selectedItem}
        onChange={(e) => onSelectItemChange(e.value)}
        options={items}
        optionLabel={optionLabel}
        placeholder={placeholder}
        className="border border-gray-200 bg-gray-50 rounded-md h-12 px-2 capitalize text-sm mt-2"
      />
      <ErrorMessage message={error || ""} />
    </div>
  );
};

export default SelectDropdown;
