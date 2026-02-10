import { ContactInfosModel } from "@entities";

/**
 * تعيين بيانات التواصل الراجعة من الـ API (أي شكل) إلى نموذج الواجهة ContactInfosModel.
 * يدعم snake_case (من الـ API) و camelCase.
 */
export function mapApiContactToModel(raw: unknown): ContactInfosModel | null {
  if (!raw || typeof raw !== "object") return null;

  const o = raw as Record<string, unknown>;

  const getStr = (key: string): string | undefined => {
    const v = o[key];
    if (v !== undefined && v !== null) return String(v);
    const snake = key
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");
    const w = o[snake];
    return w !== undefined && w !== null ? String(w) : undefined;
  };
  const get = (key: string) => getStr(key) ?? "";

  const mobileNumber =
    getStr("mobileNumber") ??
    getStr("mobile_number") ??
    getStr("phone") ??
    getStr("telephone") ??
    getStr("tel") ??
    "";
  const email =
    getStr("email") ?? getStr("email_address") ?? getStr("mail") ?? "";
  const location =
    getStr("location") ??
    getStr("address") ??
    getStr("address_ar") ??
    getStr("address_en") ??
    "";

  if (!mobileNumber && !email && !location) return null;

  const idVal = o.id;
  const id =
    typeof idVal === "number"
      ? idVal
      : typeof idVal === "string"
      ? parseInt(idVal, 10)
      : 0;

  const result: ContactInfosModel = {
    id: Number.isNaN(id) ? 0 : id,
    mobileNumber,
    email,
    location,
    createdAt: get("createdAt") ?? get("created_at") ?? "",
    updatedAt: get("updatedAt") ?? get("updated_at") ?? "",
  };

  const mapLat = getStr("mapLat") ?? getStr("map_lat");
  const mapLong = getStr("mapLong") ?? getStr("map_long");
  if (mapLat) result.mapLat = mapLat;
  if (mapLong) result.mapLong = mapLong;

  const linkedInUrl =
    getStr("linkedInUrl") ?? getStr("linkedin_url") ?? getStr("linked_in_url");
  const instagramUrl = getStr("instagramUrl") ?? getStr("instagram_url");
  const whatsappNumber =
    getStr("whatsappNumber") ?? getStr("whatsapp_number") ?? getStr("whatsapp");
  if (linkedInUrl) result.linkedInUrl = linkedInUrl;
  if (instagramUrl) result.instagramUrl = instagramUrl;
  if (whatsappNumber) result.whatsappNumber = whatsappNumber;

  return result;
}
