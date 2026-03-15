import type { CardOffer } from "@data/cards";

export interface CardCategory {
  id: number;
  name: string;
  image?: string;
}

export interface CardMerchant {
  id: number;
  name: string;
  logo: string;
}

export type CardOfferWithCompanyId = CardOffer & {
  companyId: string;
  categoryId?: number;
  category?: CardCategory;
  merchant?: CardMerchant;
};

/**
 * Card model from API
 */
export interface ApiCard {
  id: number;
  title: string | null;
  description: string | null;
  image: string | null;
  price: string;
  category: {
    id: number;
    name: string;
  };
}

/**
 * Frontend Card model
 */
export interface CardModel {
  id: number;
  image: string;
  title: string;
  description?: string;
  price: string;
  category: string;
}

/**
 * Maps API card response to frontend Card model
 */
export function mapApiCardToModel(
  apiCard: Record<string, unknown>
): CardModel | null {
  try {
    const id = Number(apiCard.id ?? 0);
    const title = apiCard.title ? String(apiCard.title) : null;
    const description = apiCard.description
      ? String(apiCard.description)
      : null;
    const image = apiCard.image ? String(apiCard.image) : null;
    const price = String(apiCard.price ?? "0.00");
    const category = apiCard.category as Record<string, unknown> | undefined;
    const categoryName = category ? String(category.name ?? "") : "";

    if (!id) {
      console.warn("Card missing id:", apiCard);
      return null;
    }

    // Use description as title if title is null
    const cardTitle = title || description || `بطاقة ${categoryName}`;

    // Use placeholder image if no image provided
    const cardImage = image || "https://via.placeholder.com/300x200?text=Card";

    // Fix duplicate URL in image if present
    let fixedImage = cardImage;
    if (cardImage && cardImage.includes("/storage/https://")) {
      const storageIndex = cardImage.indexOf("/storage/https://");
      fixedImage =
        cardImage.substring(0, storageIndex + "/storage".length) +
        cardImage.substring(storageIndex + "/storage/https://".length);
    }

    return {
      id,
      image: fixedImage,
      title: cardTitle,
      description: description || undefined,
      price,
      category: categoryName,
    };
  } catch (error) {
    console.error("Error mapping card:", error, apiCard);
    return null;
  }
}

/**
 * Maps array of API cards to frontend Card models
 */
export function mapApiCardsToModels(
  apiCards: Array<Record<string, unknown>>
): CardModel[] {
  if (!Array.isArray(apiCards)) return [];
  return apiCards
    .map(mapApiCardToModel)
    .filter((card): card is CardModel => card !== null);
}

const validityLabel: Record<string, string> = {
  annual: "سنوي",
  monthly: "شهري",
  quarterly: "ربع سنوي",
  semi_annual: "نصف سنوي",
};

/**
 * Maps a single card from /api/cards/home (latest_cards, top_selling_cards, most_viewed_cards)
 * to CardOffer & { companyId } for use with OfferCard.
 */
export function mapApiHomeCardToOffer(
  raw: Record<string, unknown>
): CardOfferWithCompanyId {
  const merchant = (raw.merchant as Record<string, unknown>) || {};
  const category = (raw.category as Record<string, unknown>) || {};
  const id = String(raw.id ?? "");
  const companyId = String(merchant.id ?? "");
  const categoryId = category?.id != null ? Number(category.id) : undefined;
  const oldPrice = raw.old_price != null ? Number(raw.old_price) : undefined;
  const cardCategory: CardCategory | undefined =
    category?.id != null && category?.name != null
      ? { id: Number(category.id), name: String(category.name) }
      : undefined;
  const cardMerchant: CardMerchant | undefined =
    merchant?.id != null && merchant?.name != null
      ? {
          id: Number(merchant.id),
          name: String(merchant.name),
          logo: String(merchant.logo ?? ""),
        }
      : undefined;
  return {
    id,
    companyId,
    categoryId,
    category: cardCategory,
    merchant: cardMerchant,
    title: { ar: String(raw.name ?? ""), en: String(raw.name ?? "") },
    description: {
      ar: String(raw.description ?? ""),
      en: String(raw.description ?? ""),
    },
    price: Number(raw.final_price ?? raw.price ?? 0),
    originalPrice: oldPrice,
    currency: "SAR",
    validity: {
      ar: validityLabel[String(raw.validity_type ?? "").toLowerCase()] ?? String(raw.validity_type ?? ""),
      en: String(raw.validity_type ?? ""),
    },
    features: [],
    image: String(raw.image ?? ""),
    rating: 0,
    purchases: Number(raw.purchase_count ?? 0),
    views: Number(raw.views_count ?? 0),
    downloads: 0,
    bookmarks: 0,
  };
}

/**
 * Maps array of cards from cards/home API to CardOffer & { companyId }[]
 */
export function mapApiHomeCardsToOffers(
  items: Array<Record<string, unknown>>
): CardOfferWithCompanyId[] {
  if (!Array.isArray(items)) return [];
  return items
    .map(mapApiHomeCardToOffer)
    .filter((o) => o.id && o.companyId && o.title.ar);
}
