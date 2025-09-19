import React from "react";
import { t } from "i18next";
import { GetStartedBg, LogoStart } from "@assets";
import { useIsRTL } from "@hooks";

interface GetStartedProps {
  className?: string;
}

const GetStarted: React.FC<GetStartedProps> = ({ className = "" }) => {
  const isRTL = useIsRTL();
  return (
    <section
      className={`py-20 relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#1D0843" }}
    >
      <div
        className={`absolute  transform h-full direction-rtl-style ${
          isRTL ? "left-0" : "right-0"
        } z-0`}
        style={{ top: "-2%" }}
      >
        <img
          src={GetStartedBg}
          alt="App Pattern"
          className="animate-float"
          style={{ height: "110%" }}
        />
      </div>
      {/* Abstract shapes */}
      {/* <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-pink-400 rounded-full blur-lg"></div>
        <div className="absolute top-60 right-60 w-40 h-40 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute top-80 right-80 w-20 h-20 bg-pink-500 rounded-full blur-md"></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-2/5 mb-8 lg:mb-0">
            {/* Logo */}
            <div className="mb-6">
              <div className="">
                <img
                  src={LogoStart}
                  alt="Mukafaat Logo"
                  className="w-20 h-20 object-contain"
                  style={{
                    margin: "-15px",
                    marginBottom: "-5px",
                  }}
                />
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-white leading-tight mb-7">
              {t("home.getStarted.title")}
            </h2>

            {/* CTA Button */}
            <button className="bg-[#69aa3a] text-white px-8 py-4 rounded-md font-semibold text-sm hover:bg-green-600 transition-colors">
              {t("home.getStarted.button")}
            </button>
          </div>

          {/* Right Content */}
          <div className="lg:w-3/5">
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              {t("home.getStarted.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
