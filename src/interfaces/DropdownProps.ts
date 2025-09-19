import { DepartmentModel, DropdownModel } from "@entities";

export interface DropdownProps {
  isRTL: boolean;
  isDeparment?: boolean;
  label: string;
  selected?: DropdownModel | null;
  onSelect?: (selected: DropdownModel | null) => void;
  selectedDepartment?: DepartmentModel | null;
  onSelectDepartment?: (selectedDepartment: DepartmentModel | null) => void;
  error?: string | null;
  hasDefaultOption?:boolean
}
