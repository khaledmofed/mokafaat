import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import { FiArrowLeft } from "react-icons/fi";
import { IoWalletOutline, IoCardOutline } from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import { useSubscribe } from "@hooks/api/useMokafaatQueries";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { AxiosError } from "axios";

export interface SubscriptionPlanState {
  id: number | string;
  name?: string;
  name_ar?: string;
  name_en?: string;
  price?: number | string;
  duration?: string;
  duration_months?: number;
  duration_days?: number;
  features?: string[] | { ar?: string; en?: string }[];
}

function getPlanName(plan: SubscriptionPlanState, isRTL: boolean): string {
  const name = (plan.name as string) ?? (isRTL ? plan.name_ar ?? plan.name_en : plan.name_en ?? plan.name_ar);
  return name || "";
}

const SubscriptionPaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const state = location.state as { plan?: SubscriptionPlanState } | null | undefined;
  const plan = state?.plan;

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash" | "bank">("online");
  const [useWallet, setUseWallet] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subscribeMutation = useSubscribe();

  useEffect(() => {
    if (!plan?.id) navigate("/subscription/plans", { replace: true });
  }, [plan, navigate]);

  const handleConfirmPayment = () => {
    if (!plan?.id) return;
    setErrorMsg(null);
    subscribeMutation.mutate(
      {
        planId: plan.id,
        paymentMethod: useWallet ? undefined : paymentMethod,
        useWallet: useWallet || undefined,
      },
      {
        onSuccess: (res: unknown) => {
          const response = res as { data?: unknown };
          const data = (response?.data ?? res) as Record<string, unknown> | undefined;
          if (!data) {
            navigate("/subscription/success", { replace: true });
            return;
          }
          if (data.status === false) {
            const msg = (data.msg as string) || t("home.subscription.paymentFailed");
            const errNum = data.errNum as string | undefined;
            if (errNum === "E006" || (msg && String(msg).includes("اشتراك فعال"))) {
              setErrorMsg(t("home.subscription.alreadyHaveActiveSubscription"));
              return;
            }
            setErrorMsg(msg);
            return;
          }
          const inner = (data.data ?? data) as Record<string, unknown> | undefined;
          const deep = (inner?.data ?? inner) as Record<string, unknown> | undefined;
          const paymentUrl = (
            data.payment_url ?? data.redirect_url ?? data.url ?? data.checkout_url ?? data.link
            ?? inner?.payment_url ?? inner?.redirect_url ?? inner?.url ?? inner?.checkout_url ?? inner?.link
            ?? deep?.payment_url ?? deep?.redirect_url ?? deep?.url ?? deep?.checkout_url ?? deep?.link
          ) as string | undefined;
          if (paymentUrl && typeof paymentUrl === "string") {
            window.location.href = paymentUrl;
            return;
          }
          const paymentMethodForRedirect = useWallet ? "wallet" : paymentMethod;
          if (paymentMethodForRedirect === "online") {
            setErrorMsg(t("home.subscription.paymentFailed") + " " + (isRTL ? "(لم يُرجَع رابط الدفع. جرّب مرة أخرى أو تواصل مع الدعم.)" : "(Payment link was not returned. Try again or contact support.)"));
            return;
          }
          navigate("/subscription/success", { replace: true });
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response?.status === 401) {
            setErrorMsg(t("home.subscription.loginRequiredToViewPlans"));
            return;
          }
          setErrorMsg(t("home.subscription.paymentFailed"));
        },
      }
    );
  };

  if (!plan?.id) {
    return (
      <div className="min-h-screen bg-[#1D0843] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const planName = getPlanName(plan, !!isRTL);
  const price = Number(plan.price) ?? 0;
  const durationMonths = plan.duration_months ?? (plan.duration === "yearly" || plan.duration === "annual" ? 12 : 1);

  return (
    <>
      <Helmet>
        <title>{t("home.subscription.paymentTitle")} | Mokafaat</title>
      </Helmet>

      <section className="min-h-screen bg-[#1D0843] pt-24 pb-12 px-4">
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => navigate("/subscription/plans")}
            className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} text-white hover:text-purple-300 flex items-center gap-2`}
          >
            <FiArrowLeft className="text-2xl" />
            <span>{isRTL ? "العودة" : "Back"}</span>
          </button>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {t("home.subscription.paymentTitle")}
          </h1>
          <p className="text-white/80 text-sm text-center mb-8">
            {t("home.subscription.paymentDesc")}
          </p>

          {/* Plan summary */}
          <div className="bg-white/10 rounded-2xl p-6 mb-6 text-white">
            <h2 className="text-lg font-bold mb-1">{planName}</h2>
            <p className="text-white/80 text-sm mb-3">
              {durationMonths} {durationMonths === 12 ? t("home.subscription.year") : t("home.subscription.months")}
            </p>
            <p className="text-2xl font-bold flex items-center gap-2">
              {price}
              <CurrencyIcon className="text-white" size={22} />
            </p>
          </div>

          {/* Payment method */}
          <div className="bg-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-4">{t("home.subscription.choosePaymentMethod")}</h3>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 mb-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={!useWallet && paymentMethod === "online"}
                onChange={() => { setUseWallet(false); setPaymentMethod("online"); }}
                className="w-4 h-4 text-[#fd671a]"
              />
              <IoCardOutline className="w-6 h-6 text-white" />
              <span className="text-white">{t("home.subscription.paymentOnline")}</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 mb-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={!useWallet && paymentMethod === "cash"}
                onChange={() => { setUseWallet(false); setPaymentMethod("cash"); }}
                className="w-4 h-4 text-[#fd671a]"
              />
              <span className="text-white">{t("home.subscription.paymentCash")}</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 mb-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={!useWallet && paymentMethod === "bank"}
                onChange={() => { setUseWallet(false); setPaymentMethod("bank"); }}
                className="w-4 h-4 text-[#fd671a]"
              />
              <span className="text-white">{t("home.subscription.paymentBank")}</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={useWallet}
                onChange={() => { setUseWallet(true); setPaymentMethod("online"); }}
                className="w-4 h-4 text-[#fd671a]"
              />
              <IoWalletOutline className="w-6 h-6 text-white" />
              <span className="text-white">{t("home.subscription.paymentWallet")}</span>
            </label>
          </div>

          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-white mb-6 text-sm">
              {errorMsg}
            </div>
          )}

          <button
            type="button"
            disabled={subscribeMutation.isPending}
            onClick={handleConfirmPayment}
            className="w-full py-4 rounded-full bg-[#fd671a] text-white font-bold text-lg hover:bg-[#e55c18] disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
          >
            {subscribeMutation.isPending ? (
              <>
                <LoadingSpinner />
                <span>{t("home.subscription.loading")}</span>
              </>
            ) : (
              t("home.subscription.confirmPayment")
            )}
          </button>
        </div>
      </section>
    </>
  );
};

export default SubscriptionPaymentPage;
