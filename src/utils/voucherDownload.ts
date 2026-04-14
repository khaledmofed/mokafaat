/**
 * تنزيل تذكرة الطلب (PDF) من voucher_url مع إرسال Bearer token.
 * المواصفات: الطلب مع الهيدر Authorization يُرجع ملف PDF للمستخدم المسجّل دخوله فقط.
 */
import { API_BASE_URL } from "@config/api";
import { api, getAcceptLanguage } from "@network/apiClient";

function pickNonEmptyString(...vals: unknown[]): string | undefined {
  for (const v of vals) {
    if (typeof v === "string") {
      const t = v.trim();
      if (t.length > 0) return t;
    }
  }
  return undefined;
}

/**
 * يستخرج رابط الفاوتشر من جسم رد تفاصيل الطلب (أشكال مختلفة على الإنتاج).
 * يدعم voucher_url / voucherUrl على الجذر أو داخل data أو data.order.
 */
export function resolveOrderVoucherUrl(rawResponse: unknown): string | undefined {
  if (rawResponse == null || typeof rawResponse !== "object") return undefined;
  const r = rawResponse as Record<string, unknown>;
  const data = r.data as Record<string, unknown> | undefined;

  const fromOrderNode = (node: unknown) => {
    if (node == null || typeof node !== "object") return undefined;
    const o = node as Record<string, unknown>;
    return pickNonEmptyString(
      o.voucher_url,
      o.voucherUrl,
      (o.voucher as Record<string, unknown> | undefined)?.url,
    );
  };

  const orderInData = data?.order;
  const dataOrderResolved =
    orderInData != null
      ? Array.isArray(orderInData)
        ? fromOrderNode(orderInData[0])
        : fromOrderNode(orderInData)
      : undefined;

  return (
    pickNonEmptyString(
      r.voucher_url,
      r.voucherUrl,
      data?.voucher_url,
      data?.voucherUrl,
    ) ??
    dataOrderResolved ??
    (data && !data.order
      ? fromOrderNode(data)
      : undefined)
  );
}

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

  // مسار نسبي أو نفس أصل الـ API: استخدم axios (نفس الـ baseURL + التوكن) لتفادي مشاكل CORS/الكوكيز على الإنتاج.
  const useAxiosBlob =
    !url.startsWith("http") ||
    (() => {
      try {
        return new URL(url).origin === new URL(API_BASE_URL).origin;
      } catch {
        return false;
      }
    })();

  let blob: Blob;
  let contentType: string;
  let disposition: string | null = null;

  if (useAxiosBlob) {
    const path = url.startsWith("http")
      ? `${new URL(url).pathname}${new URL(url).search}`
      : url;
    const res = await api.get(path, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
        "Accept-Language": getAcceptLanguage(),
      },
    });
    blob = res.data as Blob;
    const ct = res.headers["content-type"] ?? res.headers["Content-Type"];
    contentType = typeof ct === "string" ? ct : "";
    const cd =
      res.headers["content-disposition"] ?? res.headers["Content-Disposition"];
    disposition = typeof cd === "string" ? cd : null;
  } else {
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
      throw new Error(
        `Download failed: ${res.status}${details ? ` - ${details}` : ""}`,
      );
    }
    contentType = res.headers.get("Content-Type") || "";
    disposition = res.headers.get("Content-Disposition");
    blob = await res.blob();
  }

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

  const filenameMatch = disposition?.match(
    /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
  );
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
