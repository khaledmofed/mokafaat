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
  appConfigApi,
  subscriptionApi,
  paymentApi,
  pointsApi,
  walletApi,
  profileApi,
  filtersApi,
  membershipApi,
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
  webOfferDetail: (id: string | number) =>
    ["mokafaat", "web", "offers", id] as const,
  search: (q: string) => ["mokafaat", "search", q] as const,
  filterOptions: ["mokafaat", "filterOptions"] as const,
  filters: (categoryId: string | number) =>
    ["mokafaat", "filters", categoryId] as const,
  favorites: (type?: string) => ["mokafaat", "favorites", type] as const,
  settings: ["mokafaat", "settings"] as const,
  pages: (platform?: string) => ["mokafaat", "pages", platform] as const,
  pageDetail: (slug: string) => ["mokafaat", "pages", slug] as const,
  orders: (type?: string) => ["mokafaat", "orders", type] as const,
  orderDetail: (id: string | number) => ["mokafaat", "orders", id] as const,
  couponsHome: ["mokafaat", "coupons", "home"] as const,
  cardsHome: ["mokafaat", "cards", "home"] as const,
  cardDetail: (id: string | number) =>
    ["mokafaat", "cards", "detail", id] as const,
  cardsByMerchant: (id: string | number, params?: Record<string, unknown>) =>
    ["mokafaat", "cards", "byMerchant", id, params] as const,
  webCards: (params?: Record<string, unknown>) =>
    ["mokafaat", "web", "cards", params] as const,
  webOffers: (params?: Record<string, unknown>) =>
    ["mokafaat", "web", "offers", params] as const,
  webCoupons: (params?: Record<string, unknown>) =>
    ["mokafaat", "web", "coupons", params] as const,
  webCouponCategories: (categorySlug: string) =>
    ["mokafaat", "web", "categories", categorySlug, "coupons"] as const,
  webNews: ["mokafaat", "web", "news"] as const,
  webHome: ["mokafaat", "web", "home"] as const,
  appConfig: ["mokafaat", "appConfig"] as const,
  countries: ["mokafaat", "locations", "countries"] as const,
  regions: (id: string | number) =>
    ["mokafaat", "locations", "regions", id] as const,
  cities: (id: string | number) =>
    ["mokafaat", "locations", "cities", id] as const,
  subscriptionPlans: ["mokafaat", "subscription", "plans"] as const,
  subscriptionStatus: ["mokafaat", "subscription", "status"] as const,
  subscriptionHistory: ["mokafaat", "subscription", "history"] as const,
  pointsBalance: ["mokafaat", "points", "balance"] as const,
  pointsHistory: ["mokafaat", "points", "history"] as const,
  wallet: ["mokafaat", "wallet"] as const,
  walletBalance: ["mokafaat", "wallet", "balance"] as const,
  walletHistory: ["mokafaat", "wallet", "history"] as const,
  profile: ["mokafaat", "profile"] as const,
  membershipVerify: (membershipNumber: string) =>
    ["mokafaat", "membership", "verify", membershipNumber] as const,
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

// ========== Filters (لتصفية العروض حسب التصنيف) ==========
export function useFilters(categoryId: string | number | null | undefined) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: categoryId
      ? [...mokafaatKeys.filters(categoryId), lang]
      : (["mokafaat", "filters", "none", lang] as const),
    queryFn: () => filtersApi.get(categoryId!).then((r) => r.data),
    enabled: !!categoryId,
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

export function useWebOfferDetail(id?: string | number) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: id
      ? [...mokafaatKeys.webOfferDetail(id), lang]
      : (["mokafaat", "web", "offers", "none", lang] as const),
    queryFn: () => webApi.offerDetail(id as string | number).then((r) => r.data),
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
export function useOrders(orderType?: string, options?: { enabled?: boolean }) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.orders(orderType), lang],
    queryFn: () =>
      ordersApi
        .list(orderType as "offer" | "card" | "coupon")
        .then((r) => r.data),
    enabled: options?.enabled !== false,
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

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      order_type: "offer" | "card";
      item_id: string | number;
      quantity: number;
      branch_id?: string | number;
      order_id?: string | number;
    }) => ordersApi.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mokafaat", "orders"] });
    },
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

/** GET /api/cards/:id — تفاصيل البطاقة (لصفحة البطاقة) */
export function useCardDetail(cardId: string | undefined) {
  return useQuery({
    queryKey: cardId ? mokafaatKeys.cardDetail(cardId) : ["mokafaat", "cards", "detail", "skip"],
    queryFn: () => cardsApi.detail(cardId!).then((r) => r.data),
    enabled: !!cardId,
  });
}

/** GET /api/cards/by-merchant/:id — تفاصيل التاجر وبطاقاته */
export function useCardsByMerchant(
  merchantId: string | undefined,
  params?: Record<string, unknown>
) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: merchantId
      ? [...mokafaatKeys.cardsByMerchant(merchantId, params), lang]
      : ["mokafaat", "cards", "byMerchant", "skip"],
    queryFn: () => cardsApi.byMerchant(merchantId!, params).then((r) => r.data),
    enabled: !!merchantId,
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

export function useWebCouponCategories(categorySlug: string) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webCouponCategories(categorySlug), lang],
    queryFn: () => webApi.categoryCoupons(categorySlug).then((r) => r.data),
    enabled: !!categorySlug,
  });
}

export function useWebNews() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.webNews, lang],
    queryFn: () => webApi.news().then((r) => r.data),
  });
}

