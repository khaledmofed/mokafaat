import { BusinessRegistrationStepperProps } from "@business-registration/interfaces/business-registration-stepper.props";

const BusinessRegistrationStepper = ({
  steps,
  currentStep,
}: Omit<BusinessRegistrationStepperProps, "t">) => {
  return (
    <aside className="sticky top-24 self-start w-full max-w-[320px] py-20">
      <ul className="space-y-6">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;
          return (
            <li key={step.id} className="flex items-center gap-3">
              <span
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
                  isActive
                    ? "bg-[#fd671a] text-white"
                    : isDone
                    ? "bg-[#69aa3a] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {step.id}
              </span>
              <span
                className={`${
                  isActive ? "text-gray-900 font-semibold" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default BusinessRegistrationStepper;
