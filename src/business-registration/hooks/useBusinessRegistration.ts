import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BusinessRegistrationForm } from "../interfaces/business-registration-form.interface";
import { validateStep } from "../validation/businessRegistrationValidation";
import {
  BusinessRegistrationSteps,
  initialFormData,
  steps,
} from "../constants";

export const useBusinessRegistration = () => {
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<BusinessRegistrationForm>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const stepsData = useMemo(() => steps(t), [t]);

  const activeStep =
    stepsData.find((step) => step.id === currentStep)?.key ||
    BusinessRegistrationSteps.ABOUT_YOU;

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setValidationErrors({});
  }, []);

  const handleNext = useCallback(() => {
    const validation = validateStep(t, activeStep, formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, stepsData.length));
  }, [t, activeStep, formData, stepsData.length]);

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setValidationErrors({});
  }, []);

  return {
    currentStep,
    setCurrentStep,
    stepsData,
    activeStep,
    formData,
    validationErrors,
    handlePrevious,
    handleNext,
    handleFormChange,
    setValidationErrors,
    resetForm
  };
};
