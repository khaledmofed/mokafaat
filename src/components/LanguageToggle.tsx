import { useLanguage } from "@context/language.context";
import { useIsRTL } from "@hooks";
import { useState, useRef, useEffect } from "react";
import { EnglishUS, SaudiRoundFlag } from "@assets";
import { IoGlobeOutline } from "react-icons/io5";
import { useAppConfig } from "@hooks/api/useMokafaatQueries";
import { API_BASE_URL } from "@config/api";

interface LanguageToggleProps {
  handleCloseNavigation: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  handleCloseNavigation,
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const isRTL = useIsRTL();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"languages" | "countries">(
    "languages"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      country: "United States",
      countryCode: "us",
      image: EnglishUS,
    },
    {
      code: "ar",
      name: "العربية",
      flag: "🇸🇦",
      country: "المملكة العربية السعودية",
      countryCode: "sa",
      image: SaudiRoundFlag,
    },
  ];

  const { data: appConfig } = useAppConfig() as {
    data?: { data?: { config?: { countries?: Array<{ id: number; name: string; code: string; flag?: string }> } } };
  };
  const apiCountries = appConfig?.data?.config?.countries ?? [];
  const countries = apiCountries.map((c) => ({
    code: c.code,
    name: c.name,
    image: c.flag
      ? (c.flag.startsWith("http") ? c.flag : `${API_BASE_URL}/storage/${c.flag}`)
      : undefined,
  }));

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
    handleCloseNavigation();
  };

  const handleCountryChange = (countryCode: string) => {
    // Handle country change logic here
    console.log("Country changed to:", countryCode);
    setIsOpen(false);
    handleCloseNavigation();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tab: "languages" | "countries") => {
    setActiveTab(tab);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 h-9 bg-gray-100 border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-200"
      >
        {/* Flag */}
        <div className="text-sm">
          <IoGlobeOutline className="text-gray-700 text-xl" />
        </div>

        {/* Separator Line */}
        <div className="w-px h-6 bg-gray-400"></div>

        {/* Language Text */}
        <div className="w-6 h-6 rounded-full overflow-hidden border-none border-gray-200 flex items-center justify-center">
          <img
            src={currentLang.image}
            alt={currentLang.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dropdown Arrows */}
        {/* <div className="flex flex-col gap-0">
        <FaChevronUp
          className="text-gray-500 text-xs"
            style={{ fontSize: "8px" }}
        />
        <FaChevronDown
          className="text-gray-500 text-xs"
            style={{ fontSize: "8px" }}
          />
        </div> */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden p-6 ${
            isRTL ? "left-0" : "right-0"
          }`}
        >
          {/* Header Tabs */}
          <div className="flex border-b border-gray-100 bg-[#F3F4F6] p-2 rounded-full mb-2">
            <button
              onClick={() => handleTabChange("languages")}
              className={`flex-1 px-4 py-2 text-center transition-colors rounded-full ${
                activeTab === "languages"
                  ? "bg-white text-gray-800"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium text-sm">
                {isRTL ? "اللغات" : "Languages"}
              </span>
            </button>
            <button
              onClick={() => handleTabChange("countries")}
              className={`flex-1 px-4 py-2 text-center transition-colors rounded-full ${
                activeTab === "countries"
                  ? "bg-white text-gray-800"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium text-sm">
                {isRTL ? "البلد" : "Country"}
              </span>
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="max-h-80 overflow-y-auto">
            {activeTab === "languages" ? (
              // Languages List
              languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } hover:bg-gray-50 transition-colors ${
                    currentLanguage === language.code ? "bg-gray-100" : ""
                  }`}
                >
                  {/* Flag Image */}
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center">
                    <img
                      src={language.image}
                      alt={language.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Language Name */}
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium text-sm">
                      {language.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {language.country}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              // Countries List من /api/app-config (config.countries)
              <div className="grid grid-cols-2 gap-0">
                {countries.length === 0 ? (
                  <div className="col-span-2 px-4 py-6 text-gray-500 text-sm text-center">
                    {isRTL ? "لا توجد دول متاحة" : "No countries available"}
                  </div>
                ) : (
                  countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountryChange(country.code)}
                      className={`w-full flex items-center gap-2 px-3 py-3 ${
                        isRTL ? "text-right" : "text-left"
                      } hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center flex-shrink-0 bg-gray-100">
                        {country.image ? (
                          <img
                            src={country.image}
                            alt={country.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs font-medium">
                            {country.code}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 font-medium text-xs truncate">
                          {country.name}
                        </div>
                        <div className="text-gray-500 text-xs truncate">
                          {country.code}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
