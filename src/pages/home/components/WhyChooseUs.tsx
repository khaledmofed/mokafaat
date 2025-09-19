import {
  WhyChooseUsImage,
  PeopleIcon,
  BriefcaseIcon,
  MouseSquareIcon,
  SliderIcon,
  CubeIcon,
  OurAppPattern2,
} from "@assets";
import { t } from "i18next";
import { useIsRTL } from "@hooks";

const WhyChooseUs = () => {
  const isRTL = useIsRTL();

  const features = [
    {
      icon: <img src={PeopleIcon} alt="People" className="w-12 h-12" />,
      title: t("why-choose-us.feature1.title"),
      description: t("why-choose-us.feature1.description"),
    },
    {
      icon: <img src={BriefcaseIcon} alt="Briefcase" className="w-12 h-12" />,
      title: t("why-choose-us.feature2.title"),
      description: t("why-choose-us.feature2.description"),
    },
    {
      icon: <img src={MouseSquareIcon} alt="Mouse" className="w-12 h-12" />,
      title: t("why-choose-us.feature3.title"),
      description: t("why-choose-us.feature3.description"),
    },
    {
      icon: <img src={SliderIcon} alt="Slider" className="w-12 h-12" />,
      title: t("why-choose-us.feature4.title"),
      description: t("why-choose-us.feature4.description"),
    },
    {
      icon: <img src={CubeIcon} alt="Cube" className="w-12 h-12" />,
      title: t("why-choose-us.feature5.title"),
      description: t("why-choose-us.feature5.description"),
    },
    {
      icon: <img src={PeopleIcon} alt="People" className="w-12 h-12" />,
      title: t("why-choose-us.feature6.title"),
      description: t("why-choose-us.feature6.description"),
    },
  ];

  return (
    <section
      className="py-20 relative overflow-hidden why-choose-us-mobile "
      style={{ backgroundColor: "#F7F8FB" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          {/* Left Column - Text Content (1/3) */}
          <div className="lg:col-span-1 space-y-4">
            {/* Header */}
            <div className="text-center lg:text-start">
              <span className="text-[#fd671a] text-md font-semibold">
                {t("why-choose-us.subtitle")}
              </span>
              <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mt-2">
                {t("why-choose-us.title")}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("why-choose-us.description")}
            </p>

            {/* CTA Button */}
            <button className="bg-[#69aa3a] text-white px-8 py-4 rounded-md font-semibold text-sm hover:bg-green-600 transition-colors">
              {t("why-choose-us.cta")}
            </button>

            {/* Images Stack */}
            <div className="space-y-4">
              <img src={WhyChooseUsImage} alt="Why Choose Us" />
            </div>
          </div>

          {/* Right Column - Features Grid (2/3) */}
          <div
            className={`why-choose-us-mobile-grid lg:col-span-2 grid grid-cols-2 gap-4 ${
              isRTL ? "pl-0 pr-12" : "pl-12 pr-0"
            }`}
            style={{ paddingTop: "15px" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 transition-shadow flex items-start ${
                  isRTL ? "space-x-reverse" : ""
                } space-x-4`}
              >
                {/* Icon with glow effect */}
                <div className="flex-shrink-0 relative">
                  <div className="relative">{feature.icon}</div>
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold text-gray-900 mb-2 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-0  transform ${
          isRTL ? "right-0" : "left-0"
        } z-0`}
      >
        <img
          src={OurAppPattern2}
          alt="App Pattern"
          className="w-3/5 h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;
