import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import global_en from "@locale/en.json";
import global_ar from "@locale/ar.json";
import global_fr from "@locale/fr.json";

const resources = {
  en: {
    translation: global_en,
  },
  ar: {
    translation: global_ar,
  },
  fr: {
    translation: global_fr,
  },
};

// Function to get saved language safely
const getSavedLanguage = (): string => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = localStorage.getItem("language");
      if (saved && ["en", "ar"].includes(saved)) {
        return saved;
      }
    }
  } catch (error) {
    console.warn("Could not access localStorage:", error);
  }
  return "ar"; // Changed from "en" to "ar" - Arabic is now default
};

// Initialize i18next
i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(), // Get language safely
    fallbackLng: "ar", // Changed from "en" to "ar" - Arabic is now fallback
    debug: false, // Set to true for debugging
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Important for SSR compatibility
    },
    // Ensure language is properly set
    initImmediate: false,
  });

export default i18next;
