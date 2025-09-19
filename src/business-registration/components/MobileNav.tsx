import { businessRegistrationNavItems, languages } from "@business-registration/constants";
import { TFunction } from "i18next";

export const BusinessMobileNav = ({
  t,
  isMenuOpen,
  setIsMenuOpen,
  language,
  handleLanguageChange,
}: {
  t: TFunction;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  language: string;
  handleLanguageChange: (lang: string) => void;
}) => (
  <div
    className={`md:hidden mt-4 transition-all duration-300 ease-in-out ${
      isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
    }`}
  >
    <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 space-y-4 text-sm">
      {businessRegistrationNavItems(t).map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-white hover:text-pink-400 transition-colors duration-300 py-2"
          onClick={() => setIsMenuOpen(false)}
          aria-label={item.label}
        >
          {item.label}
        </a>
      ))}
      <div className="pt-4 border-t border-white/10">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-white/10 text-white rounded-lg px-3 py-1.5 text-sm border border-white/20 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          aria-label="Select Language"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} className="bg-black text-white">
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);
