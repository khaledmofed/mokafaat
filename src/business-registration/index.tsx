import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BusinessRegistrationStepper from "./components/Stepper";
import StepperNavigation from "./components/StepperNavigation";
// import BusinessRegistrationNavbar from "./components/Navbar";
import { StepsViews } from "./steps/StepsViews";
import { validateStep } from "./validation/businessRegistrationValidation";
import { ChangePageTitle } from "@components";
import BusinessRegistrationCustomMessage from "./components/CustomMessage";
import useRegisterClient from "./hooks/useRegisterClient";
import { useBusinessRegistration } from "./hooks/useBusinessRegistration";

const BusinessRegistrationPage = () => {
  const { t } = useTranslation();

  ChangePageTitle({
    pageTitle: t("businessRegistration.title"),
    description: t("businessRegistration.description"),
  });

  const {
    currentStep,
    stepsData,
    activeStep,
    formData,
    validationErrors,
    handlePrevious,
    handleNext,
    handleFormChange,
    resetForm,
  } = useBusinessRegistration();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    isPending,
    success: registrationSuccess,
    error: registrationError,
    setError: setRegistrationError,
    setSuccess: setRegistrationSuccess,
  } = useRegisterClient();

  const StepComponent = StepsViews[activeStep];

  const handleSubmit = useCallback(() => {
    const allStepsValid = stepsData.every(
      (step) => validateStep(t, step.key, formData).isValid
    );

    if (!allStepsValid) {
      setError(t("businessRegistration.validationError"));
      return;
    }

    register({ ...formData });
  }, [t, formData, stepsData]);

  useEffect(() => {
    if (registrationSuccess && !registrationError) {
      setSuccess(t("businessRegistration.successMessage"));
      setError(null);
      setRegistrationSuccess(false);
      resetForm();
    }

    if (!success && registrationError) {
      setError(registrationError);
      setRegistrationError(null);
    }
  }, [registrationSuccess, registrationError]);

  return (
    <section className="container mx-auto px-4 md:px-4 min-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10">
        <BusinessRegistrationStepper
          steps={stepsData}
          currentStep={currentStep}
        />
        <div className="md:border-s md:ps-24 py-20 min-h-[70vh]">
          <StepComponent
            t={t}
            formData={formData}
            validationErrors={validationErrors}
            onFormChange={handleFormChange}
          />

          <StepperNavigation
            t={t}
            currentStep={currentStep}
            totalSteps={stepsData.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isLoading={isPending}
            canProceed={true}
          />

          {error && (
            <BusinessRegistrationCustomMessage
              message={error}
              type="danger"
              onClose={() => setError(null)}
            />
          )}

          {success && (
            <BusinessRegistrationCustomMessage
              message={success}
              type="success"
              onClose={() => setSuccess(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessRegistrationPage;
