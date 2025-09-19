import { TFunction } from "i18next";
import { BusinessRegistrationForm } from "./business-registration-form.interface";

export interface StepsViewsProps {
  t: TFunction;
  formData: BusinessRegistrationForm;
  validationErrors: Record<string, string>;
  onFormChange: (field: string, value: any) => void;
}
