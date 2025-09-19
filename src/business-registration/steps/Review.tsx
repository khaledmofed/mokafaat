// import { BusinessRegistrationReviewItem } from "@business-registration/components/BusinessRegistrationReviewItem";
import { StepsViewsProps } from "@business-registration/interfaces/steps-views.props";

const BusinessRegistrationReview = ({ t, formData }: StepsViewsProps) => {
  const renderList = (
    items: string[],
    emptyMessage: string,
    isServices: boolean = false
  ) => {
    if (!items || items.length === 0) {
      return <p className="text-gray-400">{emptyMessage}</p>;
    }

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="font-semibold bg-[#F7F8FB] rounded-md px-3 py-2 text-sm"
          >
            {isServices
              ? t(`businessRegistration.services.${item}`)
              : t(`businessRegistration.countries.${item}`)}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t("businessRegistration.review.title", {
            defaultValue: "Review Your Information",
          })}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {t("businessRegistration.review.subtitle", {
            defaultValue: "Please review your information before submitting",
          })}
        </p>
      </div>

      <div className="rounded-md border border-gray-200 p-6 text-sm text-gray-800 space-y-4">
        {/* Personal Information */}
        <div>
          <div className="font-semibold text-gray-600 mb-4">
            {t("businessRegistration.review.personal", {
              defaultValue: "Personal Information",
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.aboutYou.fullName")}:
              </span>{" "}
              <span className="font-semibold">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.aboutYou.email")}:
              </span>{" "}
              <span className="font-semibold">{formData.email}</span>
            </div>
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.aboutYou.mobileNumber")}:
              </span>{" "}
              <span className="font-semibold">{formData.mobile}</span>
            </div>
          </div>
        </div>

        <hr />

        {/* Company Information */}
        <div>
          <div className="font-semibold text-gray-600 mb-4">
            {t("businessRegistration.review.company", {
              defaultValue: "Company Information",
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.companyDetails.companyName")}:
              </span>{" "}
              <span className="font-semibold">{formData.companyName}</span>
            </div>
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.companyDetails.crNumber")}:
              </span>{" "}
              <span className="font-semibold">{formData.crNumber}</span>
            </div>
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.companyDetails.vatRegistrationNumber")}
                :
              </span>{" "}
              <span className="font-semibold">
                {formData.vatRegistrationNumber}
              </span>
            </div>
            {formData.website && (
              <div>
                <span className="text-gray-500">
                  {t("businessRegistration.companyDetails.website")}:
                </span>{" "}
                <span className="font-semibold">{formData.website}</span>
              </div>
            )}
          </div>
        </div>

        <hr />

        {/* Selections */}
        <div>
          <div className="font-semibold text-gray-600 mb-4">
            {t("businessRegistration.review.selection", {
              defaultValue: "Selections",
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.selectedServices", {
                  defaultValue: "Selected Services",
                })}
                :
              </span>{" "}
              {renderList(
                formData.selectedServices || [],
                t("businessRegistration.noServicesSelected"),
                true
              )}
            </div>
            <div>
              <span className="text-gray-500">
                {t("businessRegistration.selectedCountries", {
                  defaultValue: "Selected Countries",
                })}
                :
              </span>{" "}
              {renderList(
                formData.selectedCountries || [],
                t("businessRegistration.noCountriesSelected"),
                false
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationReview;
