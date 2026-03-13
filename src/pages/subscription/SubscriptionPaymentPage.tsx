import React, { useState, useEffect, useRef } from "react";
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
import { initMoyasarPayment } from "@utils/moyasar";

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
  const name =
    (plan.name as string) ??
    (isRTL ? (plan.name_ar ?? plan.name_en) : (plan.name_en ?? plan.name_ar));
  return name || "";
}

const SubscriptionPaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const state = location.state as
    | { plan?: SubscriptionPlanState }
    | null
    | undefined;
  const plan = state?.plan;

  const [paymentMethod, setPaymentMethod] = useState<
    "online" | "cash" | "bank"
  >("online");
  const [useWallet, setUseWallet] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  /** methods = اختيار الطريقة فقط | card = نموذج ميسر بعد الضغط على إتمام الدفع */
  const [step, setStep] = useState<"methods" | "card">("methods");
  const moyasarConfigRef = useRef<{
    amountHalala: number;
    currency: string;
    description: string;
    publishableKey: string;
    callbackUrl: string;
    metadata: Record<string, unknown>;
  } | null>(null);
  const moyasarInitedRef = useRef(false);
  const [moyasarMountKey, setMoyasarMountKey] = useState(0);

  const subscribeMutation = useSubscribe();

  useEffect(() => {
    if (step !== "card" || !moyasarConfigRef.current || moyasarInitedRef.current)
      return;
    const cfg = moyasarConfigRef.current;
    moyasarInitedRef.current = true;
    void initMoyasarPayment({
      ...cfg,
      elementSelector: ".mysr-form-subscription",
      methods: ["creditcard"],
    }).catch(() => {
      moyasarInitedRef.current = false;
      setErrorMsg(
        t("home.subscription.paymentFailed") +
          " " +
          (isRTL
            ? "(تعذر تحميل بوابة الدفع.)"
            : "(Failed to load payment gateway.)"),
      );
      setStep("methods");
    });
  }, [step, moyasarMountKey, t, isRTL]);

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
          const data = (response?.data ?? res) as
            | Record<string, unknown>
            | undefined;
          if (!data) {
            navigate("/subscription/success", { replace: true });
            return;
          }
          if (data.status === false) {
            const msg =
              (data.msg as string) || t("home.subscription.paymentFailed");
            const errNum = data.errNum as string | undefined;
            if (
              errNum === "E006" ||
              (msg && String(msg).includes("اشتراك فعال"))
            ) {
              setErrorMsg(t("home.subscription.alreadyHaveActiveSubscription"));
              return;
            }
            setErrorMsg(msg);
            return;
          }
          const inner = (data.data ?? data) as
            | Record<string, unknown>
            | undefined;
          const subscription =
            (inner?.subscription as Record<string, unknown> | undefined) ??
            (data.subscription as Record<string, unknown> | undefined);
          const paymentInfo =
            (subscription?.payment_info as
              | Record<string, unknown>
              | undefined) ??
            (inner?.payment_info as Record<string, unknown> | undefined) ??
            (data.payment_info as Record<string, unknown> | undefined);
          const requiresPayment =
            (subscription?.requires_payment as boolean | undefined) ??
            (inner?.requires_payment as boolean | undefined) ??
            (data.requires_payment as boolean | undefined) ??
            // إذا لم يرسِل الباكند requires_payment لكن أرسل payment_info نفترض أن الدفع مطلوب
            (!!paymentInfo || false);

          // إذا أرسل الباكند معلومات دفع ويتطلب دفع، نستخدم ميسر دائماً لإكمال الدفع
          if (paymentInfo && requiresPayment) {
            const amountHalalaRaw =
              (paymentInfo.amount_halala as number | undefined) ??
              (typeof paymentInfo.amount === "number"
                ? (paymentInfo.amount as number) * 100
                : undefined);
            const amountHalala = Number.isFinite(amountHalalaRaw as number)
              ? (amountHalalaRaw as number)
              : undefined;

            const currency =
              (paymentInfo.currency as string | undefined) || "SAR";
            const description =
              (paymentInfo.description as string | undefined) ||
              planName ||
              t("home.subscription.paymentTitle");
            const publishableKey =
              (paymentInfo.publishable_key as string | undefined) || "";
            const metadata =
              (paymentInfo.metadata as Record<string, unknown> | undefined) ||
              {};

            if (!publishableKey || !amountHalala) {
              setErrorMsg(
                t("home.subscription.paymentFailed") +
                  " " +
                  (isRTL
                    ? "(بيانات الدفع غير مكتملة. تواصل مع الدعم.)"
                    : "(Incomplete payment information. Please contact support.)"),
              );
              return;
            }

            const callbackUrl = `${window.location.origin}/orders/callback?${new URLSearchParams(
              {
                type: "subscription",
                plan_id: String(plan.id),
              },
            ).toString()}`;

            moyasarConfigRef.current = {
              amountHalala,
              currency,
              description,
              publishableKey,
              callbackUrl,
              metadata,
            };
            moyasarInitedRef.current = false;
            setMoyasarMountKey((k) => k + 1);
            setStep("card");
            return;
          }

          // إذا كان الاشتراك لا يتطلب دفعاً (خطة مجانية أو تم تغطية المبلغ من المحفظة)
          // ولا توجد بيانات payment_info لبوابة الدفع، نذهب مباشرة لصفحة النجاح
          if (!requiresPayment && !paymentInfo) {
            navigate("/subscription/success", { replace: true });
            return;
          }

          // حالة غير متوقعة: يتطلب دفعاً لكن لم نَستخرج payment_info
          setErrorMsg(
            t("home.subscription.paymentFailed") +
              " " +
              (isRTL
                ? "(تعذر تهيئة بوابة الدفع. تواصل مع الدعم.)"
                : "(Could not initialize payment gateway. Please contact support.)"),
          );
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response?.status === 401) {
            setErrorMsg(t("home.subscription.loginRequiredToViewPlans"));
            return;
          }
          setErrorMsg(t("home.subscription.paymentFailed"));
        },
      },
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
  const durationMonths =
    plan.duration_months ??
    (plan.duration === "yearly" || plan.duration === "annual" ? 12 : 1);

  return (
    <>
      <Helmet>
        <title>{t("home.subscription.paymentTitle")} | Mokafaat</title>
      </Helmet>

      <section className="min-h-screen bg-[#1D0843] pt-24 pb-12 px-4 relative">
        <div className="max-w-lg mx-auto">
          {step === "methods" && (
            <>
              <button
                type="button"
                onClick={() => navigate("/subscription/plans")}
                className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} text-white hover:text-purple-300 flex items-center gap-2 z-10`}
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

              <div className="bg-white/10 rounded-2xl p-6 mb-6 text-white">
                <h2 className="text-lg font-bold mb-1">{planName}</h2>
                <p className="text-white/80 text-sm mb-3">
                  {durationMonths}{" "}
                  {durationMonths === 12
                    ? t("home.subscription.year")
                    : t("home.subscription.months")}
                </p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  {price}
                  <CurrencyIcon className="text-white" size={22} />
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-white font-semibold mb-4 text-center">
                  {t("home.subscription.choosePaymentMethod")}
                </h3>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 mb-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={!useWallet && paymentMethod === "online"}
                    onChange={() => {
                      setUseWallet(false);
                      setPaymentMethod("online");
                    }}
                    className="w-4 h-4 text-[#fd671a]"
                  />
                  <IoCardOutline className="w-6 h-6 text-white shrink-0" />
                  <span className="text-white">
                    {t("home.subscription.paymentOnline")}
                  </span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 mb-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={!useWallet && paymentMethod === "cash"}
                    onChange={() => {
                      setUseWallet(false);
                      setPaymentMethod("cash");
                    }}
                    className="w-4 h-4 text-[#fd671a]"
                  />
                  <span className="text-white">
                    {t("home.subscription.paymentCash")}
                  </span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 mb-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={!useWallet && paymentMethod === "bank"}
                    onChange={() => {
                      setUseWallet(false);
                      setPaymentMethod("bank");
                    }}
                    className="w-4 h-4 text-[#fd671a]"
                  />
                  <span className="text-white">
                    {t("home.subscription.paymentBank")}
                  </span>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/20 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={useWallet}
                    onChange={() => {
                      setUseWallet(true);
                      setPaymentMethod("online");
                    }}
                    className="w-4 h-4 text-[#fd671a]"
                  />
                  <IoWalletOutline className="w-6 h-6 text-white shrink-0" />
                  <span className="text-white">
                    {t("home.subscription.paymentWallet")}
                  </span>
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
                  t("home.subscription.loading")
                ) : (
                  t("home.subscription.confirmPayment")
                )}
              </button>
            </>
          )}

          {step === "card" && (
            <div className="flex flex-col min-h-[60vh]">
              <button
                type="button"
                onClick={() => {
                  moyasarInitedRef.current = false;
                  moyasarConfigRef.current = null;
                  setStep("methods");
                  setMoyasarMountKey((k) => k + 1);
                }}
                className={`self-start mb-6 flex items-center gap-2 text-white hover:text-purple-300 ${
                  isRTL ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <FiArrowLeft
                  className={`text-2xl ${isRTL ? "" : "rotate-180"}`}
                />
                <span className="font-medium">
                  {isRTL ? "رجوع" : "Back"}
                </span>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
                {isRTL ? "إتمام الدفع" : "Complete payment"}
              </h1>
              {errorMsg && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-white mb-4 text-sm">
                  {errorMsg}
                </div>
              )}
              <div
                key={moyasarMountKey}
                className="mysr-form-subscription rounded-2xl overflow-hidden bg-white/5 p-2"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SubscriptionPaymentPage;
