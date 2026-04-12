import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@config/api";
import i18n from "../i18n";

/** لغة الطلب لرأس Accept-Language (وفق لغة الواجهة في i18n) */
const ACCEPT_LANGUAGE_CODES = ["ar", "en", "fr", "ur", "hi"] as const;

/** قيمة رأس Accept-Language لكل طلبات الـ API (تتبع لغة الواجهة) */
export function getAcceptLanguage(): string {
  const lang = i18n.language?.split("-")[0] || "ar";
  return (ACCEPT_LANGUAGE_CODES as readonly string[]).includes(lang)
    ? lang
    : "ar";
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// تجنب الاعتماد الدائري: التوكن يُحقَن من التطبيق عبر setAuthTokenGetter
type TokenGetter = () => string | null;
type LogoutFn = () => void;
let getAuthToken: TokenGetter = () => null;
let onUnauthorized: LogoutFn = () => {};

export function setAuthTokenGetter(fn: TokenGetter) {
  getAuthToken = fn;
}

export function setOnUnauthorized(fn: LogoutFn) {
  onUnauthorized = fn;
}

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = getAcceptLanguage();

    // Inject selected country_id into ALL requests as query param (unless explicitly provided).
    // Selected country is stored by LanguageToggle in localStorage.
    try {
      const storedCountryId = localStorage.getItem("country_id");
      const countryIdNum =
        storedCountryId && storedCountryId.trim() !== ""
          ? Number(storedCountryId)
          : NaN;
      if (Number.isFinite(countryIdNum)) {
        const params = (config.params ?? {}) as Record<string, unknown>;
        if (params.country_id == null || String(params.country_id).trim() === "") {
          config.params = { ...params, country_id: countryIdNum };
        }
      }
    } catch {
      // ignore storage access failures
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      onUnauthorized();
    }
    return Promise.reject(err);
  }
);
