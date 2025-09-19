import { AboutPattern } from "@assets";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutHero = () => {
  const [t] = useTranslation();
  const isRTL = useIsRTL();
  const titleFontType = useIsRTL()
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  return (
    <section className="relative w-full bg-[#1D0843]  overflow-hidden min-h-[100px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30"></div>
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1
          className={`${titleFontType} mb-4 tracking-tight leading-none text-white wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("about.hero.title")}
        </h1>

        <div
          className={`flex items-center justify-center text-sm md:text-base wow fadeInUp ${
            isRTL ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
          data-wow-delay="0.3s"
        >
          <Link
            to="/"
            className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
          >
            {isRTL ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-white text-xs">|</span>
          <span className="text-purple-300 font-medium text-xs">
            {isRTL ? "من نحن" : "About Us"}
          </span>
        </div>
        {/* <p
          className="text-xs md:text-sm font-normal sm:px-30 md:px-60 text-white wow fadeInUp"
          data-wow-delay="0.2s"
        >
          {t("about.hero.description")}
        </p> */}
      </div>
      <div className={`absolute -bottom-10  transform z-9`}>
        <img
          src={AboutPattern}
          alt="App Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

export default AboutHero;
