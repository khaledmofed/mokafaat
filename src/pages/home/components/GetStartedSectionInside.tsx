import React from "react";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { ManGroup, AkaratCircle } from "@assets";

const GetStartedSectionInside: React.FC = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  return (
    <section className="py-0 relative ">
      <div className="container mx-auto px-4 lg:px-0 relative z-10">
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
                  className="w-auto h-auto lg:h-[368px] object-cover z-10"
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
                  {t("getStarted.mainTitle")}{" "}
                  <span
                    className="text-[#fd671a]"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("getStarted.consultation")}
                  </span>
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
                {t("getStarted.firstParagraph")}
              </p>

              {/* Second Paragraph */}
              <p
                className="text-sm text-gray-600 leading-relaxed w-[80%]"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {t("getStarted.secondParagraph")}
              </p>

              {/* Price Range Buttons */}
              <div className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => console.log("UP to $100K clicked")}
                    className="transition-colors duration-300 text-sm px-4 py-2 font-medium border"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                      backgroundColor: "#F8F8F8",
                      borderColor: "#E5E5E5",
                      color: "#4C4C4C",
                      borderRadius: "24px",
                    }}
                  >
                    {isRTL ? "حتى 100 ألف دولار" : "UP to $100K"}
                  </button>
                  <button
                    onClick={() => console.log("UP to $250K clicked")}
                    className="transition-colors duration-300 text-sm px-4 py-2 font-medium border"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                      backgroundColor: "#F8F8F8",
                      borderColor: "#E5E5E5",
                      color: "#4C4C4C",
                      borderRadius: "24px",
                    }}
                  >
                    {isRTL ? "حتى 250 ألف دولار" : "UP to $250K"}
                  </button>
                  <button
                    onClick={() => console.log("UP to $500K clicked")}
                    className="transition-colors duration-300 text-sm px-4 py-2 font-medium border"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                      backgroundColor: "#F8F8F8",
                      borderColor: "#E5E5E5",
                      color: "#4C4C4C",
                      borderRadius: "24px",
                    }}
                  >
                    {isRTL ? "حتى 500 ألف دولار" : "UP to $500K"}
                  </button>
                  <button
                    onClick={() => console.log("UP to $800K clicked")}
                    className="transition-colors duration-300 text-sm px-4 py-2 font-medium border"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                      backgroundColor: "#F8F8F8",
                      borderColor: "#E5E5E5",
                      color: "#4C4C4C",
                      borderRadius: "24px",
                    }}
                  >
                    {isRTL ? "حتى 800 ألف دولار" : "UP to $800K"}
                  </button>
                  <button
                    onClick={() => console.log("UP to $1M clicked")}
                    className="transition-colors duration-300 text-sm px-4 py-2 font-medium border"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                      backgroundColor: "#F8F8F8",
                      borderColor: "#E5E5E5",
                      color: "#4C4C4C",
                      borderRadius: "24px",
                    }}
                  >
                    {isRTL ? "حتى مليون دولار" : "UP to $1M"}
                  </button>
                </div>
              </div>

              {/* Company Logo - Bottom Right of Content Area */}
              <div
                className={`absolute lg:bottom-2 bottom-12 ${
                  isRTL ? "left-2" : "right-2"
                }`}
              >
                <img
                  src={AkaratCircle}
                  alt="Mukafaat Logo"
                  className="w-auto h-[90px] lg:h-[132px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSectionInside;
