import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@stores/userStore";
import { settingsApi } from "@network/services/mokafaatService";

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lng: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const SUPPORTED_LANGUAGES = ["ar", "en", "ur", "hi"] as const;

function normalizeSavedLanguage(raw: string | null): string {
  if (!raw) return "ar";
  const base = raw.split("-")[0];
  return SUPPORTED_LANGUAGES.includes(base as (typeof SUPPORTED_LANGUAGES)[number])
    ? base
    : "ar";
}

function applyDocumentLanguage(lng: string) {
  const base = lng.split("-")[0];
  const rtl = base === "ar" || base === "ur";
  document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", base);
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const token = useUserStore((s) => s.token);

  const [currentLanguage, setCurrentLanguage] = useState<string>(() =>
    normalizeSavedLanguage(
      typeof window !== "undefined" ? localStorage.getItem("language") : null
    )
  );

  const savedLanguage = normalizeSavedLanguage(
    typeof window !== "undefined" ? localStorage.getItem("language") : null
  );

  // Initialize language on mount
  useEffect(() => {
    console.log(
      "LanguageProvider: Initializing with saved language:",
      savedLanguage
    );

    // Ensure i18next is initialized with the saved language
    if (i18n.language !== savedLanguage) {
      console.log(
        "LanguageProvider: Changing i18n language from",
        i18n.language,
        "to",
        savedLanguage
      );
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);
    }

    applyDocumentLanguage(savedLanguage);
  }, []); // Only run once on mount

  // Handle language changes
  useEffect(() => {
    // Skip if this is the initial render or if language hasn't changed
    if (i18n.language === currentLanguage) return;

    console.log("LanguageProvider: Language changed to:", currentLanguage);

    // Set the language in i18next and save it to localStorage
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);

    applyDocumentLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const setLanguage = (lng: string) => {
    console.log("LanguageProvider: Setting language to:", lng);
    if (!lng || lng === currentLanguage) return;

    // Persist immediately so reload boots in correct language.
    localStorage.setItem("language", lng);

    applyDocumentLanguage(lng);

    // Best-effort update backend preference (if logged in).
    if (token) settingsApi.updateLanguage(lng).catch(() => {});

    // Change i18n language then hard reload (to fully reset UI/layout state).
    void i18n.changeLanguage(lng).finally(() => {
      window.location.reload();
    });

    // Keep state consistent until reload happens.
    setCurrentLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
