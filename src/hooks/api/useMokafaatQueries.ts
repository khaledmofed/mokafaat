/**
 * React Query hooks لـ API مكافآت - للاستخدام في الصفحات والمكونات
 * تضمين اللغة في الـ query keys ليعاد طلب الـ API عند تغيير اللغة (Accept-Language)
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  homeApi,
  categoriesApi,
  offersApi,
  searchApi,
  favoritesApi,
  ordersApi,
  couponsApi,
  cardsApi,
  webApi,
  locationsApi,
  settingsApi,
  pagesApi,
} from "@network/services/mokafaatService";

/** لغة حالية للـ query key (يعيد طلب البيانات عند تغيير اللغة) */
function useQueryLang() {
  const { i18n } = useTranslation();
  return i18n.language?.split("-")[0] || "ar";
}

// ========== Query Keys ==========
export const mokafaatKeys = {
  home: ["mokafaat", "home"] as const,
  categories: ["mokafaat", "categories"] as const,
  offersByCategory: (id: string | number) =>
    ["mokafaat", "offers", "category", id] as const,
  offerDetail: (id: string | number) => ["mokafaat", "offers", id] as const,
  search: (q: string) => ["mokafaat", "search", q] as const,
  filterOptions: ["mokafaat", "filterOptions"] as const,
  favorites: (type?: string) => ["mokafaat", "favorites", type] as const,
  settings: ["mokafaat", "settings"] as const,
  pages: (platform?: string) => ["mokafaat", "pages", platform] as const,
  pageDetail: (slug: string) => ["mokafaat", "pages", slug] as const,
  orders: (type?: string) => ["mokafaat", "orders", type] as const,
  orderDetail: (id: string | number) => ["mokafaat", "orders", id] as const,
  couponsHome: ["mokafaat", "coupons", "home"] as const,
  cardsHome: ["mokafaat", "cards", "home"] as const,
  webCards: (params?: Record<string, unknown>) =>
    ["mokafaat", "web", "cards", params] as const,
  webOffers: (params?: Record<string, unknown>) =>
    ["mokafaat", "web", "offers", params] as const,
  webCoupons: (params?: Record<string, unknown>) =>
    ["mokafaat", "web", "coupons", params] as const,
  webNews: ["mokafaat", "web", "news"] as const,
  webHome: ["mokafaat", "web", "home"] as const,
  countries: ["mokafaat", "locations", "countries"] as const,
  regions: (id: string | number) =>
    ["mokafaat", "locations", "regions", id] as const,
  cities: (id: string | number) =>
    ["mokafaat", "locations", "cities", id] as const,
};

// ========== Home ==========
export function useHome() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.home, lang],
    queryFn: () => homeApi.get().then((r) => r.data),
  });
}

// ========== Web Home (Index Page - للسلايدر وبيانات الصفحة الرئيسية للويب) ==========
export function useWebHome() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webHome, lang],
    queryFn: () => webApi.home().then((r) => r.data),
  });
}

// ========== Categories ==========
export function useCategories() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.categories, lang],
    queryFn: () => categoriesApi.list().then((r) => r.data),
  });
}

// ========== Offers ==========
export function useOffersByCategory(
  categoryId: string | number,
  params?: Record<string, unknown>
) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.offersByCategory(categoryId), lang],
    queryFn: () => offersApi.byCategory(categoryId, params).then((r) => r.data),
    enabled: !!categoryId,
  });
}

export function useOfferDetail(id: string | number) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.offerDetail(id), lang],
    queryFn: () => offersApi.detail(id).then((r) => r.data),
    enabled: !!id,
  });
}

// ========== Search ==========
export function useSearch(q: string, params?: Record<string, unknown>) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.search(q), lang],
    queryFn: () => searchApi.search(q, params).then((r) => r.data),
    enabled: q.length >= 2,
  });
}

// ========== Favorites (يتطلب تسجيل دخول) ==========
export function useFavorites(type?: "offer" | "card" | "coupon") {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.favorites(type), lang],
    queryFn: () => favoritesApi.list(type).then((r) => r.data),
  });
}

export function useFavoriteToggle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      favorable_type,
      favorable_id,
    }: {
      favorable_type: string;
      favorable_id: string | number;
    }) => favoritesApi.toggle(favorable_type, favorable_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mokafaat", "favorites"] });
    },
  });
}

// ========== Settings ==========
export function useSettings() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.settings, lang],
    queryFn: () => settingsApi.get().then((r) => r.data),
  });
}

// ========== Pages ==========
export function usePages(platform?: string) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.pages(platform), lang],
    queryFn: () => pagesApi.list(platform).then((r) => r.data),
  });
}

export function usePageDetail(slug: string) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.pageDetail(slug), lang],
    queryFn: () => pagesApi.detail(slug).then((r) => r.data),
    enabled: !!slug,
  });
}

// ========== Orders ==========
export function useOrders(orderType?: string) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.orders(orderType), lang],
    queryFn: () =>
      ordersApi
        .list(orderType as "offer" | "card" | "coupon")
        .then((r) => r.data),
  });
}

export function useOrderDetail(id: string | number) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.orderDetail(id), lang],
    queryFn: () => ordersApi.detail(id).then((r) => r.data),
    enabled: !!id,
  });
}

// ========== Coupons ==========
export function useCouponsHome() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.couponsHome, lang],
    queryFn: () => couponsApi.home().then((r) => r.data),
  });
}

// ========== Cards ==========
export function useCardsHome() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.cardsHome, lang],
    queryFn: () => cardsApi.home().then((r) => r.data),
  });
}

// ========== Web (للوحة الويب) ==========
export function useWebCards(params?: Record<string, unknown>) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webCards(params), lang],
    queryFn: () => webApi.cards(params).then((r) => r.data),
  });
}

export function useWebOffers(params?: Record<string, unknown>) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webOffers(params), lang],
    queryFn: () => webApi.offers(params).then((r) => r.data),
  });
}

export function useWebCoupons(params?: Record<string, unknown>) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webCoupons(params), lang],
    queryFn: () => webApi.coupons(params).then((r) => r.data),
  });
}

export function useWebNews() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webNews, lang],
    queryFn: () => webApi.news().then((r) => r.data),
  });
}

// ========== Locations ==========
export function useCountries() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.countries, lang],
    queryFn: () => locationsApi.countries().then((r) => r.data),
  });
}

export function useRegions(id: string | number) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.regions(id), lang],
    queryFn: () => locationsApi.regions(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCities(id: string | number) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.cities(id), lang],
    queryFn: () => locationsApi.cities(id).then((r) => r.data),
    enabled: !!id,
  });
}
