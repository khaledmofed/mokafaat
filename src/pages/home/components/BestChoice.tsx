import { PrimaryGradientButton } from "@components";
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import { useTranslation } from "react-i18next";
import { APP_ROUTES } from "@constants";
import {
  EventsIcon,
  ClientIcon2,
  CountriesIcon,
  FreelancersIcon,
} from "@assets";

const BestChoice = () => {
  const { t } = useTranslation();
  const [counterOn, setCounterOn] = useState(false);

  return (
    <section className="pt-16 pb-0 bg-white pt-disktop-mobile">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start best-choice-container">
          {/* Left Section - Text Content */}
          <div
            className="space-y-6 best-choice-left-section w-mobile"
            style={{ marginRight: "-4rem" }}
          >
            {/* Subtitle */}
            <span className="text-[#fd671a] text-md font-semibold">
              {t("home.about.subtitle")}
            </span>

            {/* Main Heading */}
            <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight font-size-mobile-heading">
              {t("home.about.main-title")}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-md leading-relaxed">
              {t("home.about.description")}
            </p>

            {/* Button */}
            <PrimaryGradientButton
              to={APP_ROUTES.about}
              className="mt-6 Btn-Bk-white-Brdr-Primary-Text-Primary border-2 border-[#fd671a] bg-white text-[#fd671a] hover:bg-[#fd671a] hover:text-white transition-all duration-300 rounded-full px-8 py-4 font-semibold text-lg"
              visibility="flex"
            >
              {t("home.about.more-details")}
            </PrimaryGradientButton>
          </div>

          {/* Right Section - Statistical Cards */}
          <div
            className="relative best-choice-right-section wStyle-mobile-container"
            style={{ marginLeft: "1rem" }}
          >
            <ScrollTrigger onEnter={() => setCounterOn(true)} />

            <div
              className="transform grid grid-cols-2 gap-6 relative wStyle-mobile"
              style={{
                paddingRight: "40px",
                paddingLeft: "45px",
              }}
            >
              {/* Events Card */}
              <div
                className="wStyle-mobile-item animate-float rounded-xl p-8 text-white shadow-md transform hover:scale-105 transition-all duration-300 best-choice-events-card"
                style={{
                  backgroundColor: "#266DCA",
                  transform: "scale(1.1)",
                  left: "70px",
                  position: "relative",
                  transformOrigin: "left",
                  marginRight: "20px",
                }}
              >
                <div
                  className="flex flex-col items-start justify-center h-full"
                  style={{
                    marginTop: "-30px",
                  }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={EventsIcon}
                      alt="Events"
                      style={{
                        width: "50px",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="text-start">
                    <div className="text-3xl font-bold mb-0">
                      +{" "}
                      {counterOn ? (
                        <CountUp start={0} end={700} duration={2} delay={0.1} />
                      ) : (
                        "+700"
                      )}
                    </div>
                    <div className="text-xl font-semibold opacity-95">
                      {t("home.about.stats.events")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clients Card */}
              <div
                className="wStyle-mobile-item rounded-xl p-8 text-white shadow-md transform hover:scale-105 transition-all duration-300 best-choice-clients-card"
                style={{
                  backgroundColor: "rgba(131, 38, 202, 0.8)",
                  transform: "scale(.85)",
                  left: "100px",
                  position: "relative",
                  transformOrigin: "left",
                  zIndex: 1,
                  marginRight: "30px",
                }}
              >
                <div className="flex flex-col items-start justify-center h-full">
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={ClientIcon2}
                      alt="Clients"
                      style={{
                        width: "58px",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="text-start">
                    <div className="text-4xl font-bold mb-3">
                      +{" "}
                      {counterOn ? (
                        <CountUp start={0} end={10} duration={2} delay={0.2} />
                      ) : (
                        "+10"
                      )}
                    </div>
                    <div className="text-xl font-semibold opacity-95">
                      {t("home.about.stats.clients")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Countries Card */}
              <div
                className="wStyle-mobile-item rounded-xl p-8 text-white shadow-md transform hover:scale-105 transition-all duration-300 best-choice-countries-card"
                style={{
                  backgroundColor: "rgba(255, 161, 22, 0.8)",
                  transform: "scale(.85)",
                  left: "26px",
                  top: "-65px",
                  position: "relative",
                  transformOrigin: "left",
                  marginRight: "35px",
                }}
              >
                <div className="flex flex-col items-start justify-center h-full">
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={CountriesIcon}
                      alt="Countries"
                      style={{
                        width: "75px",
                        height: "auto",
                        marginLeft: "-14px",
                      }}
                    />
                  </div>
                  <div className="text-start">
                    <div className="text-5xl font-bold mb-3">
                      +{" "}
                      {counterOn ? (
                        <CountUp start={0} end={4} duration={2} delay={0.3} />
                      ) : (
                        "+4"
                      )}
                    </div>
                    <div className="text-xl font-semibold opacity-95">
                      {t("home.about.stats.countries")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Freelancers Card */}
              <div
                className="wStyle-mobile-item animate-float rounded-xl p-8 text-white shadow-md transform hover:scale-105 transition-all duration-300 best-choice-freelancers-card"
                style={{
                  backgroundColor: "rgb(109 202 38 / 80%)",
                  transform: "scale(1.1)",
                  left: "-17px",
                  top: "-65px",
                  position: "relative",
                  transformOrigin: "left center",
                  marginRight: "35px",
                }}
              >
                <div className="flex flex-col items-start justify-center h-full">
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={FreelancersIcon}
                      alt="Freelancers"
                      style={{
                        width: "58px",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="text-start">
                    <div className="text-3xl font-bold mb-0">
                      +{" "}
                      {counterOn ? (
                        <CountUp
                          start={0}
                          end={10000}
                          duration={2}
                          delay={0.4}
                        />
                      ) : (
                        "+10,000"
                      )}
                    </div>
                    <div className="text-xl font-semibold opacity-95">
                      {t("home.about.stats.freelancers")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestChoice;
