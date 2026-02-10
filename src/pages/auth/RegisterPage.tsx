import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useTranslation } from "react-i18next";
import { AkaratCircle, Splash, LogoLight, Soudi } from "@assets";
import { IoPersonOutline, IoMailOutline } from "react-icons/io5";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { sendOtp, verifyOtp, completeRegistration, loading, error, otpSent } =
    useUserStore();

  const [phone, setPhone] = useState("");
  const [countryCode] = useState("966");
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45);
  // const [, setIsRegisterMode] = useState(true);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
  });

  const codeRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Timer effect
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  // Toast effect
  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

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
    e: React.KeyboardEvent<HTMLInputElement>
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
    } catch (err: unknown) {
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
          // إذا البروفايل غير مكتمل → اعرض نموذج إكمال التسجيل، وإلا → الرئيسية
          if (res.data?.is_profile_completed === false) {
            setShowRegistrationForm(true);
          } else {
            navigate("/");
          }
        } else {
          setToast({ type: "error", message: res.msg });
        }
      } catch (err: unknown) {
        setToast({ type: "error", message: "رمز التحقق غير صحيح" });
      }
    }
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.name.trim() || !registrationData.email.trim()) {
      setToast({ type: "error", message: "يرجى ملء جميع الحقول المطلوبة" });
      return;
    }

    try {
      const res = await completeRegistration(registrationData);
      if (res.status) {
        setToast({ type: "success", message: res.msg });
        navigate("/");
      } else {
        setToast({ type: "error", message: res.msg });
      }
    } catch (err: unknown) {
      setToast({ type: "error", message: "خطأ في إكمال التسجيل" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Toast Message */}
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

      {/* Left: Welcome Section */}
      <div
        className="flex-1 flex flex-col justify-end items-center p-12 relative"
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

      {/* Right: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <img
            src={AkaratCircle}
            alt="Mukafaat Logo"
            className="w-auto h-60 mb-0 cursor-pointer transition-opacity"
            onClick={() => navigate("/")}
          />

          {showRegistrationForm ? (
            <>
              <h2 className="text-2xl font-bold text-[#440798] mb-2">
                إكمال التسجيل
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                أدخل بياناتك الشخصية لإكمال التسجيل
              </p>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleCompleteRegistration}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <IoPersonOutline className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="block w-full px-4 h-[49px] py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-[#440798] focus:border-[#440798]"
                      placeholder="أدخل اسمك الكامل"
                      value={registrationData.name}
                      onChange={(e) =>
                        setRegistrationData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <IoMailOutline className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-4  h-[49px] py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-[#440798] focus:border-[#440798]"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={registrationData.email}
                      onChange={(e) =>
                        setRegistrationData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full flex items-center justify-center border-none shadow-none hover:bg-[#E55A1F] transition-all"
                >
                  {loading ? "جاري الحفظ..." : "إكمال التسجيل"}
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
                  className={`flex gap-2 ${
                    error ? "border border-red-400" : ""
                  } p-0`}
                >
                  <div className="w-24 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-full px-2 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={Soudi}
                        alt="Saudi Arabia Flag"
                        className="w-8 h-8 object-cover rounded-sm"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        +966
                      </span>
                    </div>
                  </div>
                  <input
                    type="tel"
                    className={`text-end flex-1 border border-gray-300 px-4 py-2 text-base rounded-full focus:outline-none focus:ring-[#440798] focus:border-[#440798] ${
                      error ? "text-red-500 placeholder-red-400" : ""
                    }`}
                    placeholder={error ? "رقم الجوال مطلوب" : "أدخل رقم الجوال"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ background: "transparent" }}
                  />
                </div>
                {error && <p className="text-md text-red-500 mt-1">{error}</p>}
                <button
                  type="submit"
                  className="mt-1 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full flex items-center justify-center border-none shadow-none hover:bg-[#E55A1F] transition-all"
                  disabled={loading}
                >
                  {loading ? "جاري الإرسال..." : "إنشاء حساب"}
                </button>
              </form>
            </>
          ) : (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-[#440798] mb-2 font-sans">
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
                    className="w-14 h-14 text-2xl text-center border border-gray-300 bg-white focus:border-[#440798] focus:ring-2 focus:ring-[#440798] outline-none rounded-md"
                    value={v}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                  />
                ))}
              </div>
              <div className="mb-6 text-center text-gray-500">
                لم تستلم الرمز؟{" "}
                <button
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
                className="mt-1 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full flex items-center justify-center border-none shadow-none hover:bg-[#E55A1F] transition-all"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "جاري التحقق..." : "تحقق من الرمز"}
              </button>
              {error && <p className="text-md text-red-500 mt-2">{error}</p>}
            </div>
          )}
          <div className="mt-6 text-center">
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
