import { AboutPattern } from "@assets";
import { useIsRTL } from "@hooks";
// import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const ServiceDetailsHero = () => {
  // const [t] = useTranslation();
  const isRTL = useIsRTL();
  const { serviceSlug } = useParams();
  const titleFontType = useIsRTL()
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  // Service data based on slug - matching HeroSlider slides
  const getServiceData = (slug: string) => {
    const services = {
      "event-management": {
        title: isRTL
          ? "إدارة الفعاليات المتخصصة"
          : "Specialized Event Management",
        name: isRTL ? "إدارة الفعاليات" : "Event Management",
      },
      "freelance-event-planners": {
        title: isRTL ? "مخططي الفعاليات المستقلين" : "Freelance Event Planners",
        name: isRTL ? "المستقلين" : "Freelancers",
      },
      "event-system-solutions": {
        title: isRTL
          ? "حلول نظام الفعاليات الشاملة"
          : "Comprehensive Event System Solutions",
        name: isRTL ? "حلول نظام الفعاليات" : "Event System Solution",
      },
      "equipment-rental-services": {
        title: isRTL
          ? "خدمات تأجير المعدات الاحترافية"
          : "Professional Equipment Rental Services",
        name: isRTL ? "تأجير المعدات" : "Equipment Renting",
      },
      "strategic-promotion": {
        title: isRTL ? "الترويج الاستراتيجي" : "Strategic Promotion",
        name: isRTL ? "الترويج" : "Promoting",
      },
      "logistic-solutions": {
        title: isRTL
          ? "الحلول اللوجستية الذكية والموثوقة"
          : "Smart & Reliable Logistic Solutions",
        name: isRTL ? "الحلول اللوجستية" : "Logistic Solution",
      },
      "hosting-services": {
        title: isRTL ? "خدمات المضيفين" : "Hosting Services",
        name: isRTL ? "خدمة المضيفين" : "Hosting Services",
      },
      "security-services": {
        title: isRTL ? "خدمات الأمن والحماية" : "Security Services",
        name: isRTL ? "خدمات الأمن" : "Security Services",
      },
      "cleaning-services": {
        title: isRTL ? "خدمات التنظيف المتخصصة" : "Cleaning Services",
        name: isRTL ? "خدمات التنظيف" : "Cleaning Services",
      },
      "catering-services": {
        title: isRTL ? "خدمات الطعام والضيافة" : "Catering Services",
        name: isRTL ? "خدمات الطعام" : "Catering Services",
      },
    };
    return (
      services[slug as keyof typeof services] || {
        title: "Service Details",
        name: "Service",
      }
    );
  };

  const serviceData = getServiceData(serviceSlug || "event-management");

  return (
    <section className="relative w-full bg-[#1D0843]  overflow-hidden min-h-[100px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30"></div>
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1
          className={`${titleFontType} mb-4 tracking-tight leading-none text-white wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {serviceData.title}
        </h1>

        <div
          className="flex items-center justify-center space-x-2 text-sm md:text-base wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <Link
            to="/"
            className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
          >
            {isRTL ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-white text-xs">|</span>
          <Link
            to="/services"
            className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
          >
            {isRTL ? "الخدمات" : "Services"}
          </Link>
          <span className="text-white text-xs">|</span>
          <span className="text-purple-300 font-medium text-xs">
            {serviceData.name}
          </span>
        </div>
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

export default ServiceDetailsHero;
