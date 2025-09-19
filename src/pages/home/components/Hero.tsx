import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import VideoPopup from "./VideoPopup";
import { PrimaryGradientButton } from "@components";
import { t } from "i18next";
import { APP_ROUTES } from "@constants";

const Hero = (props: { description?: string }) => {
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  const toggleVideoPopup = () => {
    setIsVideoPopupOpen(!isVideoPopupOpen);
  };

  return (
    <section className="relative w-full bg-hero bg-no-repeat bg-center bg-cover min-h-[480px] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-secondary opacity-70"></div>
      <div className="relative py-8 px-6 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 flex flex-col justify-center">
        <h5
          className="text-white capitalize text-lg md:text-2xl wow fadeInUp"
          data-wow-delay="0.1s"
        >
          {t("home.hero.subtitle")}
        </h5>
        <h1
          className="mb-4 text-7xl uppercase font-nenu-condensed-bold tracking-tight leading-none md:text-8xl lg:text-9xl text-white wow fadeInUp"
          data-wow-delay="0.2s"
        >
          {t("home.hero.company-name")}
        </h1>
        <p
          className="mb-8 text-sm md:text-md font-normal sm:px-30 md:px-60 text-white wow fadeInUp"
          data-wow-delay="0.2s"
        >
          {props.description}
        </p>
        <div className="flex gap-4 justify-center items-center">
          <PrimaryGradientButton to={APP_ROUTES.contact} visibility="flex">
            {t("home.hero.plan-button")}
          </PrimaryGradientButton>

          <div
            className="flex flex-row gap-4 items-center wow fadeInUp"
            data-wow-delay="0.2s"
            onClick={toggleVideoPopup}
          >
            <div className="relative p-6 bg-white rounded-full border-2 border-primary shadow-[0_0_0_4px_rgba(255,255,255,0.5)] cursor-pointer flex items-center justify-center">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaPlay className="text-primary" />
              </div>
            </div>

            <span className="text-white capitalize text-md">
              {t("home.navbar.services")}
            </span>
            <VideoPopup isOpen={isVideoPopupOpen} onClose={toggleVideoPopup} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
