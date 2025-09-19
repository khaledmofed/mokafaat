import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { t } = useTranslation();

  return {
    translateValidationMessage: (key: string) => t(`validations.${key}`),
  };
};
