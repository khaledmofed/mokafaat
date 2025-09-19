import React, { useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { DropdownProps } from "@interfaces";
import { DropdownModel } from "@entities";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";

const CityDropdown: React.FC<DropdownProps> = ({
  isRTL,
  label,
  selected,
  onSelect = () => {},
  hasDefaultOption = false,
}) => {
  const handleChange = (e: DropdownChangeEvent) => onSelect(e.value);
  const [cities, setCities] = useState<DropdownModel[]>([]);

  const { data, isSuccess } = useGetQuery({
    endpoint: API_ENDPOINTS.getCities,
  });

  useEffect(() => {
    const citiesData = data?.data?.cities;
    if (isSuccess && data?.status && citiesData) {
      if (hasDefaultOption) {
        const allCitiesOption: DropdownModel = {
          id: "",
          enName: "All Cities",
          arName: "جميع المدن",
          createdAt: "",
          updatedAt: "",
        };
        setCities([allCitiesOption, ...citiesData]);
      } else {
        setCities(citiesData);
      }
    }
  }, [isSuccess, data, hasDefaultOption]);

  return (
    <Dropdown
      value={selected}
      onChange={handleChange}
      options={cities}
      optionLabel={`${isRTL ? "arName" : "enName"}`}
      placeholder={label}
      className="border p-1 rounded-md capitalize text-sm"
    />
  );
};

export default CityDropdown;
