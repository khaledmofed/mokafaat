import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useTranslation } from "react-i18next";
import { AkaratCircle, Splash, LogoLight, Soudi } from "@assets";
import { IoMailOutline } from "react-icons/io5";
import { useCountries, useRegions, useCities } from "@hooks/api/useMokafaatQueries";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    sendOtp,
    verifyOtp,
    completeRegistration,
    loading,
    error,
    otpSent,
    isAuthenticated,
    needsProfileCompletion,
    user,
  } = useUserStore();
  const [searchParams] = useSearchParams();

  const [phone, setPhone] = useState("");
  const [countryCode] = useState("966");
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    first_name: "",
    last_name: "",
    id_number: "",
    email: "",
    city_id: "" as string,
    gender: "male" as "male" | "female",
    termsAccepted: false,
  });
  /** معرّف المنطقة لجلب المدن — null حتى التحميل (يدعم id === 0) */
  const [regionId, setRegionId] = useState<string | number | null>(null);
  /** أخطاء من complete-profile (مثل E001 بريد مستخدم) — عرض تحت الحقل بدل توست */
  const [profileFieldErrors, setProfileFieldErrors] = useState<{
    email?: string;
  }>({});

  const { data: countries = [] } = useCountries();
  const saudiCountryId = useMemo(() => {
    const sa = countries.find(
      (c) =>
        String(c.code ?? "").toUpperCase() === "SA" ||
        String(c.name ?? "").includes("سعود") ||
        String(c.name ?? "").toLowerCase().includes("saudi"),
    );
    return sa?.id ?? countries[0]?.id ?? null;
  }, [countries]);

  const { data: regions = [] } = useRegions(saudiCountryId);
  const effectiveRegionId =
    regionId != null ? regionId : (regions[0]?.id ?? null);
  const { data: cities = [] } = useCities(effectiveRegionId);

  useEffect(() => {
    if (!regions.length) return;
    if (regionId !== null) return;
    setRegionId(regions[0].id);
  }, [regions, regionId]);

  const codeRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((x) => x - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  // بعد تسجيل الدخول و verify-otp مع is_profile_completed: false → فتح فورم الإكمال مباشرة
  useEffect(() => {
    const fromLogin =
      searchParams.get("completeProfile") === "1" || needsProfileCompletion;
    if (fromLogin && isAuthenticated && user?.phone) {
      setShowRegistrationForm(true);
      if (!phone) setPhone(String(user.phone).replace(/\D/g, ""));
    }
  }, [
    searchParams,
    isAuthenticated,
    needsProfileCompletion,
    user?.phone,
    phone,
  ]);

  const handleCodeChange = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    if (val && idx < 3) codeRefs[idx + 1].current?.focus();
    if (!val && idx > 0) codeRefs[idx - 1].current?.focus();
  };

  const handleCodeKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      codeRefs[idx - 1].current?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) codeRefs[idx - 1].current?.focus();
    if (e.key === "ArrowRight" && idx < 3) codeRefs[idx + 1].current?.focus();
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    try {
      const res = await sendOtp(phone.trim(), countryCode);
      if (res.status) {
        setToast({ type: "success", message: res.msg });
        setTimer(45);
        setCode(["", "", "", ""]);
      } else {
        setToast({ type: "error", message: res.msg });
      }
    } catch {
      setToast({ type: "error", message: "خطأ في إرسال رمز التحقق" });
    }
  };

  const handleVerifyOtp = async () => {
    const otp = code.join("");
    if (otp.length === 4) {
      try {
        const res = await verifyOtp(phone, otp, countryCode);
        if (res.status) {
          setToast({ type: "success", message: res.msg });
          if (res.data?.needs_profile_completion) {
            setShowRegistrationForm(true);
          } else {
            navigate("/");
          }
        } else {
          setToast({ type: "error", message: res.msg });
        }
      } catch {
        setToast({ type: "error", message: "رمز التحقق غير صحيح" });
      }
    }
  };

  /** محاذاة للعربي: النص والـ placeholder لليمين */
  const inputClass =
    "block w-full px-4 h-[49px] py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#440798] focus:border-[#440798] text-right placeholder:text-right";

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileFieldErrors({});
    if (
      !registrationData.first_name.trim() ||
      !registrationData.last_name.trim() ||
      !registrationData.id_number.trim() ||
      !registrationData.email.trim() ||
      !registrationData.city_id.trim() ||
      !registrationData.termsAccepted
    ) {
      setToast({
        type: "error",
        message: "يرجى ملء جميع الحقول المطلوبة والموافقة على الشروط",
      });
      return;
    }

    try {
      const res = await completeRegistration({
        first_name: registrationData.first_name.trim(),
        last_name: registrationData.last_name.trim(),
        id_number: registrationData.id_number.trim(),
        phone:
          phone.replace(/\D/g, "") ||
          String(user?.phone ?? "").replace(/\D/g, "") ||
          phone.trim(),
        country_code: countryCode,
        email: registrationData.email.trim(),
        city_id: registrationData.city_id,
        gender: registrationData.gender,
      });
      if (res.status) {
        setToast({ type: "success", message: res.msg });
        navigate("/");
        return;
      }
      // E001: بريد مستخدم — فاليديشن على الحقل فقط (بدون توست أحمر عام)
      if (res.errNum === "E001") {
        setProfileFieldErrors({
          email: res.msg || "البريد الإلكتروني مستخدم مسبقاً",
        });
        return;
      }
      setToast({ type: "error", message: res.msg });
    } catch {
      setToast({ type: "error", message: "خطأ في إكمال التسجيل" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md flex justify-center pointer-events-none">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded shadow-lg min-w-[300px] pointer-events-auto border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                toast.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <span className="text-white text-sm font-bold">
                {toast.type === "success" ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold ${
                  toast.type === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {toast.type === "success"
                  ? t("home.common.success")
                  : t("home.common.error")}
              </span>
              <span className="text-gray-700">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex-1 flex flex-col justify-end items-center p-12 relative hidden md:flex"
        style={{
          backgroundImage: `url(${Splash})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
        }}
      >
        <div className="flex flex-col items-center max-w-lg w-full">
          <div className="mb-20">
            <img
              src={LogoLight}
              alt="Mukafaat Logo"
              className="w-auto h-20 mb-10 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-white p-6 md:p-8 overflow-y-auto">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center pb-8">
          <img
            src={AkaratCircle}
            alt="Mukafaat"
            className={`w-auto cursor-pointer shrink-0 ${
              showRegistrationForm
                ? "h-24 sm:h-28 md:h-32 mb-1"
                : "h-40 md:h-60 mb-2"
            }`}
            onClick={() => navigate("/")}
          />

          {showRegistrationForm ? (
            <>
              <h2 className="text-lg sm:text-xl font-bold text-[#440798] mb-0.5">
                إكمال التسجيل
              </h2>
              <p className="text-gray-600 mb-4 text-center text-xs sm:text-sm max-w-sm px-1 leading-snug">
                أدخل بياناتك لإتمام الحساب — نفس البيانات المرسلة للخادم
              </p>
              <form
                dir="rtl"
                lang="ar"
                className="w-full flex flex-col gap-4"
                onSubmit={handleCompleteRegistration}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 gap-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأول <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="اكتب الاسم"
                      value={registrationData.first_name}
                      onChange={(e) =>
                        setRegistrationData((p) => ({
                          ...p,
                          first_name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اسم العائلة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="اسم العائلة"
                      value={registrationData.last_name}
                      onChange={(e) =>
                        setRegistrationData((p) => ({
                          ...p,
                          last_name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 gap-x-4"
                  dir="rtl"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الإثبات <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="رقم الهوية / الإقامة"
                      value={registrationData.id_number}
                      onChange={(e) =>
                        setRegistrationData((p) => ({
                          ...p,
                          id_number: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <IoMailOutline className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        className={`${inputClass} pr-10 ${profileFieldErrors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                        placeholder="example@email.com"
                        value={registrationData.email}
                        onChange={(e) => {
                          setRegistrationData((p) => ({
                            ...p,
                            email: e.target.value,
                          }));
                          if (profileFieldErrors.email) {
                            setProfileFieldErrors((p) => ({
                              ...p,
                              email: undefined,
                            }));
                          }
                        }}
                        required
                        aria-invalid={Boolean(profileFieldErrors.email)}
                        aria-describedby={
                          profileFieldErrors.email
                            ? "complete-profile-email-error"
                            : undefined
                        }
                      />
                    </div>
                    {profileFieldErrors.email && (
                      <p
                        id="complete-profile-email-error"
                        className="text-sm text-red-600 mt-1 text-right"
                        role="alert"
                      >
                        {profileFieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {regions.length > 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                      المنطقة
                    </label>
                    <select
                      className={inputClass}
                      value={regionId != null ? String(regionId) : ""}
                      onChange={(e) => {
                        setRegionId(
                          e.target.value === "" ? null : e.target.value,
                        );
                        setRegistrationData((p) => ({ ...p, city_id: "" }));
                      }}
                    >
                      {regions.map((r) => (
                        <option key={String(r.id)} value={String(r.id)}>
                          {r.name ?? r.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    المدينة <span className="text-red-500">*</span>
                    <span className="text-gray-400 font-normal text-xs mr-1">
                      (اختر من القائمة — يُرسل معرّف المدينة للخادم)
                    </span>
                  </label>
                  <select
                    className={inputClass}
                    value={registrationData.city_id}
                    onChange={(e) =>
                      setRegistrationData((p) => ({
                        ...p,
                        city_id: e.target.value,
                      }))
                    }
                    required
                    disabled={!cities.length}
                  >
                    <option value="">
                      {cities.length
                        ? "اختر المدينة"
                        : "جاري تحميل المدن…"}
                    </option>
                    {cities.map((c) => (
                      <option key={String(c.id)} value={String(c.id)}>
                        {c.name ?? c.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <span className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    الجنس
                  </span>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setRegistrationData((p) => ({ ...p, gender: "male" }))
                      }
                      className={`h-11 rounded-2xl font-medium transition-colors w-full min-w-0 whitespace-nowrap ${
                        registrationData.gender === "male"
                          ? "bg-[#FF702A] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      ذكر
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRegistrationData((p) => ({ ...p, gender: "female" }))
                      }
                      className={`h-11 rounded-2xl font-medium transition-colors w-full min-w-0 whitespace-nowrap ${
                        registrationData.gender === "female"
                          ? "bg-[#FF702A] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      أنثى
                    </button>
                  </div>
                </div>

                <label
                  className="flex flex-row items-center gap-3 cursor-pointer select-none w-full py-1"
                  dir="rtl"
                >
                  <input
                    type="checkbox"
                    className="shrink-0 rounded border-gray-300 w-[18px] h-[18px] accent-[#FF702A]"
                    checked={registrationData.termsAccepted}
                    onChange={(e) =>
                      setRegistrationData((p) => ({
                        ...p,
                        termsAccepted: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm text-gray-800 text-right leading-snug flex-1">
                    أوافق على{" "}
                    <span className="text-[#440798] font-medium">
                      الشروط والسياسات
                    </span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full hover:bg-[#E55A1F] transition-all disabled:opacity-60"
                >
                  {loading ? "جاري الحفظ..." : "حفظ"}
                </button>
              </form>
            </>
          ) : !otpSent ? (
            <>
              <h2 className="text-2xl font-bold text-[#440798] mb-2">
                إنشاء حساب جديد
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                أدخل رقم جوالك لإنشاء حساب جديد
              </p>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSendOtp}
              >
                <label className="text-gray-700 text-base font-medium">
                  رقم الجوال
                </label>
                <div
                  className={`flex gap-2 ${error ? "border border-red-400 rounded-full p-1" : ""}`}
                >
                  <div className="w-24 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-full px-2 py-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <img
                        src={Soudi}
                        alt=""
                        className="w-8 h-8 object-cover rounded-sm"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        +966
                      </span>
                    </div>
                  </div>
                  <input
                    type="tel"
                    className={`text-end flex-1 border border-gray-300 px-4 py-2 text-base rounded-full focus:outline-none focus:ring-[#440798] focus:border-[#440798] min-h-[49px] ${
                      error ? "text-red-500 placeholder-red-400" : ""
                    }`}
                    placeholder={error ? "رقم الجوال مطلوب" : "أدخل رقم الجوال"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {error && <p className="text-md text-red-500 mt-1">{error}</p>}
                <button
                  type="submit"
                  className="mt-1 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full hover:bg-[#E55A1F] transition-all disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "جاري الإرسال..." : "إنشاء حساب"}
                </button>
              </form>
            </>
          ) : (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-[#440798] mb-2">
                أدخل رمز التحقق
              </h2>
              <p className="mb-6 text-center text-gray-600">
                تم إرسال رمز التحقق إلى رقم {phone}
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {code.map((v, i) => (
                  <input
                    key={i}
                    ref={codeRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-14 h-14 text-2xl text-center border border-gray-300 rounded-md focus:border-[#440798] focus:ring-2 focus:ring-[#440798] outline-none"
                    value={v}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                  />
                ))}
              </div>
              <div className="mb-6 text-center text-gray-500">
                لم تستلم الرمز؟{" "}
                <button
                  type="button"
                  className="text-[#440798] underline disabled:text-gray-400"
                  disabled={timer > 0 || loading}
                  onClick={() => {
                    sendOtp(phone.trim(), countryCode);
                    setTimer(45);
                  }}
                >
                  إعادة إرسال
                  {timer > 0 ? ` (${String(timer).padStart(2, "0")})` : ""}
                </button>
              </div>
              <button
                type="button"
                className="mt-1 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full hover:bg-[#E55A1F] transition-all disabled:opacity-60"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "جاري التحقق..." : "تحقق من الرمز"}
              </button>
              {error && <p className="text-md text-red-500 mt-2">{error}</p>}
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <span>لديك حساب بالفعل؟</span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mr-2 text-[#440798] font-bold hover:underline"
            >
              تسجيل الدخول الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
