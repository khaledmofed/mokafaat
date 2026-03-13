import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useTranslation } from "react-i18next";
import { AkaratCircle, Splash, LogoLight, Soudi } from "@assets";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "";
  const safeReturnUrl =
    returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//")
      ? returnUrl
      : "/";
  const { t } = useTranslation();
  const { sendOtp, verifyOtp, loading, error, otpSent } = useUserStore();

  const [phone, setPhone] = useState("");
  const [countryCode] = useState("966");
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
    } catch (err: unknown) {
      setToast({ type: "error", message: t("home.login.error_sending_otp") });
    }
  };

  const handleVerifyOtp = async () => {
    const otp = code.join("");
    if (otp.length === 4) {
      try {
        const res = await verifyOtp(phone, otp, countryCode);
        if (res.status) {
          setToast({ type: "success", message: res.msg });
          // is_profile_completed === false → فورم إكمال التسجيل (مع التوكن محفوظ)
          if (res.data?.needs_profile_completion) {
            navigate("/register?completeProfile=1");
          } else {
            navigate(safeReturnUrl);
          }
        } else {
          setToast({ type: "error", message: res.msg });
        }
      } catch (err: unknown) {
        setToast({ type: "error", message: t("home.login.invalid_otp") });
      }
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

      {/* Right: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <img
            src={AkaratCircle}
            alt="Mukafaat Logo"
            className="w-auto h-60 mb-0 cursor-pointer transition-opacity"
            onClick={() => navigate("/")}
          />

          {!otpSent ? (
            <>
              <h2 className="text-2xl font-bold text-[#440798] mb-2">
                {isRegisterMode
                  ? t("home.login.register_title")
                  : t("home.login.login_title")}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                {isRegisterMode
                  ? t("home.login.register_desc")
                  : t("home.login.login_desc")}
              </p>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSendOtp}
              >
                <label className="text-gray-700 text-base font-medium">
                  {t("home.login.mobile_label")}
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
                    placeholder={
                      error
                        ? t("home.login.mobile_error_placeholder")
                        : t("home.login.mobile_placeholder")
                    }
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
                  {loading
                    ? t("home.login.sending")
                    : isRegisterMode
                      ? t("home.login.register_button")
                      : t("home.login.login_button")}
                </button>
              </form>
            </>
          ) : (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-[#440798] mb-2 font-sans">
                {isRegisterMode
                  ? t("home.login.register_title")
                  : t("home.login.login_title")}
              </h2>
              <p className="mb-6 text-center text-gray-600">
                {t("home.login.verify_desc")}
              </p>
              <div
                className="flex justify-center gap-2 mb-4"
                dir="ltr"
              >
                {code.map((v, i) => (
                  <input
                    key={i}
                    ref={codeRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    dir="ltr"
                    className="w-14 h-14 text-2xl text-center border border-gray-300 bg-white focus:border-[#440798] focus:ring-2 focus:ring-[#440798] outline-none rounded-md"
                    value={v}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                  />
                ))}
              </div>
              <div className="mb-6 text-center text-gray-500">
                {t("home.login.verify_not_received")}{" "}
                <button
                  className="text-[#440798] underline disabled:text-gray-400"
                  disabled={timer > 0 || loading}
                  onClick={() => {
                    sendOtp(phone.trim(), countryCode);
                    setTimer(45);
                  }}
                >
                  {isRegisterMode
                    ? t("home.login.register_resend")
                    : t("home.login.verify_resend")}
                  {timer > 0 ? ` (${String(timer).padStart(2, "0")})` : ""}
                </button>
              </div>
              <button
                className="mt-1 w-full h-[49px] py-3 bg-[#FF702A] text-white font-bold text-base rounded-full flex items-center justify-center border-none shadow-none hover:bg-[#E55A1F] transition-all"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading
                  ? t("home.login.verifying")
                  : isRegisterMode
                    ? t("home.login.register_button")
                    : t("home.login.verify_button")}
              </button>
              {error && <p className="text-md text-red-500 mt-2">{error}</p>}
            </div>
          )}
          <div className="mt-6 text-center">
            <span>
              {isRegisterMode
                ? t("home.login.have_account")
                : t("home.login.no_account")}
            </span>
            <button
              type="button"
              onClick={() => {
                if (isRegisterMode) {
                  setIsRegisterMode(false);
                } else {
                  navigate("/register");
                }
              }}
              className="mr-2 text-[#440798] font-bold hover:underline"
            >
              {isRegisterMode
                ? t("home.login.sign_in_now")
                : t("home.login.register_now")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
