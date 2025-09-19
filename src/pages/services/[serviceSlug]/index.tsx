import { useIsRTL } from "@hooks";
import { GetStarted } from "@pages/home/components";
// import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  ServiceDetailsHero,
  ServiceDetailsContent,
  ServiceGallery,
  ServiceFeatures,
} from "../components/index";

const ServiceDetailsPage = () => {
  const isRTL = useIsRTL();
  const { serviceSlug } = useParams();

  // Get service name for meta tags - matching HeroSlider slides
  const getServiceName = (slug: string) => {
    const services = {
      "event-management": isRTL
        ? "إدارة الفعاليات المتخصصة"
        : "Specialized Event Management",
      "freelance-event-planners": isRTL
        ? "مخططي الفعاليات المستقلين"
        : "Freelance Event Planners",
      "event-system-solutions": isRTL
        ? "حلول نظام الفعاليات الشاملة"
        : "Comprehensive Event System Solutions",
      "equipment-rental-services": isRTL
        ? "خدمات تأجير المعدات الاحترافية"
        : "Professional Equipment Rental Services",
      "strategic-promotion": isRTL
        ? "الترويج الاستراتيجي"
        : "Strategic Promotion",
      "logistic-solutions": isRTL
        ? "الحلول اللوجستية الذكية والموثوقة"
        : "Smart & Reliable Logistic Solutions",
      "hosting-services": isRTL ? "خدمات المضيفين" : "Hosting Services",
      "security-services": isRTL ? "خدمات الأمن والحماية" : "Security Services",
      "cleaning-services": isRTL
        ? "خدمات التنظيف المتخصصة"
        : "Cleaning Services",
      "catering-services": isRTL
        ? "خدمات الطعام والضيافة"
        : "Catering Services",
    };
    return services[slug as keyof typeof services] || "Service Details";
  };

  const serviceName = getServiceName(serviceSlug || "event-management");

  return (
    <>
      <Helmet>
        <title>{serviceName}</title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/services/${serviceSlug}`}
        />
        <meta
          name="description"
          content={`Discover our ${serviceName.toLowerCase()} - professional event management services with expert team and comprehensive solutions.`}
        />
        <meta property="og:title" content={serviceName} />
        <meta
          property="og:description"
          content={`Discover our ${serviceName.toLowerCase()} - professional event management services with expert team and comprehensive solutions.`}
        />
      </Helmet>

      <div className="service-details">
        <ServiceDetailsHero />
        <ServiceDetailsContent />
        <ServiceGallery />
        <ServiceFeatures />
        <GetStarted />
      </div>
    </>
  );
};

export default ServiceDetailsPage;
