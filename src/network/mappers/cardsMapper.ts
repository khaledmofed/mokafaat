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
