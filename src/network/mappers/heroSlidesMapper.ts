/**
 * استخراج سلايدات الهيرو من response الـ API (GET /api/web/home أو أي شكل).
 * يدعم: slider, slides, banners, hero_slides وأسماء الحقول المختلفة.
 */
export interface HeroSlideItem {
  title: string;
  description: string;
  background: string;
  gradient?: string;
  linkUrl?: string;
}

const DEFAULT_GRADIENT =
  "linear-gradient(135deg, rgba(64, 1, 152, 0.8) 0%, rgba(253, 103, 26, 0.6) 100%)";

function getStr(o: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const v = o[key];
    if (v !== undefined && v !== null && String(v).trim())
      return String(v).trim();
    const snake = key
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");
    const w = o[snake];
    if (w !== undefined && w !== null && String(w).trim())
      return String(w).trim();
  }
  return "";
}

function mapOne(raw: unknown): HeroSlideItem | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const title = getStr(o, "title", "title_ar", "title_en", "name");
  const description = getStr(
    o,
    "description",
    "description_ar",
    "description_en",
    "subtitle",
    "text"
  );
  const background = getStr(
    o,
    "image",
    "background",
    "background_image",
    "photo",
    "url",
    "image_url",
    "cover"
  );
  if (!title && !description && !background) return null;
  const gradient = getStr(o, "gradient", "overlay") || DEFAULT_GRADIENT;
  const linkUrl = getStr(o, "link_url", "linkUrl", "link", "url", "button_url");
  return {
    title: title || "—",
    description: description || "",
    background: background || "",
    gradient,
    ...(linkUrl ? { linkUrl } : {}),
  };
}

/**
 * يستخرج مصفوفة سلايدات من response الصفحة الرئيسية.
 * يبحث في: data.slider, data.slides, data.banners, data.hero_slides، أو أي مفتاح يحتوي "slider" أو "slide" أو "banner".
 */
export function mapApiResponseToHeroSlides(response: unknown): HeroSlideItem[] {
  if (!response || typeof response !== "object") return [];
  const data = (response as Record<string, unknown>).data as
    | Record<string, unknown>
    | undefined;
  const root = response as Record<string, unknown>;

  const possibleArrays: unknown[] = [];

  for (const source of [data, root]) {
    if (!source || typeof source !== "object") continue;
    const arr =
      source.slider ??
      source.slides ??
      source.banners ??
      source.hero_slides ??
      source.sliders ??
      source.carousel;
    if (Array.isArray(arr) && arr.length > 0) possibleArrays.push(arr);
    for (const [key, value] of Object.entries(source)) {
      if (
        /\bslider\b|\bslides\b|\bbanners\b|\bhero\b/i.test(key) &&
        Array.isArray(value) &&
        value.length > 0
      ) {
        possibleArrays.push(value);
      }
    }
  }

  for (const arr of possibleArrays) {
    if (!Array.isArray(arr)) continue;
    const mapped = arr
      .map(mapOne)
      .filter((s): s is HeroSlideItem => s !== null);
    if (mapped.length > 0) return mapped;
  }

  return [];
}
