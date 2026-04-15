import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import {
  useCountries,
  useRegions,
  useCities,
  useSubscriptionPlans,
  useSubscribeForOther,
} from "@hooks/api/useMokafaatQueries";
import CountryCodeSelect from "@components/CountryCodeSelect";
import { toast } from "react-toastify";
import { useUserStore } from "@stores/userStore";
import { initMoyasarPayment } from "@utils/moyasar";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface PlanItem {
  id: number | string;
  name?: string;
  name_ar?: string;
  name_en?: string;
  price?: number | string;
  duration_months?: number;
  duration?: string;
}

function getPlanName(plan: PlanItem, rtl: boolean): string {
  return (
    (plan.name as string) ??
    (rtl ? plan.name_ar ?? plan.name_en : plan.name_en ?? plan.name_ar) ??
    ""
  );
}

function parsePlans(plansData: unknown): PlanItem[] {
  const raw = plansData as Record<string, unknown> | undefined;
  if (!raw) return [];
  const data = raw.data as Record<string, unknown> | undefined;
  const list = data?.plans ?? raw.plans ?? raw.data ?? raw;
  return Array.isArray(list) ? (list as PlanItem[]) : [];
}

const SubscribeForOtherPage: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const subscribeMutation = useSubscribeForOther();
  const { data: plansData, isLoading: plansLoading } = useSubscriptionPlans();
  const plans = useMemo(() => parsePlans(plansData), [plansData]);

  const { data: countries = [] } = useCountries();

  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [countryDial, setCountryDial] = useState("966");
  const [countryId, setCountryId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<string | number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [planId, setPlanId] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [useWallet, setUseWallet] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "card">("form");
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

  const { data: regions = [] } = useRegions(countryId);
  const effectiveRegionId =
    regionId != null ? regionId : (regions[0]?.id ?? null);
  const { data: cities = [] } = useCities(effectiveRegionId);

  useEffect(() => {
    if (!countries.length || countryId != null) return;
    const sa = countries.find(
      (c) =>
        String(c.code ?? "").toUpperCase() === "SA" ||
        String(c.name ?? "").includes("سعود") ||
        String(c.name ?? "").toLowerCase().includes("saudi"),
    );
    const first = sa ?? countries[0];
    if (first?.id != null) setCountryId(Number(first.id));
  }, [countries, countryId]);

  useEffect(() => {
    if (!regions.length) return;
    if (regionId !== null) return;
    setRegionId(regions[0].id);
  }, [regions, regionId]);

  useEffect(() => {
    if (step !== "card" || !moyasarConfigRef.current || moyasarInitedRef.current)
      return;
    const cfg = moyasarConfigRef.current;
    moyasarInitedRef.current = true;
    void initMoyasarPayment({
      ...cfg,
      elementSelector: ".mysr-form-subscribe-other",
      methods: ["creditcard"],
    }).catch(() => {
      moyasarInitedRef.current = false;
      setErrorMsg(t("subscribeForOther.moyasar_load_failed"));
      setStep("form");
    });
  }, [step, moyasarMountKey, t]);

  const selectedPlan = useMemo(
    () => plans.find((p) => String(p.id) === planId),
    [plans, planId],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmed = name.trim();
    const phone = phoneDigits.replace(/\D/g, "");
    if (!trimmed) {
      toast.error(t("subscribeForOther.err_name"));
      return;
    }
    if (phone.length < 8) {
      toast.error(t("subscribeForOther.err_phone"));
      return;
    }
    if (!planId) {
      toast.error(t("subscribeForOther.err_plan"));
      return;
    }
    const dial = countryDial.replace(/\D/g, "");
    const country_code = dial.startsWith("+") ? `+${dial.replace(/^\+/, "")}` : `+${dial}`;

    subscribeMutation.mutate(
      {
        name: trimmed,
        phone,
        country_code,
        plan_id: Number(planId),
        use_wallet: useWallet || undefined,
        ...(countryId != null && { country_id: countryId }),
        ...(cityId != null && { city_id: cityId }),
        gender,
      },
      {
        onSuccess: (res: unknown) => {
          const raw = res as Record<string, unknown> | undefined;
          const data = (raw?.data ?? raw) as Record<string, unknown> | undefined;
          if (!data) {
            toast.success(t("subscribeForOther.success"));
            navigate("/subscription/success", { replace: true });
            return;
          }
          if (data.status === false) {
            const msg = (data.msg as string) || t("subscribeForOther.failed");
            const errNum = data.errNum as string | undefined;
            if (
              errNum === "E006" ||
              (msg && String(msg).includes("فعال"))
            ) {
              setErrorMsg(t("subscribeForOther.err_active_subscription"));
              return;
            }
            setErrorMsg(msg);
            return;
          }
          const inner = (data.data ?? data) as Record<string, unknown> | undefined;
          const subscription =
            (inner?.subscription as Record<string, unknown> | undefined) ??
            (data.subscription as Record<string, unknown> | undefined);
          const paymentInfo =
            (subscription?.payment_info as Record<string, unknown> | undefined) ??
            (inner?.payment_info as Record<string, unknown> | undefined) ??
            (data.payment_info as Record<string, unknown> | undefined);
          const requiresPayment =
            (subscription?.requires_payment as boolean | undefined) ??
            (inner?.requires_payment as boolean | undefined) ??
            (data.requires_payment as boolean | undefined) ??
            !!paymentInfo;

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
              (selectedPlan ? getPlanName(selectedPlan, isRTL) : "") ||
              t("subscribeForOther.payment_title");
            const publishableKey =
              (paymentInfo.publishable_key as string | undefined) || "";
            const metadata =
              (paymentInfo.metadata as Record<string, unknown> | undefined) ||
              {};
            if (!publishableKey || !amountHalala) {
              setErrorMsg(t("subscribeForOther.payment_incomplete"));
              return;
            }
            const callbackUrl = `${window.location.origin}/orders/callback?${new URLSearchParams(
              {
                type: "subscription",
                plan_id: String(planId),
                from: "subscribe_for_other",
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
          if (!requiresPayment && !paymentInfo) {
            toast.success(t("subscribeForOther.success"));
            navigate("/subscription/success", { replace: true });
            return;
          }
          setErrorMsg(t("subscribeForOther.payment_unexpected"));
        },
        onError: (err: unknown) => {
          const ax = err as { response?: { data?: { message?: string; msg?: string } } };
          const msg =
            ax?.response?.data?.message ?? ax?.response?.data?.msg;
          setErrorMsg(msg ?? t("subscribeForOther.failed"));
        },
      },
    );
  };

  const planLabel = (p: PlanItem) => {
    const n = getPlanName(p, isRTL);
    const price = Number(p.price) || 0;
    return `${n} — ${price} ${t("subscribeForOther.currency_suffix")}`;
  };

  if (!user) {
    return (
      <Navigate
        to={`/login?returnUrl=${encodeURIComponent("/profile/subscribe-for-other")}`}
        replace
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("subscribeForOther.meta_title")} | Mokafaat</title>
      </Helmet>
      <div
        className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {t("subscribeForOther.title")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("subscribeForOther.subtitle")}
          </p>
        </div>

        {plansLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-w-xl">
            {errorMsg && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {errorMsg}
              </div>
            )}

            {step === "card" && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {t("subscribeForOther.complete_payment")}
                </p>
                <div
                  key={moyasarMountKey}
                  className="mysr-form-subscribe-other min-h-[120px]"
                />
                <button
                  type="button"
                  className="mt-3 text-sm text-[#440798] font-medium hover:underline"
                  onClick={() => {
                    setStep("form");
                    moyasarInitedRef.current = false;
                    setErrorMsg(null);
                  }}
                >
                  {t("subscribeForOther.back_to_form")}
                </button>
              </div>
            )}

            {step === "form" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    {t("subscribeForOther.label_name")}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("subscribeForOther.placeholder_name")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#440798] focus:outline-none focus:ring-2 focus:ring-[#440798]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    {t("subscribeForOther.label_phone")}
                  </label>
                  <div
                    className="flex gap-2 p-0"
                    style={{ direction: "ltr" }}
                  >
                    <div
                      className="w-24 flex items-center justify-center gap-2 bg-gray-50 border border-gray-300 rounded-full px-2 py-2 shrink-0 cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onPointerDown={(e) => {
                        const target = e.target as Element | null;
                        if (target?.closest?.('[data-testid="rfs-btn"]')) return;
                        const btn = e.currentTarget.querySelector(
                          '[data-testid="rfs-btn"]',
                        ) as HTMLButtonElement | null;
                        if (!btn) return;
                        if (btn.getAttribute("aria-expanded") === "true") return;
                        btn.focus();
                        btn.dispatchEvent(
                          new PointerEvent("pointerdown", { bubbles: true }),
                        );
                        btn.dispatchEvent(
                          new MouseEvent("mousedown", { bubbles: true }),
                        );
                        btn.dispatchEvent(
                          new MouseEvent("mouseup", { bubbles: true }),
                        );
                        btn.click();
                      }}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault();
                        const btn = e.currentTarget.querySelector(
                          '[data-testid="rfs-btn"]',
                        ) as HTMLButtonElement | null;
                        if (!btn) return;
                        if (btn.getAttribute("aria-expanded") === "true") return;
                        btn.focus();
                        btn.click();
                      }}
                    >
                      <CountryCodeSelect
                        value={countryDial}
                        onChange={setCountryDial}
                        className="w-auto"
                      />
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{`+${countryDial}`}</span>
                    </div>
                    <input
                      type="tel"
                      dir="ltr"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="tel"
                      className="text-start flex-1 border border-gray-300 px-4 py-2 text-base rounded-full focus:outline-none focus:ring-[#440798] focus:border-[#440798] min-h-[49px] bg-white"
                      placeholder={t("home.login.mobile_placeholder")}
                      value={phoneDigits}
                      onChange={(e) =>
                        setPhoneDigits(e.target.value.replace(/[^\d]/g, ""))
                      }
                      style={{ background: "transparent", direction: "ltr" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    {t("subscribeForOther.label_country")}
                  </label>
                  <select
                    value={countryId ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCountryId(v ? Number(v) : null);
                      setRegionId(null);
                      setCityId(null);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#440798] focus:outline-none"
                  >
                    {countries.map((c) => (
                      <option key={String(c.id)} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    {t("subscribeForOther.label_region")}
                  </label>
                  <select
                    value={regionId != null ? String(regionId) : ""}
                    onChange={(e) => {
                      setRegionId(e.target.value ? e.target.value : null);
                      setCityId(null);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#440798] focus:outline-none"
                    disabled={!regions.length}
                  >
                    {regions.map((r) => (
                      <option key={String(r.id)} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    {t("subscribeForOther.label_city")}
                  </label>
                  <select
                    value={cityId != null ? String(cityId) : ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCityId(v ? Number(v) : null);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#440798] focus:outline-none"
                    disabled={!cities.length}
                  >
                    <option value="">
                      {t("subscribeForOther.placeholder_city")}
                    </option>
                    {cities.map((c) => (
                      <option key={String(c.id)} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    {t("subscribeForOther.label_plan")}
                  </label>
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#440798] focus:outline-none"
                    required
                  >
                    <option value="">
                      {t("subscribeForOther.placeholder_plan")}
                    </option>
                    {plans.map((p) => (
                      <option key={String(p.id)} value={String(p.id)}>
                        {planLabel(p)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-gray-800 mb-2">
                    {t("subscribeForOther.label_gender")}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setGender("male")}
                      className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-colors ${
                        gender === "male"
                          ? "bg-[#fd671a] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {t("subscribeForOther.gender_male")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("female")}
                      className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-colors ${
                        gender === "female"
                          ? "bg-[#fd671a] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {t("subscribeForOther.gender_female")}
                    </button>
                  </div>
                </div>

                <label className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-800">
                    {t("subscribeForOther.label_wallet")}
                  </span>
                  <input
                    type="checkbox"
                    checked={useWallet}
                    onChange={(e) => setUseWallet(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-[#440798] focus:ring-[#440798]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full rounded-xl bg-[#fd671a] py-3.5 text-base font-bold text-white shadow-md hover:bg-[#e55c18] transition-colors disabled:opacity-60"
                >
                  {subscribeMutation.isPending
                    ? t("subscribeForOther.submitting")
                    : t("subscribeForOther.submit")}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default SubscribeForOtherPage;
