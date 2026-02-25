import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { usePaymentCallback } from "@hooks/api/useMokafaatQueries";

const SubscriptionSuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentCallback = usePaymentCallback();
  const calledRef = useRef(false);

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  useEffect(() => {
    if (calledRef.current || !id || !status || status.toLowerCase() !== "paid") return;
    calledRef.current = true;
    paymentCallback.mutate({ id, status });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, status]);

  return (
    <>
      <Helmet>
        <title>{t("home.subscription.thankYouForSubscribing")} | Mokafaat</title>
      </Helmet>

      <section className="min-h-screen bg-[#1D0843] flex flex-col items-center justify-center px-4 py-12">
        {/* Celebratory graphic placeholder */}
        <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-8" aria-hidden>
          <span className="text-5xl">🎉</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          {t("home.subscription.thankYouForSubscribing")}
        </h1>
        <p className="text-white/80 text-center max-w-md mb-10">
          {t("home.subscription.thankYouDesc")}
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-10 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
        >
          {t("home.subscription.ok")}
        </button>
      </section>
    </>
  );
};

export default SubscriptionSuccessPage;
