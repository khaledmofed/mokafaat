import { BusinessOption } from "@business-registration/interfaces/business-custom-checkbox.props";
import { StepsViewsProps } from "@business-registration/interfaces/steps-views.props";
import { SaudiRoundFlag, MoroccoFlag, BahrainFlag } from "@assets";

const BusinessRegistrationOperationalRegions = ({
  t,
  formData,
  validationErrors: errors,
  onFormChange,
}: StepsViewsProps) => {
  const countriesOptions: BusinessOption[] = [
    {
      id: 1,
      label: t("businessRegistration.countries.SAUDI_ARABIA"),
      value: "SAUDI_ARABIA",
      icon: SaudiRoundFlag,
    },
    {
      id: 2,
      label: t("businessRegistration.countries.BAHRAIN"),
      value: "BAHRAIN",
      icon: BahrainFlag,
    },
    {
      id: 3,
      label: t("businessRegistration.countries.MOROCCO"),
      value: "MOROCCO",
      icon: MoroccoFlag,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t("businessRegistration.countries.title", {
            defaultValue: "Select Operational Regions",
          })}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {t("businessRegistration.multi", {
            defaultValue: "You can choose multi select option",
          })}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-7">
        {countriesOptions.map((country) => {
          const isActive = formData.selectedCountries?.includes(country.value);
          return (
            <button
              key={country.id}
              type="button"
              onClick={() => {
                const currentCountries = formData.selectedCountries || [];
                let newCountries;
                if (isActive) {
                  newCountries = currentCountries.filter(
                    (c) => c !== country.value
                  );
                } else {
                  newCountries = [...currentCountries, country.value];
                }
                onFormChange("selectedCountries", newCountries);
              }}
              className={`group rounded-lg relative p-10 text-left bg-[#F7F8FB] border transition-all ${
                isActive
                  ? "border-purple-600 shadow-md"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between mb-16">
                <img
                  src={country.icon}
                  alt={country.label}
                  className="w-16 h-16 rounded-full"
                />
                <span
                  className={`w-5 h-5 rounded-full icon-check ${
                    isActive ? "bg-[#5AB307]" : "bg-gray-200"
                  }`}
                />
              </div>
              <div className="mt-6 text-gray-900 font-semibold text-lg leading-snug">
                {country.label}
              </div>
            </button>
          );
        })}
      </div>
      {errors.countries && (
        <div className="text-red-500 text-sm mt-2">{errors.countries}</div>
      )}
    </div>
  );
};

export default BusinessRegistrationOperationalRegions;
