import { GenderModel } from "@entities";
import { Nullable } from "primereact/ts-helpers";
import { FieldErrors } from "react-hook-form";

export interface JobSeekerBasicInformationProps {
  title: string;
  selectedGender: GenderModel | null;
  genderError: string | null;
  selectedNationality: string;
  photo: File | null;
  photoError: string | null;
  birthDateError: string | null;
  onSelectGenderChange: (selectedGender: GenderModel) => void;
  onSelectBirthDate: (date: Nullable<Date>) => void;
  onSelectNatiolaity: (nationality: string) => void;
  onPhotoChange: (image: File | null) => void;
  register?: any;
  errors?: FieldErrors<{
    fullName: string;
    email: string;
    mobileNumber: string;
  }>;
}
