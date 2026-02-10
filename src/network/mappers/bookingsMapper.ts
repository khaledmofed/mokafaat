import type { BookingProperty } from "@pages/home/components/bookingData";

/**
 * Maps API booking response to frontend BookingProperty model
 */
export function mapApiBookingToModel(
  apiBooking: Record<string, unknown>
): BookingProperty | null {
  try {
    const id = Number(apiBooking.id ?? 0);
    const title = String(apiBooking.title ?? "");
    const image = String(apiBooking.image ?? "");
    const priceAfter = parseFloat(String(apiBooking.price_after ?? "0"));
    const discountPercentage = Number(apiBooking.discount_percentage ?? 0);
    const location = String(apiBooking.location ?? "");
    const availableSeats = Number(apiBooking.available_seats ?? 0);

    if (!id || !title) {
      console.warn("Booking missing id or title:", apiBooking);
      return null;
    }

    // Format price with discount
    const priceText = `${priceAfter.toFixed(0)} ريال`;
    if (discountPercentage > 0) {
      // Could add original price display if needed
    }

    // Determine category based on title/location (API doesn't provide category)
    // Default to "hotels" for bookings, can be enhanced later
    let category: "all" | "cars" | "hotels" | "flights" = "hotels";
    const titleLower = title.toLowerCase();
    if (titleLower.includes("سيارة") || titleLower.includes("car")) {
      category = "cars";
    } else if (
      titleLower.includes("طيران") ||
      titleLower.includes("رحلة") ||
      titleLower.includes("flight")
    ) {
      category = "flights";
    } else if (
      titleLower.includes("فندق") ||
      titleLower.includes("hotel") ||
      titleLower.includes("إقامة")
    ) {
      category = "hotels";
    }

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
      image: fixedImage,
      title,
      price: priceText,
      category,
      rating: 4.5, // Default rating, API doesn't provide
      location: location || undefined,
      feature: availableSeats > 0 ? `${availableSeats} مقعد متاح` : undefined,
    };
  } catch (error) {
    console.error("Error mapping booking:", error, apiBooking);
    return null;
  }
}

/**
 * Maps array of API bookings to frontend BookingProperty models
 */
export function mapApiBookingsToModels(
  apiBookings: Array<Record<string, unknown>>
): BookingProperty[] {
  if (!Array.isArray(apiBookings)) return [];
  return apiBookings
    .map(mapApiBookingToModel)
    .filter((booking): booking is BookingProperty => booking !== null);
}
