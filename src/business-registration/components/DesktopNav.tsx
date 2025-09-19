import { businessRegistrationNavItems, languages } from "@business-registration/constants";
import { TFunction } from "i18next";

export const BusinessDesktopNav = ({
  t,
  language,
  handleLanguageChange,
}: {
  t: TFunction;
  language: string;
  handleLanguageChange: (lang: string) => void;
}) => (
  <div className="hidden md:flex items-center justify-between flex-1">
    <div className="flex justify-center flex-1">
      <div className="flex gap-8 text-sm">
        {businessRegistrationNavItems(t).map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-400 transition-colors duration-300 relative group"
            aria-label={item.label}
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </div>
    <select
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="bg-white/10 text-white rounded-lg px-3 py-1.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
      aria-label="Select Language"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang} className="bg-black text-white">
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  </div>
);
