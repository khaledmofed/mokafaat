import { TFunction } from "i18next";

export interface BusinessRegistrationStepperProps {
  t: TFunction;
  steps: any[];
  currentStep: number;
}
