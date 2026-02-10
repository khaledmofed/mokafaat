import { useEffect } from "react";
import { setAuthTokenGetter, setOnUnauthorized } from "@network/apiClient";
import { useUserStore } from "@stores/userStore";

/**
 * يربط مخزن المستخدم مع عميل API (توكن + تسجيل خروج عند 401).
 * يُعرض مرة واحدة في التطبيق.
 */
export default function AuthApiBootstrap() {
  useEffect(() => {
    setAuthTokenGetter(() => useUserStore.getState().token);
    setOnUnauthorized(() => useUserStore.getState().logout);
  }, []);
  return null;
}
