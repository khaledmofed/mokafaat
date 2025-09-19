import { StepperNavigationProps } from "@business-registration/interfaces/stepper-navigation.props";

const StepperNavigation = ({
  t,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isLoading = false,
  canProceed = true,
}: StepperNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleNextClick = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex justify-between mt-8">
      {!isFirstStep && (
        <button
          onClick={onPrevious}
          disabled={isLoading}
          className={`px-8 h-12 rounded-md transition-colors ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {t("businessRegistration.actions.previous")}
        </button>
      )}
      <button
        onClick={handleNextClick}
        disabled={!canProceed || isLoading}
        className={`px-8 h-12 rounded-md text-white transition-colors ${
          !canProceed || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#fd671a] hover:bg-[#400198]"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">Loading...</span>
        ) : isLastStep ? (
          t("businessRegistration.actions.submit")
        ) : (
          t("businessRegistration.actions.next")
        )}
      </button>
    </div>
  );
};

export default StepperNavigation;
