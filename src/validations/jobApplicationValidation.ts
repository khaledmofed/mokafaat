import * as yup from "yup";

export const jobApplicationSchema = (
  translateValidationMessage: (key: string) => string
) =>
  yup.object().shape({
    fullName: yup
      .string()
      .required(translateValidationMessage("fullNameRequired")),
    email: yup
      .string()
      .email(translateValidationMessage("invalidEmail"))
      .required(translateValidationMessage("emailRequired")),
    mobileNumber: yup
      .string()
      .required(translateValidationMessage("mobileNumberRequired")),
    education: yup
      .string()
      .required(translateValidationMessage("educationRequired")),
    bio: yup
      .string()
      .required(translateValidationMessage("bioRequired")),
    idNumber: yup
      .string()
      .required(translateValidationMessage("idNumberRequired")),
  });
