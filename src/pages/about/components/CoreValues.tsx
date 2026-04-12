import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import coreValueImg from "@assets/images/core-value.png";
import coreValuePattern from "@assets/images/cure-value-pattern.png";

const CoreValues = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  const coreValues = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
    id,
    title: t(`about.coreValues.item${id}.title`),
    description: t(`about.coreValues.item${id}.description`),
  }));

  return (
    <section className="py-0 bg-white flex-mobile-inner">
      <div className="flex flex-mobile-inner">
        {/* Left Section - Image */}
        <div className="relative w-1/2">
          <img
            src={coreValueImg}
            alt={t("about.coreValues.heading")}
            className="w-full h-[550px] object-cover"
          />
        </div>

        {/* Right Section - Core Values */}
        <div className="padding-mobile-inner bg-[#1D0843] p-20 lg:p-20 flex flex-col justify-center w-1/2 relative overflow-hidden">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            {t("about.coreValues.heading")}
          </h2>

          <div className="space-y-6">
            {coreValues.map((value) => (
              <div
                key={value.id}
                className={`flex items-start ${
                  isRTL ? "space-x-reverse space-x-4" : "space-x-4"
                }`}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[#69aa3a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {value.id}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed">
                    {value.title} - {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={`absolute top-0 w-full h-full transform z-9`}>
            <img
              src={coreValuePattern}
              alt=""
              className="w-full h-full animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
