import type { Offer } from "@data/offers";

/**
 * Maps API offer response to frontend Offer model
 */
export function mapApiOfferToModel(
  apiOffer: Record<string, unknown>
): Offer | null {
  try {
    const id = String(apiOffer.id ?? "");
    const name = String(apiOffer.name ?? "");
    const description = String(apiOffer.description ?? "");
    const image = String(apiOffer.image ?? "");
    const priceBefore = parseFloat(String(apiOffer.price_before ?? "0"));
    const priceAfter = parseFloat(String(apiOffer.price_after ?? "0"));
    const discountPercent = parseFloat(
      String(apiOffer.discount_percent ?? "0")
    );
    const category = apiOffer.category as Record<string, unknown> | undefined;
    const merchant = apiOffer.merchant as Record<string, unknown> | undefined;
    const startDate = apiOffer.start_date ? String(apiOffer.start_date) : null;
    const endDate = apiOffer.end_date ? String(apiOffer.end_date) : null;

    if (!id || !name) {
      console.warn("Offer missing id or name:", apiOffer);
      return null;
    }

    // Format validity date range
    let validityAr = "";
    let validityEn = "";
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString("ar-SA");
      const end = new Date(endDate).toLocaleDateString("ar-SA");
      validityAr = `من ${start} إلى ${end}`;
      validityEn = `From ${new Date(startDate).toLocaleDateString(
        "en-US"
      )} to ${new Date(endDate).toLocaleDateString("en-US")}`;
    } else if (endDate) {
      const end = new Date(endDate).toLocaleDateString("ar-SA");
      validityAr = `حتى ${end}`;
      validityEn = `Until ${new Date(endDate).toLocaleDateString("en-US")}`;
    }

    // Get category data
    const categorySlug = category ? String(category.slug ?? "") : "";
    const categoryName = category ? String(category.name ?? "") : "";

    // Get merchant/company data
    const companyId = merchant ? String(merchant.id ?? "") : "";
    const merchantName = merchant ? String(merchant.name ?? "") : "";
    const merchantLogo = merchant?.logo ? String(merchant.logo) : null;

    // Fix duplicate URL in image if present
    let fixedImage = image;
    if (image && image.includes("/storage/https://")) {
      const storageIndex = image.indexOf("/storage/https://");
      fixedImage =
        image.substring(0, storageIndex + "/storage".length) +
        image.substring(storageIndex + "/storage/https://".length);
    }

    return {
      id,
      title: {
        ar: name,
        en: name, // API doesn't provide English, use Arabic as fallback
      },
      description: {
        ar: description,
        en: description,
      },
      image: fixedImage,
      originalPrice: priceBefore,
      discountPrice: priceAfter,
      discountPercentage: discountPercent,
      validity: {
        ar: validityAr || "غير محدد",
        en: validityEn || "Not specified",
      },
      features: [],
      rating: 0,
      reviewsCount: 0,
      views: 0,
      downloads: 0,
      purchases: 0,
      bookmarks: 0,
      isPopular: false,
      isNew: false,
      isBestSeller: false,
      category: categorySlug || "all",
      companyId: companyId || "unknown",
      availableUntil: endDate || "",
      maxQuantity: 1,
      terms: {
        ar: description,
        en: description,
      },
      isTodayOffer: false,
      // API data
      categoryName: categoryName || undefined,
      merchantName: merchantName || undefined,
      merchantLogo: merchantLogo || undefined,
    };
  } catch (error) {
    console.error("Error mapping offer:", error, apiOffer);
    return null;
  }
}

/**
 * Maps array of API offers to frontend Offer models
 */
export function mapApiOffersToModels(
  apiOffers: Array<Record<string, unknown>>
): Offer[] {
  if (!Array.isArray(apiOffers)) return [];
  return apiOffers
    .map(mapApiOfferToModel)
    .filter((offer): offer is Offer => offer !== null);
}
