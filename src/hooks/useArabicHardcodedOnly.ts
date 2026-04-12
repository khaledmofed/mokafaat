import { useTranslation } from "react-i18next";

/**
 * Use for legacy "Arabic vs English" string pairs. Urdu/Hindi (and others)
 * fall back to the English branch until those strings move into locale files.
 * Layout direction still uses useIsRTL() (Arabic + Urdu = RTL).
 */
export default function useArabicHardcodedOnly(): boolean {
  const { i18n } = useTranslation();
  return (i18n.language?.split("-")[0] || "ar") === "ar";
}
