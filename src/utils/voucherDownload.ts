/**
 * تنزيل تذكرة الطلب (PDF) من voucher_url مع إرسال Bearer token.
 * المواصفات: الطلب مع الهيدر Authorization يُرجع ملف PDF للمستخدم المسجّل دخوله فقط.
 */
import { API_BASE_URL } from "@config/api";
import { getAcceptLanguage } from "@network/apiClient";

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
      "Accept-Language": getAcceptLanguage(),
    },
    credentials: "include",
  });
  if (!res.ok) {
    let details = "";
    try {
      details = await res.text();
    } catch {
      // ignore
    }
    throw new Error(`Download failed: ${res.status}${details ? ` - ${details}` : ""}`);
  }
  const contentType = res.headers.get("Content-Type") || "";
  const blob = await res.blob();

  // If backend returns JSON/HTML error but with 200, don't download a corrupted "pdf".
  if (!/application\/pdf/i.test(contentType)) {
    try {
      const text = await blob.text();
      const parsed = JSON.parse(text) as Record<string, unknown>;
      const nestedMsg =
        (
          (parsed?.data as Record<string, unknown> | undefined)?.order as
            | Record<string, unknown>
            | undefined
        )?.message ??
        parsed?.message ??
        parsed?.msg;
      throw new Error(String(nestedMsg || "Invalid voucher response"));
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Invalid voucher response (not a PDF)";
      throw new Error(msg);
    }
  }

  const disposition = res.headers.get("Content-Disposition");
  const filenameMatch = disposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  const filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, "") : `voucher-${Date.now()}.pdf`;
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // revoke later to avoid corrupt downloads in some browsers
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
}
