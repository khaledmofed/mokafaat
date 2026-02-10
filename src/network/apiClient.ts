import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@config/api";
import i18n from "../i18n";

/** لغة الطلب للـ API: ar | en (وفق لغة الواجهة) */
function getAcceptLanguage(): string {
  const lang = i18n.language?.split("-")[0] || "ar";
  return ["ar", "en", "fr"].includes(lang) ? lang : "ar";
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
