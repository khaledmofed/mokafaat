import BusinessRegistrationCustomInput from "@business-registration/components/CustomInput";
import { StepsViewsProps } from "@business-registration/interfaces/steps-views.props";

const BusinessRegistrationAboutYou = ({
  t,
  formData,
  validationErrors: errors,
  onFormChange,
}: StepsViewsProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t("businessRegistration.aboutYou.title", {
            defaultValue: "Complete Your Personal Information",
          })}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {t("businessRegistration.required-note", {
            defaultValue: "It means that the fields are required.",
          })}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.aboutYou.firstName")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.firstName}
            error={errors.firstName}
            placeholder={t("businessRegistration.aboutYou.firstName")}
            onValueChange={(value) => onFormChange("firstName", value)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.aboutYou.lastName")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.lastName}
            error={errors.lastName}
            placeholder={t("businessRegistration.aboutYou.lastName")}
            onValueChange={(value) => onFormChange("lastName", value)}
            className="mt-2"
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.aboutYou.email")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.email}
            error={errors.email}
            placeholder={t("businessRegistration.aboutYou.email")}
            type="email"
            onValueChange={(value) =>
              onFormChange("email", value.toLocaleLowerCase())
            }
            className="mt-2"
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.aboutYou.mobileNumber")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.mobile}
            error={errors.mobile}
            placeholder={t("businessRegistration.aboutYou.mobileNumber")}
            onValueChange={(value) => onFormChange("mobile", value)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationAboutYou;
