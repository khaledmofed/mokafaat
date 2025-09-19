import * as yup from "yup";

export const companyApplicationSchema = (
  translateValidationMessage: (key: string) => string
) =>
  yup.object().shape({
    companyName: yup
      .string()
      .required(translateValidationMessage("companyNameRequired")),
    crNumber: yup
      .string()
      .required(translateValidationMessage("crNumberRequired")),
    vatNumber: yup
      .string()
      .required(translateValidationMessage("vatNumberRequired")),
    contactName: yup
      .string()
      .required(translateValidationMessage("contactNameRequired")),
    contactEmail: yup
      .string()
      .email(translateValidationMessage("invalidEmail"))
      .required(translateValidationMessage("emailRequired")),
    contactMobile: yup
      .string()
      .required(translateValidationMessage("mobileNumberRequired")),
    eventName: yup
      .string()
      .required(translateValidationMessage("eventNameRequired")),
  });
