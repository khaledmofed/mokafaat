import {
  UnderTitle,
  WorldwidePropertiesImage,
  WorldwidePropertiesPattern,
  WorldwidePropertiesplaneVector,
} from "@assets";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";

const WorldwideProperties: React.FC = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  return (
    <section className="py-0 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Section - Image Collage */}
          <div className="relative">
            {/* Top Image */}
            <div className="relative mb-8 pe-0 lg:pe-10">
              <img
                src={WorldwidePropertiesImage}
                alt={t("worldwideProperties.modernBuilding")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-4">
            {/* Subtitle */}
            <div className="text-start mb-0">
              <div className="text-start gap-2 mb-3">
                <span
                  className="text-[#fd671a] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {t("worldwideProperties.subtitle")}
                </span>
                <img
                  src={UnderTitle}
                  alt={t("worldwideProperties.underlineDecoration")}
                  className="h-1 mt-2"
                />
              </div>
              <h2
                className="text-[#400198] text-3xl font-bold"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {t("worldwideProperties.mainTitle")}
              </h2>
            </div>

            {/* Description */}
            <p
              className="text-md leading-relaxed"
              style={{
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              {t("worldwideProperties.description")}
            </p>

            {/* Features List */}
            <div className="space-y-6">
              <div
                className={`flex items-center ${
                  isRTL ? "space-x-reverse space-x-4" : "space-x-4"
                }`}
              >
                <div className="w-14 h-14 bg-[#fd671a] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="27"
                      viewBox="0 0 26 27"
                      fill="none"
                    >
                      <path
                        d="M20.2785 12.0985C20.0698 12.298 19.7907 12.4094 19.5002 12.4094C19.2098 12.4094 18.9307 12.298 18.722 12.0985C16.8098 10.2621 14.2475 8.21055 15.4972 5.23211C16.1728 3.62169 17.7946 2.59119 19.5002 2.59119C21.2058 2.59119 22.8275 3.62169 23.5032 5.23211C24.7512 8.20687 22.1953 10.2684 20.2785 12.0985Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19.5 6.95459H19.5097"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.41675 24.4089C7.21167 24.4089 8.66678 22.9436 8.66678 21.1361C8.66678 19.3287 7.21167 17.8634 5.41675 17.8634C3.62182 17.8634 2.16675 19.3287 2.16675 21.1361C2.16675 22.9436 3.62182 24.4089 5.41675 24.4089Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9167 8.04517H10.2917C8.19756 8.04517 6.5 9.51044 6.5 11.3179C6.5 13.1254 8.19756 14.5906 10.2917 14.5906H13.5417C15.6358 14.5906 17.3333 16.0558 17.3333 17.8633C17.3333 19.6709 15.6358 21.1361 13.5417 21.1361H11.9167"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <h3
                    className="text-md font-bold text-gray-900 mb-1"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("worldwideProperties.selectManyLocation")}
                  </h3>
                  <p
                    className={`text-sm text-gray-600 ${
                      isRTL ? "w-[60%] ml-auto" : "w-[60%]"
                    }`}
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("worldwideProperties.locationDescription")}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center ${
                  isRTL ? "space-x-reverse space-x-4" : "space-x-4"
                }`}
              >
                <div className="w-14 h-14 bg-[#fd671a] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="27"
                      viewBox="0 0 26 27"
                      fill="none"
                    >
                      <path
                        d="M20.2785 12.0985C20.0698 12.298 19.7907 12.4094 19.5002 12.4094C19.2098 12.4094 18.9307 12.298 18.722 12.0985C16.8098 10.2621 14.2475 8.21055 15.4972 5.23211C16.1728 3.62169 17.7946 2.59119 19.5002 2.59119C21.2058 2.59119 22.8275 3.62169 23.5032 5.23211C24.7512 8.20687 22.1953 10.2684 20.2785 12.0985Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19.5 6.95459H19.5097"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.41675 24.4089C7.21167 24.4089 8.66678 22.9436 8.66678 21.1361C8.66678 19.3287 7.21167 17.8634 5.41675 17.8634C3.62182 17.8634 2.16675 19.3287 2.16675 21.1361C2.16675 22.9436 3.62182 24.4089 5.41675 24.4089Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9167 8.04517H10.2917C8.19756 8.04517 6.5 9.51044 6.5 11.3179C6.5 13.1254 8.19756 14.5906 10.2917 14.5906H13.5417C15.6358 14.5906 17.3333 16.0558 17.3333 17.8633C17.3333 19.6709 15.6358 21.1361 13.5417 21.1361H11.9167"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <h3
                    className="text-md font-bold text-gray-900 mb-1"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("worldwideProperties.selectManyLocation")}
                  </h3>
                  <p
                    className={`text-sm text-gray-600 ${
                      isRTL ? "w-[60%] ml-auto" : "w-[60%]"
                    }`}
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("worldwideProperties.locationDescription")}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="bg-[#400198] hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
              style={{
                marginTop: "30px",
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              <span>{t("worldwideProperties.viewAboutUs")}</span>
              <IoIosArrowRoundForward
                className={`text-3xl transform ${
                  isRTL ? "rotate-45" : "-rotate-45"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-20 w-1/3 sm:w-1/2 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={WorldwidePropertiesPattern}
          alt={t("worldwideProperties.appPattern")}
          className="h-auto animate-float"
        />
      </div>

      <div
        className={`absolute bottom-0 w-[20%] sm:w-[20%] ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={WorldwidePropertiesplaneVector}
          alt={t("worldwideProperties.planeVector")}
          className="h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default WorldwideProperties;
