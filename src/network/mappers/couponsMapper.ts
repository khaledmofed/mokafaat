/**
 * Frontend Coupon model
 */
export interface CouponModel {
  id: number;
  title: string;
  price: string;
  savings: string;
  validity: string;
  reusable: boolean;
  reusableText: string;
  color: string;
  dealText: string;
  dealSubtext: string;
  discountPercentage?: number;
  category?: string;
}

/**
 * Maps API coupon response to frontend Coupon model
 */
export function mapApiCouponToModel(
  apiCoupon: Record<string, unknown>
): CouponModel | null {
  try {
    const id = Number(apiCoupon.id ?? 0);
    const title = apiCoupon.title ? String(apiCoupon.title) : null;
    const description = String(apiCoupon.description ?? "");
    const discountPercentage = apiCoupon.discount_percentage
      ? Number(apiCoupon.discount_percentage)
      : null;
    const category = apiCoupon.category as Record<string, unknown> | undefined;
    const categoryName = category ? String(category.name ?? "") : "";

    if (!id || !description) {
      console.warn("Coupon missing id or description:", apiCoupon);
      return null;
    }

    // Generate title from description if not provided
    const couponTitle = title || description.substring(0, 50) + "...";

    // Determine color based on discount percentage
    let color = "purple";
    if (discountPercentage) {
      if (discountPercentage >= 30) {
        color = "green";
      } else if (discountPercentage >= 15) {
        color = "orange";
      }
    }

    // Extract price/deal info from description
    let dealText = "خصم";
    let dealSubtext = discountPercentage ? `${discountPercentage}%` : "خاص";
    let priceText = discountPercentage
      ? `${discountPercentage}% خصم`
      : "عرض خاص";
    let savingsText = description;

    // Try to extract price info
    if (description.includes("ريال")) {
      const priceMatch = description.match(/(\d+)\s*ريال/);
      if (priceMatch) {
        priceText = `${priceMatch[1]} ريال`;
        dealText = priceMatch[1];
        dealSubtext = "ريال";
      }
    }

    return {
      id,
      title: couponTitle,
      price: priceText,
      savings: savingsText,
      validity: "صلاحية ٣٠ يوم",
      reusable: true, // Default to reusable, API doesn't provide this info
      reusableText: "قابل لاعادة الاستخدام",
      color,
      dealText,
      dealSubtext,
      discountPercentage: discountPercentage || undefined,
      category: categoryName || undefined,
    };
  } catch (error) {
    console.error("Error mapping coupon:", error, apiCoupon);
    return null;
  }
}

/**
 * Maps array of API coupons to frontend Coupon models
 */
export function mapApiCouponsToModels(
  apiCoupons: Array<Record<string, unknown>>
): CouponModel[] {
  if (!Array.isArray(apiCoupons)) return [];
  return apiCoupons
    .map(mapApiCouponToModel)
    .filter((coupon): coupon is CouponModel => coupon !== null);
}
