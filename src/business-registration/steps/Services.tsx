import { BusinessRegistrationServicesEnum } from "@business-registration/enums/business-registration-services.enum";
import { BusinessOption } from "@business-registration/interfaces/business-custom-checkbox.props";
import { StepsViewsProps } from "@business-registration/interfaces/steps-views.props";
import { BriefcaseIcon, MouseSquareIcon, SliderIcon, CubeIcon } from "@assets";

const BusinessRegistrationServices = ({
  t,
  formData,
  validationErrors: errors,
  onFormChange,
}: StepsViewsProps) => {
  const serviceOptions: BusinessOption[] = [
    {
      id: 1,
      label: t("businessRegistration.services.EVENTS"),
      value: BusinessRegistrationServicesEnum.EVENTS,
      icon: BriefcaseIcon,
    },
    {
      id: 2,
      label: t("businessRegistration.services.PROMOTIONS"),
      value: BusinessRegistrationServicesEnum.PROMOTIONS,
      icon: MouseSquareIcon,
    },
    {
      id: 3,
      label: t("businessRegistration.services.LOGISTICS"),
      value: BusinessRegistrationServicesEnum.LOGISTICS,
      icon: SliderIcon,
    },
    {
      id: 4,
      label: t("businessRegistration.services.EQUIPMENT_RENTING"),
      value: BusinessRegistrationServicesEnum.EQUIPMENT_RENTING,
      icon: CubeIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t("businessRegistration.services.title", {
            defaultValue: "What services you are interested in?",
          })}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {t("businessRegistration.multi", {
            defaultValue: "You can choose multi select option",
          })}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-7">
        {serviceOptions.map((service) => {
          const isActive = formData.selectedServices?.includes(service.value);
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => {
                const currentServices = formData.selectedServices || [];
                let newServices;
                if (isActive) {
                  newServices = currentServices.filter(
                    (s) => s !== service.value
                  );
                } else {
                  newServices = [...currentServices, service.value];
                }
                onFormChange("selectedServices", newServices);
              }}
              className={`group rounded-lg relative p-10 text-left bg-[#F7F8FB] border transition-all ${
                isActive
                  ? "border-purple-600 shadow-md"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between mb-16">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.label}
                    className="w-10 h-10"
                  />
                </div>
                <span
                  className={`w-5 h-5 rounded-full icon-check ${
                    isActive ? "bg-[#5AB307]" : "bg-gray-200"
                  }`}
                />
              </div>
              <div className="mt-6 text-gray-900 font-semibold text-lg leading-snug">
                {service.label}
              </div>
            </button>
          );
        })}
      </div>
      {errors.services && (
        <div className="text-red-500 text-sm mt-2">{errors.services}</div>
      )}
    </div>
  );
};

export default BusinessRegistrationServices;
