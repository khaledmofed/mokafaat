/**
 * Determines if the user has an active subscription from GET /api/subscription/status response.
 * الباكند يعتمد على اشتراك فعال (غير منتهي)؛ نتحقق من expires_at أولاً إن وُجد.
 */
export function isUserSubscribed(subscriptionStatusData: unknown): boolean {
  const raw = subscriptionStatusData as Record<string, unknown> | undefined;
  if (!raw) return false;

  const data = (raw.data ?? raw) as Record<string, unknown> | undefined;
  if (!data) return false;

  const sub = data.subscription as Record<string, unknown> | undefined;
  const expiresAt = (data.expires_at ?? sub?.expires_at) as string | undefined;

  if (expiresAt && typeof expiresAt === "string") {
    try {
      const exp = new Date(expiresAt).getTime();
      if (!Number.isNaN(exp) && exp <= Date.now()) return false;
    } catch {
      // ignore
    }
  }

  if (data.is_active === true) return true;
  if (data.active === true) return true;
  if (data.is_subscribed === true) return true;
  if (data.subscribed === true) return true;
  if (data.has_subscription === true) return true;
  if (data.status === "active" || data.status === "subscribed") return true;

  if (sub && (sub.is_active === true || sub.status === "active")) return true;
  // لا نعتبر المشتركاً فقط لأن sub فيه id/plan_id — قد يكون منتهياً؛ لازم expires_at مستقبلي أو علَم فعال أعلاه
  if (sub && typeof sub === "object" && expiresAt) {
    try {
      const exp = new Date(expiresAt).getTime();
      if (!Number.isNaN(exp) && exp > Date.now()) return true;
    } catch {
      // ignore
    }
  }

  if (expiresAt && typeof expiresAt === "string") {
    try {
      const exp = new Date(expiresAt).getTime();
      if (!Number.isNaN(exp) && exp > Date.now()) return true;
    } catch {
      // ignore
    }
  }

  return false;
}
