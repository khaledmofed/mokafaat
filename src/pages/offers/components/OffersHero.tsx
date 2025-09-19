import React from "react";
import { useIsRTL } from "@hooks";
import { AboutPattern } from "@assets";

const OffersHero: React.FC = () => {
  const isRTL = useIsRTL();
  const titleFontType = isRTL
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  return (
    <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[140px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30" />
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1
          className={`${titleFontType} mb-4 tracking-tight leading-none text-white`}
        >
          {isRTL ? "العروض" : "Offers"}
        </h1>

        <div className="flex items-center justify-center text-sm md:text-base mb-8">
          <span className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs">
            {isRTL ? "الرئيسية" : "Home"}
          </span>
          <span className="text-white text-xs mx-2">|</span>
          <span className="text-[#fd671a] font-medium text-xs">
            {isRTL ? "العروض" : "Offers"}
          </span>
        </div>
      </div>

      <div className="absolute -bottom-10 transform z-9">
        <img
          src={AboutPattern}
          alt="Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

export default OffersHero;
