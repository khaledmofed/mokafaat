import { useTranslation } from "react-i18next";

const useIsRTL = (): boolean => {
  const { i18n } = useTranslation();
  const base = i18n.language?.split("-")[0] || "ar";
  return base === "ar" || base === "ur";
};

export default useIsRTL;
