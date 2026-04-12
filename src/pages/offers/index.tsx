// import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import OffersHero from "./components/OffersHero";
import CategorySection from "./components/CategorySection";
import LatestOffersSection from "./components/LatestOffersSection";
import WeeklyDiscountsSection from "./components/WeeklyDiscountsSection";
import PaidOffersSection from "./components/PaidOffersSection";
import SuggestedOffersSection from "./components/SuggestedOffersSection";
import GetStartedSection from "@pages/home/components/GetStartedSection";

const OffersPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("offersPage.pageTitle")}</title>
        <link rel="canonical" href="https://mukafaat.com/offers" />
      </Helmet>

      <OffersHero />

      <CategorySection />

      <LatestOffersSection />

      <WeeklyDiscountsSection />

      <PaidOffersSection />

      <SuggestedOffersSection />

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default OffersPage;
