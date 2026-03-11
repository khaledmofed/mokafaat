/**
 * تنزيل تذكرة الطلب (PDF) من voucher_url مع إرسال Bearer token.
 * المواصفات: الطلب مع الهيدر Authorization يُرجع ملف PDF للمستخدم المسجّل دخوله فقط.
 */
import { API_BASE_URL } from "@config/api";

export async function downloadVoucher(
  voucherUrl: string,
  getToken: () => string | null
): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error("Login required to download voucher");
  }
  // لتجنب CORS في التطوير: إن كان الرابط مطلقاً لنفس الـ API base، حوّله إلى مسار نسبي (/api/...)
  // بحيث يمر عبر Vite proxy (server.proxy في vite.config.ts).
  let url = voucherUrl;
  if (voucherUrl.startsWith("http")) {
    try {
      const absolute = new URL(voucherUrl);
      const apiBase = new URL(API_BASE_URL);
      if (absolute.origin === apiBase.origin) {
        url = `${absolute.pathname}${absolute.search}`;
      }
    } catch {
      // keep original url
    }
  } else {
    url = voucherUrl.startsWith("/") ? voucherUrl : `/${voucherUrl}`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/pdf",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Download failed: ${res.status}`);
  }
  const blob = await res.blob();
  const disposition = res.headers.get("Content-Disposition");
  const filenameMatch = disposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  const filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, "") : `voucher-${Date.now()}.pdf`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
