// import React from "react";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import OffersHero from "./components/OffersHero";
import CategorySection from "./components/CategorySection";
import LatestOffersSection from "./components/LatestOffersSection";
import WeeklyDiscountsSection from "./components/WeeklyDiscountsSection";
import SuggestedOffersSection from "./components/SuggestedOffersSection";
import GetStartedSection from "@pages/home/components/GetStartedSection";

const OffersPage = () => {
  const isRTL = useIsRTL();

  return (
    <>
      <Helmet>
        <title>{isRTL ? "العروض" : "Offers"}</title>
        <link rel="canonical" href="https://mukafaat.com/offers" />
      </Helmet>

      <OffersHero />

      <CategorySection />

      <LatestOffersSection />

      <WeeklyDiscountsSection />

      <SuggestedOffersSection />

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default OffersPage;
