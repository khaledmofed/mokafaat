import { useEffect } from "react";
import { setAuthTokenGetter, setOnUnauthorized } from "@network/apiClient";
import { useUserStore } from "@stores/userStore";
import { appConfigApi } from "@network/services/mokafaatService";

/**
 * يربط مخزن المستخدم مع عميل API (توكن + تسجيل خروج عند 401).
 * ويطلب GET /api/app-config ويعرض الداتا في الكونسول للتطوير.
 */
export default function AuthApiBootstrap() {
  useEffect(() => {
    setAuthTokenGetter(() => useUserStore.getState().token);
    setOnUnauthorized(() => useUserStore.getState().logout);
  }, []);

  useEffect(() => {
    appConfigApi
      .get()
      .then((res) => {
        const data = res.data;
        console.log("[GET /api/app-config] Response:", data);
      })
      .catch((err) => {
        console.warn("[GET /api/app-config] Error:", err?.response?.data ?? err.message);
      });
  }, []);

  return null;
}
