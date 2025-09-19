import { t } from "i18next";
import {
  PeopleIcon,
  BriefcaseIcon,
  MouseSquareIcon,
  SliderIcon,
  CubeIcon,
  ClientIcon,
} from "@assets";

const ServiceFeatures = () => {
  const features = [
    {
      id: 1,
      icon: PeopleIcon,
      title: t("service-features.feature1.title"),
      description: t("service-features.feature1.description"),
    },
    {
      id: 2,
      icon: BriefcaseIcon,
      title: t("service-features.feature2.title"),
      description: t("service-features.feature2.description"),
    },
    {
      id: 3,
      icon: MouseSquareIcon,
      title: t("service-features.feature3.title"),
      description: t("service-features.feature3.description"),
    },
    {
      id: 4,
      icon: SliderIcon,
      title: t("service-features.feature4.title"),
      description: t("service-features.feature4.description"),
    },
    {
      id: 5,
      icon: CubeIcon,
      title: t("service-features.feature5.title"),
      description: t("service-features.feature5.description"),
    },
    {
      id: 6,
      icon: ClientIcon,
      title: t("service-features.feature6.title"),
      description: t("service-features.feature6.description"),
    },
  ];

  return (
    <section className="py-16 bg-white ServiceFeatures-mobile">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className=" mb-16 ServiceFeatures-mobile-header">
          <span className="text-[#fd671a] text-md font-semibold">
            {t("service-features.subtitle")}
          </span>
          <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {t("service-features.title")}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ServiceFeatures-mobile-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="ServiceFeatures-mobile-grid-item flex items-start gap-4 p-6 rounded-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-6 h-6"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1D0843] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
