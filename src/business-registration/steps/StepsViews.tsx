import { BusinessRegistrationSteps } from "@business-registration/constants";
import BusinessRegistrationAboutYou from "./AboutYou";
import BusinessRegistrationCompanyDetails from "./CompanyDetails";
import BusinessRegistrationServices from "./Services";
import BusinessRegistrationOperationalRegions from "./OperationalRegions";
import BusinessRegistrationReview from "./Review";
import { StepsViewsProps } from "@business-registration/interfaces/steps-views.props";

export const StepsViews: Record<
  BusinessRegistrationSteps,
  (props: StepsViewsProps) => JSX.Element
> = {
  [BusinessRegistrationSteps.ABOUT_YOU]: BusinessRegistrationAboutYou,
  [BusinessRegistrationSteps.COMPANY_DETAILS]:
    BusinessRegistrationCompanyDetails,
  [BusinessRegistrationSteps.SERVICES]: BusinessRegistrationServices,
  [BusinessRegistrationSteps.OPERATIONAL_REGIONS]:
    BusinessRegistrationOperationalRegions,
  [BusinessRegistrationSteps.REVIEW_SUBMIT]: BusinessRegistrationReview,
};
