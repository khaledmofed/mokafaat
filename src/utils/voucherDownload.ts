/**
 * تنزيل تذكرة الطلب (PDF) من voucher_url مع إرسال Bearer token.
 * المواصفات: الطلب مع الهيدر Authorization يُرجع ملف PDF للمستخدم المسجّل دخوله فقط.
 */
export async function downloadVoucher(
  voucherUrl: string,
  getToken: () => string | null
): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error("Login required to download voucher");
  }
  const url = voucherUrl.startsWith("http") ? voucherUrl : `${window.location.origin}${voucherUrl.startsWith("/") ? "" : "/"}${voucherUrl}`;
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