// ========== App Config (GET /api/app-config) ==========
export function useAppConfig() {
  return useQuery({
    queryKey: mokafaatKeys.appConfig,
    queryFn: () => appConfigApi.get().then((r) => r.data),
  });
}

// ========== Locations ==========
/** الـ API يرجع { data: { countries|regions|cities: [...] } } وليس مصفوفة مباشرة */
export function normalizeLocationListResponse(
  payload: unknown,
  listKey: "countries" | "regions" | "cities",
): { id: number | string; name?: string; code?: string }[] {
  if (payload == null) return [];
  if (Array.isArray(payload)) {
    return payload as { id: number | string; name?: string; code?: string }[];
  }
  if (typeof payload !== "object") return [];
  const o = payload as Record<string, unknown>;
  if (Array.isArray(o[listKey])) {
    return o[listKey] as { id: number | string; name?: string; code?: string }[];
  }
  const inner = o.data;
  if (inner && typeof inner === "object") {
    const d = inner as Record<string, unknown>;
    if (Array.isArray(d[listKey])) {
      return d[listKey] as {
        id: number | string;
        name?: string;
        code?: string;
      }[];
    }
  }
  if (Array.isArray(inner)) {
    return inner as { id: number | string; name?: string; code?: string }[];
  }
  return [];
}

export function useCountries() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.countries, lang],
    queryFn: () =>
      locationsApi
        .countries()
        .then((r) => normalizeLocationListResponse(r.data, "countries")),
  });
}

/** تفعيل الطلب حتى لو id === 0 (!!0 كان يعطي false ويكسر المناطق/المدن) */
function locationQueryEnabled(id: string | number | null | undefined) {
  if (id == null) return false;
  if (typeof id === "string") return id.length > 0;
  return true;
}

export function useRegions(id: string | number | null) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.regions(id ?? 0), lang],
    queryFn: () =>
      locationsApi
        .regions(id as string | number)
        .then((r) => normalizeLocationListResponse(r.data, "regions")),
    enabled: locationQueryEnabled(id),
  });
}

export function useCities(id: string | number | null) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.cities(id ?? 0), lang],
    queryFn: () =>
      locationsApi
        .cities(id as string | number)
        .then((r) => normalizeLocationListResponse(r.data, "cities")),
    enabled: locationQueryEnabled(id),
  });
}

// ========== Subscription ==========
export function useSubscriptionPlans() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.subscriptionPlans, lang],
    queryFn: () => subscriptionApi.plans().then((r) => r.data),
  });
}

export function useSubscriptionStatus(enabled = true) {
  return useQuery({
    queryKey: mokafaatKeys.subscriptionStatus,
    queryFn: () => subscriptionApi.status().then((r) => r.data),
    enabled,
  });
}

export function useSubscriptionHistory() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.subscriptionHistory, lang],
    queryFn: () => subscriptionApi.history().then((r) => r.data),
  });
}

/** GET /api/membership/verify/{membership_number} — للتحقق من العضوية (صفحة مسح QR، بدون توكن) */
export function useMembershipVerify(membershipNumber: string | undefined) {
  return useQuery({
    queryKey: membershipNumber
      ? mokafaatKeys.membershipVerify(membershipNumber)
      : ["mokafaat", "membership", "verify", "skip"],
    queryFn: () =>
      membershipApi.verify(membershipNumber!).then((r) => r.data),
    enabled: !!membershipNumber && membershipNumber.length > 0,
  });
}

export function useSubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      planId,
      paymentMethod,
      useWallet,
    }: {
      planId: string | number;
      paymentMethod?: "online" | "cash" | "bank";
      useWallet?: boolean;
    }) => subscriptionApi.subscribe(planId, paymentMethod, useWallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.subscriptionStatus });
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.subscriptionHistory });
    },
  });
}

// ========== Payment callback (after gateway redirect) ==========
export function usePaymentCallback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: string; status: string }) =>
      paymentApi.callback(params).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.subscriptionStatus });
      queryClient.invalidateQueries({ queryKey: ["mokafaat", "orders"] });
    },
  });
}

// ========== Points ==========
export function usePointsBalance() {
  return useQuery({
    queryKey: mokafaatKeys.pointsBalance,
    queryFn: () => pointsApi.balance().then((r) => r.data),
  });
}

export function usePointsHistory() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.pointsHistory, lang],
    queryFn: () => pointsApi.history().then((r) => r.data),
  });
}

export function usePointsRedeem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params?: { amount?: number }) => pointsApi.redeem(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.pointsBalance });
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.pointsHistory });
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.wallet });
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.walletBalance });
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.walletHistory });
    },
  });
}

// ========== Wallet ==========
export function useWallet() {
  return useQuery({
    queryKey: mokafaatKeys.wallet,
    queryFn: () => walletApi.get().then((r) => r.data),
  });
}

export function useWalletBalance() {
  return useQuery({
    queryKey: mokafaatKeys.walletBalance,
    queryFn: () => walletApi.balance().then((r) => r.data),
  });
}

export function useWalletHistory() {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.walletHistory, lang],
    queryFn: () => walletApi.history().then((r) => r.data),
  });
}

// ========== Profile ==========
export function useProfile(enabled = true) {
  const lang = useQueryLang();
  return useQuery({
    queryKey: [...mokafaatKeys.profile, lang],
    queryFn: () => profileApi.get().then((r) => r.data),
    enabled,
  });
}

export function useProfileUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Parameters<typeof profileApi.update>[0]) =>
      profileApi.update(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mokafaatKeys.profile });
    },
  });
}
