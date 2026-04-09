export type WebOffersParams = {
  category_ids?: string; // "1,3,5"
  subcategory_ids?: string; // "2,4"
  merchant_ids?: string; // "1,2"
  types?: string; // "coupon,offer,discount"
  pricing_types?: string; // "free,paid,paid_no_subscription"
  price_min?: number;
  price_max?: number;
  discount_min?: number;
  filter_option_ids?: string; // "1,5,8"
  search?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
  country_id?: number;
  city_id?: number;
};

export type WebCardsParams = {
  category_ids?: string;
  merchant_ids?: string;
  validity_types?: string; // daily, weekly, monthly, quarterly, semi_annual, annual, unlimited
  delivery_type?: string;
  is_renewable?: number; // 1|0
  price_min?: number;
  price_max?: number;
  filter_option_ids?: string;
  search?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
};

export type WebCouponsParams = {
  category_ids?: string;
  merchant_ids?: string;
  coupon_types?: string; // percentage,fixed
  city_id?: number;
  discount_min?: number;
  filter_option_ids?: string;
  search?: string;
  sort_by?: string; // newest most_used highest_discount
  per_page?: number;
  page?: number;
};

function joinCsv(values: Array<string | number> | undefined): string | undefined {
  if (!values || values.length === 0) return undefined;
  const v = values
    .map((x) => String(x).trim())
    .filter((x) => x !== "");
  if (v.length === 0) return undefined;
  return v.join(",");
}

function cleanParams<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === "string" && v.trim() === "") return;
    out[k] = v;
  });
  return out as Partial<T>;
}

/**
 * Build WEB offers query params based on Mokafaat api-docs.html
 * Note: our UI uses numeric ids for some filters; we map them to the closest supported params:
 * - subcategoryIds -> subcategory_ids
 * - brandIds -> merchant_ids
 * - offerTypeIds -> filter_option_ids (if backend uses these ids)
 */
export function buildWebOffersParams(input: {
  search?: string;
  sortBy?: string;
  subcategoryIds?: number[];
  brandIds?: number[];
  offerTypeIds?: number[];
  priceMin?: number;
  priceMax?: number;
  perPage?: number;
  page?: number;
  categoryIds?: Array<string | number>;
  merchantIds?: Array<string | number>;
  pricingTypes?: string[]; // ["free","paid"]
  types?: string[]; // ["coupon","offer"]
  filterOptionIds?: Array<string | number>;
  countryId?: number;
  cityId?: number;
  discountMin?: number;
}): WebOffersParams {
  return cleanParams<WebOffersParams>({
    search: input.search,
    sort_by: input.sortBy,
    per_page: input.perPage,
    page: input.page,
    country_id: input.countryId,
    city_id: input.cityId,
    discount_min: input.discountMin,
    price_min: input.priceMin,
    price_max: input.priceMax,
    category_ids: joinCsv(input.categoryIds),
    merchant_ids:
      joinCsv(input.merchantIds) ?? joinCsv(input.brandIds as number[] | undefined),
    subcategory_ids: joinCsv(input.subcategoryIds),
    pricing_types: joinCsv(input.pricingTypes),
    types: joinCsv(input.types),
    filter_option_ids:
      joinCsv(input.filterOptionIds) ?? joinCsv(input.offerTypeIds as number[] | undefined),
  });
}

export function buildWebCardsParams(input: {
  categoryIds?: Array<string | number>;
  merchantIds?: Array<string | number>;
  validityTypes?: string[];
  deliveryType?: string;
  isRenewable?: boolean;
  priceMin?: number;
  priceMax?: number;
  filterOptionIds?: Array<string | number>;
  search?: string;
  sortBy?: string;
  perPage?: number;
  page?: number;
}): WebCardsParams {
  return cleanParams<WebCardsParams>({
    category_ids: joinCsv(input.categoryIds),
    merchant_ids: joinCsv(input.merchantIds),
    validity_types: joinCsv(input.validityTypes),
    delivery_type: input.deliveryType,
    is_renewable: input.isRenewable == null ? undefined : input.isRenewable ? 1 : 0,
    price_min: input.priceMin,
    price_max: input.priceMax,
    filter_option_ids: joinCsv(input.filterOptionIds),
    search: input.search,
    sort_by: input.sortBy,
    per_page: input.perPage,
    page: input.page,
  });
}

export function buildWebCouponsParams(input: {
  categoryIds?: Array<string | number>;
  merchantIds?: Array<string | number>;
  couponTypes?: string[];
  cityId?: number;
  discountMin?: number;
  filterOptionIds?: Array<string | number>;
  search?: string;
  sortBy?: string;
  perPage?: number;
  page?: number;
}): WebCouponsParams {
  return cleanParams<WebCouponsParams>({
    category_ids: joinCsv(input.categoryIds),
    merchant_ids: joinCsv(input.merchantIds),
    coupon_types: joinCsv(input.couponTypes),
    city_id: input.cityId,
    discount_min: input.discountMin,
    filter_option_ids: joinCsv(input.filterOptionIds),
    search: input.search,
    sort_by: input.sortBy,
    per_page: input.perPage,
    page: input.page,
  });
}

