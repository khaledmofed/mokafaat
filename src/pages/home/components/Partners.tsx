import React from "react";
import { t } from "i18next";
import {
  OurAppPattern2,
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
} from "@assets";
import { useIsRTL } from "@hooks";

interface PartnerCardProps {
  logo: string;
  alt: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ logo, alt }) => {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-center h-32">
        <img
          src={logo}
          alt={alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

const Partners: React.FC = () => {
  const isRTL = useIsRTL();
  const partners = [
    { logo: Partner3, alt: "Riyadh EXPO 2030" },
    { logo: Partner2, alt: "Saudi Arabia" },
    { logo: Partner1, alt: "Saudi Aramco" },
    { logo: Partner4, alt: "Alryhana" },
    { logo: Partner5, alt: "Awlad Al Riyadh" },
    // { logo: Partner3, alt: "Saudi Arabia" },
    // { logo: Partner4, alt: "Riyadh EXPO 2030" },
    // { logo: Partner5, alt: "Saudi Aramco" },
    // { logo: Partner1, alt: "Riyadh EXPO 2030" },
    // { logo: Partner2, alt: "Saudi Arabia" },
  ];

  return (
    <section
      className=" py-20 relative overflow-hidden flex-mobile"
      style={{ backgroundColor: "#F7F8FB" }}
    >
      {/* Decorative pattern */}
      <div className="container mx-auto px-4 z-10">
        {/* Header */}
        <div className="space-y-6 container mx-auto mb-16">
          {/* Subtitle */}
          <div className="flex justify-center items-center">
            <div className="">
              <span className="text-[#fd671a] text-md font-semibold">
                {t("home.partners.subtitle")}
              </span>

              {/* Main Heading */}
              <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {t("home.partners.title")}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-md leading-relaxed max-w-2xl mx-auto text-start">
              {t("home.partners.description")}
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 relative  gap-3 z-10">
          {partners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </div>
      </div>
      <div
        className={`absolute bottom-0  transform ${
          isRTL ? "right-0" : "left-0"
        } z-0`}
      >
        <img
          src={OurAppPattern2}
          alt="App Pattern"
          className="w-3/5 h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default Partners;
