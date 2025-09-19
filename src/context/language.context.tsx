import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lng: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  // Try to get the saved language from localStorage or fallback to 'ar' (Arabic is now default)
  const savedLanguage = localStorage.getItem("language") || "ar";

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    savedLanguage === "ar" ? "ar" : "en"
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

    // Set document attributes on mount
    if (savedLanguage === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    }
  }, []); // Only run once on mount

  // Handle language changes
  useEffect(() => {
    // Skip if this is the initial render or if language hasn't changed
    if (i18n.language === currentLanguage) return;

    console.log("LanguageProvider: Language changed to:", currentLanguage);

    // Set the language in i18next and save it to localStorage
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);

    // Change the document direction based on the language
    if (currentLanguage === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", currentLanguage);
    }
  }, [currentLanguage, i18n]);

  const setLanguage = (lng: string) => {
    console.log("LanguageProvider: Setting language to:", lng);
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
