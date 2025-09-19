import * as yup from "yup";

export const contactFormSchema = (
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
    companyName: yup.string().nullable(),
    message: yup
      .string()
      .required(translateValidationMessage("messageRequired")),
  });
