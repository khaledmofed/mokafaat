import { DepartmentModel } from "@entities";
import useGetQuery from "@hooks/api/useGetQuery";
import { DropdownProps } from "@interfaces";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const DepartmentDropdown: React.FC<DropdownProps> = ({
  isRTL,
  isDeparment,
  label,
  selectedDepartment,
  onSelectDepartment = () => {},
  error,
  hasDefaultOption = false,
}) => {
  const handleChange = (e: DropdownChangeEvent) => onSelectDepartment(e.value);
  const [departments, setDepartments] = useState<DepartmentModel[]>([]);

  const { data, isSuccess } = useGetQuery({
    endpoint: API_ENDPOINTS.getDepartments,
  });

  useEffect(() => {
    const departmentsData = data?.data?.departments;
    if (isSuccess && data?.status && departmentsData) {
      if (hasDefaultOption) {
        const allDepartmentsOption: DepartmentModel = {
          id: "",
          enTitle: "All Departments",
          arTitle: "جميع الأقسام",
          details: "",
          status: true,
          createdAt: "",
          updatedAt: "",
        };
        setDepartments([allDepartmentsOption, ...departmentsData]);
      } else {
        setDepartments(departmentsData);
      }
    }
  }, [isSuccess, data, hasDefaultOption]);

  let optionLabel;
  if (isRTL) {
    optionLabel = isDeparment ? "arTitle" : "arName";
  } else {
    optionLabel = isDeparment ? "enTitle" : "enName";
  }

  return (
    <>
      <Dropdown
        value={selectedDepartment}
        onChange={handleChange}
        options={departments}
        optionLabel={optionLabel}
        placeholder={label}
        className="border p-1 rounded-lg capitalize text-sm"
      />
      <ErrorMessage message={error || ""} />
    </>
  );
};

export default DepartmentDropdown;
