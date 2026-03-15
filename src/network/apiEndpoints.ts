/**
 * Mokafaat API Endpoints - مطابقة كوليكشن Postman
 * Base: https://mokafat.ivadso.com
 */

const API = "/api";

export const API_ENDPOINTS = {
  // ========== Auth ==========
  auth: {
    sendOtp: `${API}/auth/send-otp`,
    verifyOtp: `${API}/auth/verify-otp`,
    logout: `${API}/auth/logout`,
    completeProfile: `${API}/auth/complete-profile`,
    setLocation: `${API}/auth/set-location`,
    setInterests: `${API}/auth/set-interests`,
  },

  // ========== User / Favorites & Settings ==========
  favorites: `${API}/favorites`,
  favoritesToggle: `${API}/favorites/toggle`,
  settings: `${API}/settings`,
  appConfig: `${API}/app-config`,
  settingsUpdateLanguage: `${API}/settings/update-language`,
  settingsUpdate: `${API}/settings/update`,

  // ========== Pages (refund-policy, terms, etc.) ==========
  pages: `${API}/pages`,
  pageDetail: (slug: string) => `${API}/pages/${slug}`,

  // ========== General ==========
  categories: `${API}/categories`,
  locations: {
    countries: `${API}/locations/countries`,
    regions: (id: string | number) => `${API}/locations/regions/${id}`,
    cities: (id: string | number) => `${API}/locations/cities/${id}`,
  },

  // ========== Home & Discovery ==========
  home: `${API}/home`,
  filters: (categoryId: string | number) => `${API}/filters/${categoryId}`,
  offersByCategory: (categoryId: string | number) =>
    `${API}/offers-by-category/${categoryId}`,
  search: `${API}/search`,
  filterOptions: `${API}/filter-options`,
  offerDetail: (id: string | number) => `${API}/offers/${id}`,

  // ========== Merchants ==========
  merchantDetail: (id: string | number) => `${API}/merchants/${id}`,
  merchantFollow: (id: string | number) => `${API}/merchants/${id}/follow`,
  merchantReview: `${API}/merchants/review`,

  // ========== Points ==========
  points: {
    balance: `${API}/points/balance`,
    history: `${API}/points/history`,
    redeem: `${API}/points/redeem`,
  },

  // ========== Wallet ==========
  wallet: `${API}/wallet`,
  walletBalance: `${API}/wallet/balance`,
  walletHistory: `${API}/wallet/history`,

  // ========== Profile ==========
  profile: `${API}/profile`,
  profileUpdate: `${API}/profile/update`,

  // ========== Subscription ==========
  subscription: {
    plans: `${API}/subscription/plans`,
    subscribe: `${API}/subscription/subscribe`,
    status: `${API}/subscription/status`,
    history: `${API}/subscription/history`,
  },

  // ========== Membership (تحقق من العضوية — عام، بدون توكن) ==========
  membership: {
    verify: (membershipNumber: string) =>
      `${API}/membership/verify/${encodeURIComponent(membershipNumber)}`,
  },
  // ========== Payment (callback after gateway redirect) ==========
  paymentCallback: `${API}/payment/callback`,

  // ========== Orders ==========
  orders: `${API}/orders`,
  orderDetail: (id: string | number) => `${API}/orders/${id}`,

  // ========== Coupons (app) ==========
  coupons: {
    home: `${API}/coupons/home`,
    search: `${API}/coupons/search`,
    byCategory: (id: string | number) => `${API}/coupons/by-category/${id}`,
    byMerchant: (id: string | number) => `${API}/coupons/by-merchant/${id}`,
    detail: (id: string | number) => `${API}/coupons/${id}`,
    use: (id: string | number) => `${API}/coupons/${id}/use`,
  },

  // ========== Cards (app) ==========
  cards: {
    home: `${API}/cards/home`,
    search: `${API}/cards/search`,
    byCategory: (id: string | number) => `${API}/cards/by-category/${id}`,
    byMerchant: (id: string | number) => `${API}/cards/by-merchant/${id}`,
    detail: (id: string | number) => `${API}/cards/${id}`,
  },

  // ========== Web (public - للوحة ويب) — مطابقة كوليكشن Website ==========
  web: {
    home: `${API}/web/home`,
    about: `${API}/web/about`,
    contact: `${API}/web/contact`,
    cards: `${API}/web/cards`,
    cardDetail: (id: string | number) => `${API}/web/cards/${id}`,
    categoriesCards: (platformSlug: string) =>
      `${API}/web/categories/${platformSlug}/cards`,
    news: `${API}/web/news`,
    newsDetail: (slug: string) => `${API}/web/news/${slug}`,
    newsByCategory: (categorySlug: string) =>
      `${API}/web/news/categories/${categorySlug}`,
    coupons: `${API}/web/coupons`,
    couponDetail: (id: string | number) => `${API}/web/coupons/${id}`,
    categoryCoupons: (categorySlug: string) =>
      `${API}/web/categories/${categorySlug}/coupons`,
    offers: `${API}/web/offers`,
    offerDetail: (id: string | number) => `${API}/web/offers/${id}`,
  },

  // ========== توافق مع الكود القديم — لا تستخدم مع سيرفر مكافآت (ليس في الكوليكشن) ==========
  getAboutUs: "/website/aboutUs",
  /** @deprecated غير موجود في API مكافآت — استخدم API_ENDPOINTS.web.home واستخرج contact إن وُجد */
  getContactInfos: "/website/contactInfos",
  getGallery: "/website/v2/gallery",
  getServices: "/website/services",
  getEvents: "/website/events?",
  getClients: "/website/clients",
  getPrivacyPolicy: "/website/privacyPolicy",
  getTermsConditions: "/website/termsConditions",
  getCities: "/cities",
  getDepartments: "/departments/users",
  getWorkTypes: "/workTypes",
  registerJobSeeker: "/jobSeekers/regsiter",
  sendTechSupportMessage: "/techSupport/create",
  confirmEmail: "/auth/confirmEmail",
  getJobs: "/website/jobs",
  sendCompanyApplication: "/website/company-application",
  getContract: (contractId: string) => `/website/contract/${contractId}`,
  signContract: "/website/sign-contract",
  getContractTemplate: "/website/get-contract-template",
  getContractFont: "/website/get-contract-font",
  getRatingQuestions: (userId: number) =>
    `/rating/get-user-questions?userId=${userId}`,
  submitRating: "/rating/submit",
  getProjects: "/website/v2/projects?",
  getProject: (projectId: string) => `/website/v2/projects/${projectId}`,
  getUpcomingProjects: "/website/v2/projects/upcoming?",
  verifyEmail: "/website/verify_email",
  verifyOtp: "/website/verify_otp",
  uploadFreelancerIntroVideo: "/website/upload_freelancer_intro_video",
  businessRegistration: "/clients/register",
} as const;
