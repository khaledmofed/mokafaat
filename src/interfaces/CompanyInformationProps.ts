import { FieldErrors } from "react-hook-form";

export interface CompanyInformationProps {
  register?: any;
  control?: any;
  errors?: FieldErrors<{
    companyName: string;
    crNumber: string;
    vatNumber: string;
    contactName: string;
    contactEmail: string;
    contactMobile: string;
  }>;
}
