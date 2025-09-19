import { DepartmentModel, DropdownModel } from "@entities";
import { FieldErrors } from "react-hook-form";
import { IDType } from "./IDType";

export interface WorkAndCoverLetterProps {
  workType: DropdownModel | null;
  workTypeError: string | null;
  department: DepartmentModel | null;
  departmentError: string | null;
  city: DropdownModel | null;
  cityError: string | null;
  cvError: string | null;
  idType: IDType | null;
  idTypeError: string | null;
  idTypes: IDType[];
  idPictureError: string | null;
  idExpirationDateError: string | null;
  onCityChange: (workType: DropdownModel | null) => void;
  onWorkTypeChange: (workType: DropdownModel | null) => void;
  onDepartmentChange: (workType: DepartmentModel | null) => void;
  onCvChange: (image: File | null) => void;
  onIdTypeChange: (value: IDType) => void;
  onIdPictureChange: (image: File | null) => void;
  onIdExpirationDateChange: (image: File | null) => void;
  register: any;
  errors: FieldErrors<{
    idNumber: string;
    bio: string;
    education: string;
  }>;
}
