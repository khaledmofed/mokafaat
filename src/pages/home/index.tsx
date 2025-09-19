import {
  // Clients,
  // ContactInfo,
  // Gallery,
  // GetStarted,
  HeroSlider,
  OffersSection,
  PropertySlider,
  PopularCountries,
  // Investments,
  GetStartedSection,
  NewsBlogs,
} from "./components/index";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import Boking from "./components/Boking";
import CardsSections from "./components/CardsSections";
import CouponsSection from "./components/CouponsSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{`Mukafaat - ${t("home.navbar.home")}`}</title>
        <link rel="canonical" href="https://mukafaat.com" />
        <meta
          name="description"
          content="Welcome to Mukafaat, your premier destination for professional event management. From planning to execution, we create unforgettable experiences tailored to your needs."
        />
        <meta
          property="og:title"
          content={`Mukafaat - ${t("home.navbar.home")}`}
        />
        <meta
          property="og:description"
          content="Welcome to Mukafaat, your premier destination for professional event management. From planning to execution, we create unforgettable experiences tailored to your needs."
        />
      </Helmet>

      <div className="home">
        <HeroSlider />
        <OffersSection />
        <PopularCountries />
        <Boking />
        <CardsSections />
        <CouponsSection />
        <PropertySlider />
        {/* <WorldwideProperties />
        <DreamProperties />
        <Investments /> */}
        <GetStartedSection />
        <NewsBlogs />
      </div>
    </>
  );
};

export default HomePage;
