import React from "react";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { ManGroup, AkaratCircle } from "@assets";
import { useAppConfig } from "@hooks/api/useMokafaatQueries";
// import { IoIosArrowRoundForward } from "react-icons/io";

interface GetStartedSectionProps {
  className?: string;
}

type AppConfigResponse = {
  data?: {
    config?: {
      app_links?: { app_store?: string; google_play?: string };
      share?: {
        ios_link?: string;
        android_link?: string;
        title?: string;
        subtitle?: string;
        message?: string;
      };
    };
  };
};

const GetStartedSection: React.FC<GetStartedSectionProps> = ({
  className = "",
}) => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();
  const { data: appConfig } = useAppConfig() as { data?: AppConfigResponse };
  const config = appConfig?.data?.config;
  const appStoreUrl =
    config?.app_links?.app_store ?? config?.share?.ios_link ?? "#";
  const googlePlayUrl =
    config?.app_links?.google_play ?? config?.share?.android_link ?? "#";
  const shareTitle = config?.share?.title;
  const shareSubtitle = config?.share?.subtitle;
  const shareMessage = config?.share?.message;

  // const handleGetStarted = () => {
  //   console.log("Get Started clicked");
  // };

  return (
    <section className={`py-0 relative ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Card */}
        <div
          className="bg-white relative h-auto lg:h-[270px]"
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-0">
            {/* Left Side - Dark Blue Background with Man */}
            <div className={`relative hidden lg:block w-1/3`}>
              <div
                className=""
                style={{
                  height: "270px",
                  position: "relative",
                }}
              >
                {/* Man Image - Using ManGroup as specified */}
                <img
                  src={ManGroup}
                  alt="Real Estate Expert"
                  className="w-auto h-auto lg:h-[425px] object-cover z-10"
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    width: "auto",
                    transform: isRTL ? "rotateY(180deg)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Right Side - White Content Area */}
            <div className={`p-6 w-full lg:w-2/3`}>
              {/* Main Title */}
              <div>
                <h2
                  className="text-[#400198] text-2xl font-bold mb-3"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {shareTitle ?? t("getStarted.mainTitle")}{" "}
                  {/* <span
                    className="text-[#fd671a]"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("getStarted.consultation")}
                  </span> */}
                </h2>
              </div>

              {/* First Paragraph */}
              <p
                className="text-base text-[#4C4C4C] font-semibold leading-relaxed mb-2"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {shareSubtitle ?? t("getStarted.firstParagraph")}
              </p>

              {/* Second Paragraph - من config.share.message */}
              <p
                className="text-sm text-gray-600 leading-relaxed w-[80%]"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {shareMessage ?? t("getStarted.secondParagraph")}
              </p>

              {/* Call-to-Action Button */}
              {/* <div className="pt-6">
                <button
                  onClick={handleGetStarted}
                  className="bg-[#400198] hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-3 sm:py-3 font-semibold rounded-full text-white flex items-center gap-2"
                  style={{
                    marginTop: "0px",
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  <span>{t("getStarted.buttonText")}</span>
                  <IoIosArrowRoundForward
                    className={`text-2xl transform ${
                      isRTL ? "rotate-45" : "-rotate-45"
                    }`}
                  />
                </button>
              </div> */}
              {/* App Download Buttons - روابط من /api/app-config (app_links أو share) */}
              <div className="flex flex-row gap-4 pt-4">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-8 h-8 me-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-8 h-8 me-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Company Logo - Bottom Right of Content Area */}
              <div
                className={`absolute bottom-2 ${isRTL ? "left-2" : "right-2"}`}
              >
                <img
                  src={AkaratCircle}
                  alt="Mukafaat Logo"
                  className="w-auto h-[132px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
