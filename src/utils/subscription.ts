/**
 * Determines if the user has an active subscription from GET /api/subscription/status response.
 * يدعم أكثر من شكل لاستجابة الـ API (is_active, subscribed, active, status, expires_at، إلخ)
 */
export function isUserSubscribed(subscriptionStatusData: unknown): boolean {
  const raw = subscriptionStatusData as Record<string, unknown> | undefined;
  if (!raw) return false;

  const data = (raw.data ?? raw) as Record<string, unknown> | undefined;
  if (!data) return false;

  if (data.is_active === true) return true;
  if (data.active === true) return true;
  if (data.is_subscribed === true) return true;
  if (data.subscribed === true) return true;
  if (data.has_subscription === true) return true;
  if (data.status === "active" || data.status === "subscribed") return true;

  const sub = data.subscription as Record<string, unknown> | undefined;
  if (sub && (sub.is_active === true || sub.status === "active")) return true;
  if (sub && typeof sub === "object" && (sub.id != null || sub.plan_id != null || sub.expires_at != null)) return true;

  if (data.expires_at && typeof data.expires_at === "string") {
    try {
      const exp = new Date(data.expires_at).getTime();
      if (!Number.isNaN(exp) && exp > Date.now()) return true;
    } catch {
      // ignore
    }
  }

  return false;
}
