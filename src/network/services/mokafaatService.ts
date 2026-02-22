/**
 * خدمات API مكافآت - استدعاءات الـ Backend حسب الكوليكشن
 */
import { api } from "@network/apiClient";
import { API_ENDPOINTS } from "@network/apiEndpoints";

// ========== Home ==========
export const homeApi = {
  get: () => api.get(API_ENDPOINTS.home),
};

// ========== Categories ==========
export const categoriesApi = {
  list: () => api.get(API_ENDPOINTS.categories),
};

// ========== Locations ==========
export const locationsApi = {
  countries: () => api.get(API_ENDPOINTS.locations.countries),
  regions: (id: string | number) =>
    api.get(API_ENDPOINTS.locations.regions(id)),
  cities: (id: string | number) => api.get(API_ENDPOINTS.locations.cities(id)),
};

// ========== Offers ==========
export const offersApi = {
  byCategory: (categoryId: string | number, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.offersByCategory(categoryId), { params }),
  detail: (id: string | number) => api.get(API_ENDPOINTS.offerDetail(id)),
};

// ========== Search & Filters ==========
export const searchApi = {
  search: (q: string, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.search, { params: { q, ...params } }),
  filterOptions: () => api.get(API_ENDPOINTS.filterOptions),
};

// ========== Favorites (يتطلب توكن) ==========
export const favoritesApi = {
  list: (type?: "offer" | "card" | "coupon") =>
    api.get(API_ENDPOINTS.favorites, { params: type ? { type } : {} }),
  toggle: (favorable_type: string, favorable_id: string | number) =>
    api.post(API_ENDPOINTS.favoritesToggle, null, {
      params: { favorable_type, favorable_id },
    }),
};

// ========== Settings (يتطلب توكن) ==========
export const settingsApi = {
  get: () => api.get(API_ENDPOINTS.settings),
  updateLanguage: (language: string) =>
    api.post(API_ENDPOINTS.settingsUpdateLanguage, null, {
      params: { language },
    }),
  update: (params: {
    country_id?: number;
    dark_mode?: boolean;
    app_notifications?: boolean;
    sms_notifications?: boolean;
    whatsapp_notifications?: boolean;
  }) =>
    api.post(API_ENDPOINTS.settingsUpdate, null, {
      params,
    }),
};

// ========== App Config (GET - عام) ==========
export const appConfigApi = {
  get: () => api.get(API_ENDPOINTS.appConfig),
};

// ========== Pages (يتطلب توكن اختياري) ==========
export const pagesApi = {
  list: (platform?: string) =>
    api.get(API_ENDPOINTS.pages, { params: platform ? { platform } : {} }),
  detail: (slug: string) => api.get(API_ENDPOINTS.pageDetail(slug)),
};

// ========== Merchants ==========
export const merchantsApi = {
  detail: (id: string | number) => api.get(API_ENDPOINTS.merchantDetail(id)),
  follow: (id: string | number) => api.post(API_ENDPOINTS.merchantFollow(id)),
  review: (merchantId: string | number) =>
    api.get(API_ENDPOINTS.merchantReview, {
      params: { merchant_id: merchantId },
    }),
};

// ========== Subscription (يتطلب توكن) ==========
export const subscriptionApi = {
  plans: () => api.get(API_ENDPOINTS.subscription.plans),
  subscribe: (planId: string | number) =>
    api.post(API_ENDPOINTS.subscription.subscribe, null, {
      params: { plan_id: planId },
    }),
  status: () => api.get(API_ENDPOINTS.subscription.status),
  history: () => api.get(API_ENDPOINTS.subscription.history),
};

// ========== Orders (يتطلب توكن) ==========
export const ordersApi = {
  list: (orderType?: "offer" | "card" | "coupon") =>
    api.get(API_ENDPOINTS.orders, {
      params: orderType ? { order_type: orderType } : {},
    }),
  detail: (id: string | number) => api.get(API_ENDPOINTS.orderDetail(id)),
};

// ========== Coupons (app - يتطلب توكن للبعض) ==========
export const couponsApi = {
  home: () => api.get(API_ENDPOINTS.coupons.home),
  search: (q: string) =>
    api.get(API_ENDPOINTS.coupons.search, { params: { q } }),
  byCategory: (id: string | number) =>
    api.get(API_ENDPOINTS.coupons.byCategory(id)),
  byMerchant: (id: string | number) =>
    api.get(API_ENDPOINTS.coupons.byMerchant(id)),
  detail: (id: string | number) => api.get(API_ENDPOINTS.coupons.detail(id)),
  use: (id: string | number) => api.post(API_ENDPOINTS.coupons.use(id)),
};

// ========== Cards (app) ==========
export const cardsApi = {
  home: () => api.get(API_ENDPOINTS.cards.home),
  search: (q: string, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.cards.search, { params: { q, ...params } }),
  byCategory: (id: string | number, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.cards.byCategory(id), { params }),
  byMerchant: (id: string | number, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.cards.byMerchant(id), { params }),
  detail: (id: string | number, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.cards.detail(id), { params }),
};

// ========== Web (عام - للوحة الويب بدون توكن أو معه) ==========
export const webApi = {
  home: () => api.get(API_ENDPOINTS.web.home),
  cards: (params?: {
    category_id?: number;
    merchant_id?: number;
    pricing_type?: string;
    price_min?: number;
    price_max?: number;
    discount_min?: number;
    search?: string;
    sort_by?: string;
    per_page?: number;
    page?: number;
  }) => api.get(API_ENDPOINTS.web.cards, { params }),
  cardDetail: (id: string | number) =>
    api.get(API_ENDPOINTS.web.cardDetail(id)),
  categoriesCards: (platformSlug: string, params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.web.categoriesCards(platformSlug), { params }),
  news: (params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.web.news, { params }),
  newsDetail: (slug: string) => api.get(API_ENDPOINTS.web.newsDetail(slug)),
  newsByCategory: (categorySlug: string) =>
    api.get(API_ENDPOINTS.web.newsByCategory(categorySlug)),
  coupons: (params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.web.coupons, { params }),
  couponDetail: (id: string | number) =>
    api.get(API_ENDPOINTS.web.couponDetail(id)),
  categoryCoupons: (categorySlug: string) =>
    api.get(API_ENDPOINTS.web.categoryCoupons(categorySlug)),
  offers: (params?: Record<string, unknown>) =>
    api.get(API_ENDPOINTS.web.offers, { params }),
  offerDetail: (id: string | number) =>
    api.get(API_ENDPOINTS.web.offerDetail(id)),
  contact: (params: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) =>
    api.post(API_ENDPOINTS.web.contact, null, {
      params,
    }),
};
