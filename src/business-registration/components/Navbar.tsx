import { BusinessRegistrationLogo } from "@assets";
import { useLanguage } from "@context/language.context";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { BusinessDesktopNav } from "./DesktopNav";
import { useTranslation } from "react-i18next";
import { BusinessMobileNav } from "./MobileNav";

const BusinessRegistrationNavbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between bg-transparent">
        <a href="https://www.mukafaat.com" aria-label="Mukafaat Home">
          <img
            src={BusinessRegistrationLogo}
            alt="Mukafaat Logo"
            className="max-w-32"
          />
        </a>
        <BusinessDesktopNav
          t={t}
          language={currentLanguage}
          handleLanguageChange={handleLanguageChange}
        />
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 bg-white/10 rounded-lg transition-colors duration-300"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <IoClose size={24} /> : <IoMenuSharp size={24} />}
        </button>
      </nav>
      <BusinessMobileNav
        t={t}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        language={currentLanguage}
        handleLanguageChange={handleLanguageChange}
      />
    </header>
  );
};

export default BusinessRegistrationNavbar;
