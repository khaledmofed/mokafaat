import { DropdownModel } from "@entities";
import useGetQuery from "@hooks/api/useGetQuery";
import { DropdownProps } from "@interfaces";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const WorkTypeDropdown: React.FC<DropdownProps> = ({
  isRTL,
  label,
  selected,
  onSelect = () => {},
  error,
  hasDefaultOption = false,
}) => {
  const handleChange = (e: DropdownChangeEvent) => onSelect(e.value);
  const [workTypes, setWorkTypes] = useState<DropdownModel[]>([]);

  const { data, isSuccess } = useGetQuery({
    endpoint: API_ENDPOINTS.getWorkTypes,
  });

  useEffect(() => {
    const workTypesData = data?.data?.workTypes;
    if (isSuccess && data?.status && workTypesData) {
      if (hasDefaultOption) {
        const allWorkTypesOption: DropdownModel = {
          id: "",
          enName: "All Work Types",
          arName: "جميع أنواع العمل",
          createdAt: "",
          updatedAt: "",
        };
        setWorkTypes([allWorkTypesOption, ...workTypesData]);
      } else {
        setWorkTypes(workTypesData);
      }
    }
  }, [isSuccess, data, hasDefaultOption]);

  return (
    <>
      <Dropdown
        value={selected}
        onChange={handleChange}
        options={workTypes}
        optionLabel={`${isRTL ? "arName" : "enName"}`}
        placeholder={label}
        className="border p-1 rounded-lg capitalize text-sm"
      />
      <ErrorMessage message={error || ""} />
    </>
  );
};
export default WorkTypeDropdown;
