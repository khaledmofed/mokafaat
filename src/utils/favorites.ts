/**
 * Normalize GET /api/favorites response to a unified list.
 * يدعم أشكال: data.data, data.favorites, data = array، والعنصر: favorable_type, favorable_id, favorable { image, name_ar, name_en, ... }
 */
export interface NormalizedFavorite {
  id: string;
  type: "offer" | "card" | "coupon" | "booking";
  favorable_type: string;
  favorable_id: string | number;
  image: string;
  title: { ar: string; en: string };
  price?: number;
  originalPrice?: number;
  savedAt: string;
  category?: string;
  companyId?: string;
}

export function normalizeFavoritesList(data: unknown): NormalizedFavorite[] {
  const raw = (data as Record<string, unknown>)?.data ?? data;
  let list: unknown[] = [];
  if (Array.isArray(raw)) list = raw;
  else if (raw && typeof raw === "object") {
    const arr = (raw as Record<string, unknown>).data ?? (raw as Record<string, unknown>).favorites ?? (raw as Record<string, unknown>).list;
    list = Array.isArray(arr) ? arr : [];
  }
  return list.map((item) => normalizeFavoriteItem(item)).filter(Boolean) as NormalizedFavorite[];
}

function normalizeFavoriteItem(row: unknown): NormalizedFavorite | null {
  const r = row as Record<string, unknown> | undefined;
  if (!r || typeof r !== "object") return null;
  const type = String(r.favorable_type ?? r.type ?? "offer").toLowerCase();
  const favorableType = type === "card" || type === "coupon" ? type : type === "booking" ? "coupon" : "offer";
  const favorableId = r.favorable_id ?? r.favorable_id ?? r.id;
  if (favorableId == null) return null;
  const favorable = (r.favorable ?? r.item ?? r) as Record<string, unknown> | undefined;
  const img = (favorable?.image ?? favorable?.logo ?? r.image ?? favorable?.thumbnail) as string | undefined;
  const nameAr = (favorable?.name_ar ?? favorable?.title_ar ?? favorable?.name ?? r.name_ar) as string | undefined;
  const nameEn = (favorable?.name_en ?? favorable?.title_en ?? favorable?.name ?? r.name_en) as string | undefined;
  const price = favorable?.price ?? favorable?.discount_price ?? r.price;
  const originalPrice = favorable?.original_price ?? favorable?.price ?? r.originalPrice;
  const savedAt = (r.created_at ?? r.saved_at ?? r.createdAt ?? new Date().toISOString()) as string;
  return {
    id: String(r.id ?? `fav_${favorableType}_${favorableId}`),
    type: favorableType as NormalizedFavorite["type"],
    favorable_type: favorableType,
    favorable_id: favorableId,
    image: img && typeof img === "string" ? img : "",
    title: { ar: nameAr && String(nameAr) || "—", en: nameEn && String(nameEn) || "—" },
    price: typeof price === "number" ? price : typeof price === "string" ? parseFloat(price) : undefined,
    originalPrice: typeof originalPrice === "number" ? originalPrice : typeof originalPrice === "string" ? parseFloat(originalPrice) : undefined,
    savedAt: String(savedAt),
    category: (favorable?.category ?? r.category) as string | undefined,
    companyId: (favorable?.company_id ?? favorable?.merchant_id ?? r.company_id) as string | undefined,
  };
}
