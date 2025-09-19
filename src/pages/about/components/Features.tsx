import { AboutFeatures } from "@constants";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";

const Features = () => {
  const [t] = useTranslation();
  const isRTL = useIsRTL();
  const titleFontType = isRTL
    ? "readex-pro text-3xl"
    : "font-nenu-condensed-bold text-6xl";
  return (
    <section
      className="features md:py-6 md:px-10 px-6 py-6 max-w-screen-xl mx-auto
     flex flex-col gap-5"
    >
      <h1
        className={`mb-4 text-title ${titleFontType} text-center font-bold uppercase wow fadeInUp`}
        data-wow-delay="0.2s"
      >
        {t("about.our-values")}
      </h1>
      <div className="grid lg:grid-cols-3 gap-3">
        {AboutFeatures.map((feature, index) => (
          <div
            key={index}
            className=" bg-white border border-gray-200 p-10 flex flex-col items-center text-center wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div
              className="icon bg-primary bg-opacity-10 rounded-full p-4 flex justify-center items-center mb-5 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <ReactSVG src={`${feature.icon}`} />
            </div>
            <h1
              className=" text-primary text-lg font-bold capitalize mb-3 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              {t(`${feature.title}`)}
            </h1>
            <p
              className=" text-sub-title text-sm wow fadeInUp"
              data-wow-delay="0.3s"
            >
              {t(`${feature.description}`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
