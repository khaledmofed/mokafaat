// import { useIsRTL } from "@hooks";
import { GetStarted } from "@pages/home/components";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import {
  ServiceHero,
  ServiceFeatures,
  ServicesMainGallaery,
} from "./components/index";

const ServiceDetailsPage = () => {
  //   const isRTL = useIsRTL();

  return (
    <>
      <Helmet>
        <title>{t("home.navbar.services")}</title>
        <link rel="canonical" href="https://mukafaat.com/services" />
        <meta
          name="description"
          content="Discover our comprehensive event management services including hosting, security, photography, and more."
        />
        <meta property="og:title" content={t("home.navbar.services")} />
        <meta
          property="og:description"
          content="Discover our comprehensive event management services including hosting, security, photography, and more."
        />
      </Helmet>

      <div className="service-details">
        <ServiceHero />
        {/* <ServiceDescription /> */}
        {/* <OurServices /> */}
        <ServicesMainGallaery />
        <ServiceFeatures />
        <GetStarted />
      </div>
    </>
  );
};

export default ServiceDetailsPage;
