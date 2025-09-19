import { DepartmentModel } from "./DepartmentModel";
import { DropdownModel } from "./DropdownModel";

export interface JobModel {
  id: number;
  title: string;
  departmentId: number;
  workTypeId: number;
  paymentAmount: string;
  cityId: number;
  description?: string;
  requirements?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  department: DepartmentModel;
  workType: DropdownModel;
  city: DropdownModel;
}
