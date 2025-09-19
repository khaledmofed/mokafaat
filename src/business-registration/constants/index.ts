import { BusinessRegistrationForm } from "@business-registration/interfaces/business-registration-form.interface";
import { TFunction } from "i18next";

export enum BusinessRegistrationSteps {
  ABOUT_YOU = "ABOUT_YOU",
  COMPANY_DETAILS = "COMPANY_DETAILS",
  SERVICES = "SERVICES",
  OPERATIONAL_REGIONS = "OPERATIONAL_REGIONS",
  REVIEW_SUBMIT = "REVIEW_SUBMIT",
}

export const steps = (
  t: TFunction
): { id: number; key: BusinessRegistrationSteps; title: string }[] => [
  {
    id: 1,
    key: BusinessRegistrationSteps.ABOUT_YOU,
    title: t("businessRegistration.step1"),
  },
  {
    id: 2,
    key: BusinessRegistrationSteps.COMPANY_DETAILS,
    title: t("businessRegistration.step2"),
  },
  {
    id: 3,
    key: BusinessRegistrationSteps.SERVICES,
    title: t("businessRegistration.step3"),
  },
  {
    id: 4,
    key: BusinessRegistrationSteps.OPERATIONAL_REGIONS,
    title: t("businessRegistration.step4"),
  },
  {
    id: 5,
    key: BusinessRegistrationSteps.REVIEW_SUBMIT,
    title: t("businessRegistration.step5"),
  },
];

export const businessRegistrationNavItems = (t: TFunction) => [
  { label: t("home.navbar.home"), href: "https://www.mukafaat.com" },
  {
    label: t("home.navbar.about"),
    href: "https://www.mukafaat.com/about",
  },
  { label: t("home.navbar.services"), href: "https://www.mukafaat.com" },
  { label: t("home.navbar.portfolio"), href: "https://www.mukafaat.com" },
  {
    label: t("home.navbar.upcoming_projects"),
    href: "https://www.mukafaat.com/projects",
  },
];

export const languages = ["en", "ar", "fr"];

// Initial form data with TypeScript type
export const initialFormData: BusinessRegistrationForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  companyName: "",
  crNumber: "",
  vatRegistrationNumber: "",
  selectedServices: [],
  selectedCountries: [],
};
