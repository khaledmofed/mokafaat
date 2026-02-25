import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SubscriptionFailedPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{t("home.subscription.paymentFailed")} | Mokafaat</title>
      </Helmet>

      <section className="min-h-screen bg-[#1D0843] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-8" aria-hidden>
          <span className="text-4xl">⚠️</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          {t("home.subscription.paymentFailed")}
        </h1>
        <p className="text-white/80 text-center max-w-md mb-10">
          {t("home.subscription.paymentFailedDesc")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate("/subscription/plans")}
            className="px-8 py-3 rounded-full bg-[#fd671a] text-white font-medium hover:bg-[#e55c18] transition-colors"
          >
            {t("home.subscription.tryAgain")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors"
          >
            {t("home.subscription.backToHome")}
          </button>
        </div>
      </section>
    </>
  );
};

export default SubscriptionFailedPage;
