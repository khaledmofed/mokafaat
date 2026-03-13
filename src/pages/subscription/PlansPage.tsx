import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import { useSubscriptionPlans } from "@hooks/api/useMokafaatQueries";
import { IoClose } from "react-icons/io5";
import { TbPackage } from "react-icons/tb";
import { AxiosError } from "axios";
import CurrencyIcon from "@components/CurrencyIcon";
import { LoadingSpinner } from "@components/LoadingSpinner";

/** Plan as returned from API - structure from mokafat.ivadso.com */
interface PlanItem {
  id: number | string;
  name?: string;
  name_ar?: string;
  name_en?: string;
  type?: string;
  price?: number | string;
  duration?: string;
  duration_months?: number;
  duration_days?: number;
  description?: string | null;
  features?: string[] | { ar?: string; en?: string }[];
  [key: string]: unknown;
}

function getPlanName(plan: PlanItem, isRTL: boolean): string {
  const name = (plan.name as string) ?? (isRTL ? plan.name_ar ?? plan.name_en : plan.name_en ?? plan.name_ar);
  return name || "";
}

/** Duration from API: "monthly" | "yearly" or numeric fields */
function getDurationMonths(plan: PlanItem): number {
  if (plan.duration_months != null) return Number(plan.duration_months);
  if (plan.duration_days != null) return Math.round(Number(plan.duration_days) / 30);
  const d = (plan.duration as string) || "";
  if (d.toLowerCase() === "monthly") return 1;
  if (d.toLowerCase() === "yearly" || d.toLowerCase() === "annual") return 12;
  return 0;
}

function getPlanFeatures(plan: PlanItem, isRTL: boolean): string[] {
  const raw = plan.features;
  if (!Array.isArray(raw)) return [];
  return raw.map((f) => (typeof f === "string" ? f : (isRTL ? (f as { ar?: string }).ar : (f as { en?: string }).en) || ""));
}

const SubscriptionPlansPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();

  const handleClose = () => {
    const st = location.state as { from?: string } | null | undefined;
    const from = st?.from?.trim();
    if (
      from &&
      from.startsWith("/") &&
      !from.startsWith("//") &&
      from !== "/subscription/plans"
    ) {
      navigate(from, { replace: true });
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  };
  const [subscribeErrorMsg, setSubscribeErrorMsg] = useState<string | null>(null);

  const { data: plansData, isLoading, isError, error, refetch } = useSubscriptionPlans();

  const isUnauthorized = isError && error instanceof AxiosError && error.response?.status === 401;

  const plans: PlanItem[] = (() => {
    const raw = plansData as Record<string, unknown> | undefined;
    if (!raw) return [];
    const data = raw.data as Record<string, unknown> | undefined;
    const list = data?.plans ?? raw.plans ?? raw.data ?? raw;
    return Array.isArray(list) ? (list as PlanItem[]) : [];
  })();

  const handleBuy = (plan: PlanItem) => {
    setSubscribeErrorMsg(null);
    navigate("/subscription/payment", { state: { plan } });
  };

  return (
    <>
      <Helmet>
        <title>
          {t("home.subscription.choosePlan")} | Mokafaat
        </title>
      </Helmet>

      <section className="min-h-screen bg-[#1D0843] pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={handleClose}
            className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} text-white hover:text-purple-300 flex items-center gap-2`}
          >
            <IoClose className="text-2xl" />
            <span>{isRTL ? "إغلاق" : "Close"}</span>
          </button>

          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-xl bg-white/10 mx-auto mb-4 flex items-center justify-center shadow-inner border border-white/10"
              aria-hidden
            >
              <TbPackage
                className="w-9 h-9 text-[#fd671a]"
                strokeWidth={1.75}
                aria-hidden
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("home.subscription.choosePlan")}
            </h1>
            <p className="text-white/80 text-sm max-w-xl mx-auto">
              {t("home.subscription.choosePlanDesc")}
            </p>
          </div>

          {isLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {isUnauthorized && (
            <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-6 text-center text-white space-y-4">
              <p>{t("home.subscription.loginRequiredToViewPlans")}</p>
              <button
                type="button"
                onClick={() => navigate("/login?returnUrl=/subscription/plans")}
                className="px-6 py-3 rounded-full bg-[#fd671a] text-white font-medium hover:bg-[#e55c18] transition-colors"
              >
                {t("home.subscription.goToLogin")}
              </button>
            </div>
          )}

          {isError && !isUnauthorized && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center text-white space-y-4">
              <p>{t("home.subscription.errorLoadingPlans")}</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-6 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors"
              >
                {t("home.subscription.tryAgain")}
              </button>
            </div>
          )}

          {subscribeErrorMsg && (
            <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-4 text-center text-white mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <p className="flex-1">{subscribeErrorMsg}</p>
              <button
                type="button"
                onClick={() => setSubscribeErrorMsg(null)}
                className="px-4 py-2 rounded-full border border-white/50 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {t("home.subscription.ok")}
              </button>
            </div>
          )}

          {!isLoading && !isError && plans.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => {
                const id = plan.id;
                const name = getPlanName(plan, !!isRTL);
                const price = Number(plan.price) ?? 0;
                const durationMonths = getDurationMonths(plan);
                const features = getPlanFeatures(plan, !!isRTL);
                return (
                  <div
                    key={String(id)}
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                      {t("home.subscription.subscriptionDuration")} {durationMonths} {durationMonths === 12 ? t("home.subscription.year") : t("home.subscription.months")}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-1">
                      {price}
                      <CurrencyIcon className="text-gray-800" size={24} />
                    </p>
                    {features.length > 0 && (
                      <ul className="space-y-2 mb-6 flex-1">
                        {(features.length ? features : [t("home.subscription.featurePlaceholder")]).slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                            <span className="w-4 h-4 rounded border border-gray-400 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      type="button"
                      onClick={() => handleBuy(plan)}
                      className="w-full py-3 rounded-full bg-[#fd671a] text-white font-medium hover:bg-[#e55c18] transition-colors"
                    >
                      {t("home.subscription.buy")}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && !isError && plans.length === 0 && (
            <p className="text-center text-white/80">
              {t("home.subscription.noPlansAvailable")}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default SubscriptionPlansPage;
