import { BusinessRegistrationSteps } from "@business-registration/constants";
import { BusinessRegistrationForm } from "@business-registration/interfaces/business-registration-form.interface";
import { TFunction } from "i18next";

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateStep = (
  t: TFunction,
  step: BusinessRegistrationSteps,
  formData: BusinessRegistrationForm
): ValidationResult => {
  switch (step) {
    case BusinessRegistrationSteps.ABOUT_YOU:
      return validateAboutYou(t, formData);

    case BusinessRegistrationSteps.COMPANY_DETAILS:
      return validateCompanyDetails(t, formData);

    case BusinessRegistrationSteps.SERVICES:
      return validateServices(t, formData);

    case BusinessRegistrationSteps.OPERATIONAL_REGIONS:
      return validateCounties(t, formData);

    default:
      return { isValid: true, errors: {} };
  }
};

const validateAboutYou = (
  t: TFunction,
  formData: BusinessRegistrationForm
): ValidationResult => {
  const errors: Record<string, string> = {};

  const publicEmailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "live.com",
    "protonmail.com",
    "mail.com",
    "gmx.com",
    "example.com",
  ];

  if (!formData.firstName.trim()) {
    errors.firstName = t("businessRegistration.validation.firstNameRequired");
  }

  if (!formData.lastName.trim()) {
    errors.lastName = t("businessRegistration.validation.lastNameRequired");
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = t("businessRegistration.validation.emailRequired");
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = t("validation.emailInvalid");
  } else {
    const domain = formData.email.split("@")[1].toLowerCase();
    if (publicEmailDomains.includes(domain)) {
      errors.email = t("businessRegistration.validation.professionalEmailOnly");
    }
  }

  // Mobile validation
  if (!formData.mobile.trim()) {
    errors.mobile = t("businessRegistration.validation.mobileRequired");
  } else if (!/^\+\d{1,3}[\d\s\-()]{4,}$/.test(formData.mobile)) {
    errors.mobile = t("businessRegistration.validation.mobileFormat");
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateCompanyDetails = (
  t: TFunction,
  formData: BusinessRegistrationForm
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!formData.companyName.trim()) {
    errors.companyName = t(
      "businessRegistration.validation.companyNameRequired"
    );
  }

  if (!formData.crNumber.trim()) {
    errors.crNumber = t("businessRegistration.validation.crNumberRequired");
  }

  if (!formData.vatRegistrationNumber.trim()) {
    errors.vatRegistrationNumber = t(
      "businessRegistration.validation.vatRegistrationNumberRequired"
    );
  }

  // Optional: Validate website format if provided
  if (
    formData.website &&
    !/^https?:\/\/.+/.test(formData.website)
  ) {
    errors.companyWebsite = t("businessRegistration.validation.websiteInvalid");
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateServices = (
  t: TFunction,
  formData: BusinessRegistrationForm
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!formData.selectedServices || formData.selectedServices.length === 0) {
    errors.services = t("businessRegistration.validation.servicesRequired");
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateCounties = (
  t: TFunction,
  formData: BusinessRegistrationForm
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!formData.selectedCountries || formData.selectedCountries.length === 0) {
    errors.countries = t("businessRegistration.validation.countriesRequired");
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
