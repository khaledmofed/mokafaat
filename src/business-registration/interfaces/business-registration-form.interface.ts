export interface BusinessRegistrationForm {
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  // Company details
  companyName: string;
  website?: string;
  crNumber: string;
  vatRegistrationNumber: string;

  // Services
  selectedServices: string[];

  // countries
  selectedCountries: string[];
}
