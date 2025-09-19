import { useTranslation } from "react-i18next";

const useIsRTL = (): boolean => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar";

  return isRTL;
};

export default useIsRTL;
