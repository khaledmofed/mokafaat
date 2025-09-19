import { Nullable } from "primereact/ts-helpers";

export interface JobSeekerModel {
  photo: File | null;
  fullName: string;
  email: string;
  mobileNumber: string;
  idType?: string;
  idNumber: string;
  idPicture: File | null;
  idExpirationDate: File | null;
  nationality: string;
  gender?: number;
  birthDate: Nullable<Date>;
  education: string;
  cityId?: number;
  departmentId?: number;
  workTypeId?: number;
  cv: File | null;
  bio: string;
  experiences: string;
}
