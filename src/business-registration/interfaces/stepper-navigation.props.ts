import { TFunction } from "i18next";

export interface StepperNavigationProps {
  t: TFunction;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  canProceed?: boolean;
}
