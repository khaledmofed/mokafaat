import { PrimaryGradientButton } from "@components";
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import { t } from "i18next";
import { APP_ROUTES } from "@constants";

const WhoAreWe = (props: { isRTL: boolean; description?: string }) => {
  const { isRTL, description } = props;

  const [counterOn, setCounterOn] = useState(false);
  const whoFontType = isRTL
    ? "readex-pro text-2xl top-0 right-0"
    : "font-pacifico text-5xl top-5 md:top-7 right-7";
  const titleFontType = isRTL
    ? "readex-pro text-4xl"
    : "font-nenu-condensed-bold text-7xl";

  return (
    <section
      className="who-are-we max-w-screen-xl flex items-center justify-center mx-auto md:py-10 md:px-4 px-6 py-6"
      style={{ marginTop: "15rem" }}
    >
      <div className="justify-center items-center grid lg:grid-cols-2">
        <div
          className="w-full min-h-96 bg-who-are-we bg-no-repeat bg-center bg-contain relative block lg:flex wow fadeInLeft"
          data-wow-delay="0.2s"
        >
          <div className="absolute md:bottom-28 md:left-5 bottom-32 left-0 bg-white rounded-xl px-4 py-2 flex gap-3 items-center shadow-lg">
            <ScrollTrigger onEnter={() => setCounterOn(true)} />
            <h4 className="font-bold text-primary text-lg md:text-xl">
              +{" "}
              {(counterOn && (
                <CountUp start={0} end={40} duration={3} delay={0} />
              )) ||
                "0"}
            </h4>

            <h4 className="max-w-14 me-0 md:me-2 font-semibold text-sm capitalize">
              {t("home.about.clients")}
            </h4>
          </div>
          <div className="absolute md:bottom-12 md:left-14 bottom-16 left-9 bg-white rounded-xl px-4 py-2 flex gap-3 items-center shadow-lg">
            <h4 className="font-bold text-primary text-lg md:text-xl">
              +{" "}
              {(counterOn && (
                <CountUp start={0} end={200} duration={2} delay={0} />
              )) ||
                "0"}
            </h4>
            <h4 className="max-w-14 me-4 font-semibold text-sm capitalize">
              {t("home.about.events")}
            </h4>
          </div>
        </div>

        <div
          className="info flex flex-col max-w-lg ms-10 wow fadeInRight"
          data-wow-delay="0.2s"
        >
          <span
            className={`${whoFontType} mb-2 capitalize relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent wow fadeInUp`}
            data-wow-delay="0.2s"
          >
            {t("home.about.who")}
          </span>
          <h1
            className={`mb-6 text-title font-bold ${titleFontType} uppercase z-2 wow fadeInUp`}
            data-wow-delay="0.3s"
          >
            {t("home.about.are-we")}
          </h1>
          <p
            className="mb-4 text-title text-sm wow fadeInUp"
            data-wow-delay="0.3s"
          >
            {description}
          </p>
          <PrimaryGradientButton
            to={APP_ROUTES.about}
            className="w-full md:w-1/4 justify-center"
            visibility="flex"
          >
            {t("home.see-more")}
          </PrimaryGradientButton>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
