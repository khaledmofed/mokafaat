import {
  PrimaryButton,
  DepartmentDropdown,
  WorkTypeDropdown,
  CityDropdown,
} from "@components";
import { t } from "i18next";
import { DepartmentModel, DropdownModel } from "@entities";

const Filter = (props: {
  isRTL: boolean;
  city: DropdownModel | null;
  department: DepartmentModel | null;
  workType: DropdownModel | null;
  isLoading: boolean;
  onCityChange: (city: DropdownModel | null) => void;
  onDepartmentChange: (department: DepartmentModel | null) => void;
  onWorkTypeChange: (workType: DropdownModel | null) => void;
  onSearchSubmit: () => void;
}) => {
  const {
    isRTL,
    city,
    department,
    workType,
    isLoading,
    onCityChange,
    onDepartmentChange,
    onWorkTypeChange,
    onSearchSubmit,
  } = props;

  return (
    <section
      className="jobs-filter w-full grid lg:grid-cols-4 md:grid-cols-2
    py-8 mb-6 rounded-xl gap-3 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <CityDropdown
        isRTL={isRTL}
        label={t("careers.city")}
        selected={city}
        onSelect={(value) => onCityChange(value)}
        hasDefaultOption={true}
      />

      <DepartmentDropdown
        isRTL={isRTL}
        isDeparment={true}
        label={t("careers.department")}
        selectedDepartment={department}
        onSelectDepartment={(value) => onDepartmentChange(value)}
        hasDefaultOption={true}
      />

      <WorkTypeDropdown
        isRTL={isRTL}
        label={t("careers.workType")}
        selected={workType}
        onSelect={(value) => onWorkTypeChange(value)}
        hasDefaultOption={true}
      />

      <PrimaryButton onClick={onSearchSubmit} isLoading={isLoading}>
        {t("careers.search")}
      </PrimaryButton>
    </section>
  );
};

export default Filter;
