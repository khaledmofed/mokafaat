import BusinessRegistrationCustomInput from "@business-registration/components/CustomInput";
import { StepsViewsProps } from "@business-registration/interfaces/steps-views.props";

const BusinessRegistrationCompanyDetails = ({
  t,
  formData,
  validationErrors: errors,
  onFormChange,
}: StepsViewsProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t("businessRegistration.companyDetails.title", {
            defaultValue: "Company Details",
          })}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {t("businessRegistration.required-note", {
            defaultValue: "It means that the fields are required.",
          })}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.companyDetails.companyName")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.companyName}
            error={errors.companyName}
            placeholder={t("businessRegistration.companyDetails.companyName")}
            onValueChange={(value) => onFormChange("companyName", value)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.companyDetails.crNumber")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.crNumber}
            error={errors.crNumber}
            placeholder={t("businessRegistration.companyDetails.crNumber")}
            onValueChange={(value) => onFormChange("crNumber", value)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.companyDetails.vatRegistrationNumber")}
            <span className="text-[#C13899]">*</span>
          </label>
          <BusinessRegistrationCustomInput
            value={formData.vatRegistrationNumber}
            error={errors.vatRegistrationNumber}
            placeholder={t(
              "businessRegistration.companyDetails.vatRegistrationNumber"
            )}
            onValueChange={(value) =>
              onFormChange("vatRegistrationNumber", value)
            }
            className="mt-2"
          />
        </div>
        <div className="col-span-full">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            {t("businessRegistration.companyDetails.website")}
          </label>
          <BusinessRegistrationCustomInput
            value={formData.website || ""}
            error={errors.companyWebsite}
            placeholder={t("businessRegistration.companyDetails.website")}
            onValueChange={(value) => onFormChange("website", value)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationCompanyDetails;
