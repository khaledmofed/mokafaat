import { Pro1, Pro2, Pro3, Pro4, Pro5, Pro6, Pro7, Pro8 } from "@assets";

// فئات العروض
export const offerCategories = [
  {
    key: "restaurants",
    ar: "المطاعم",
    en: "Restaurants",
    icon: "🍽️",
    color: "#f59e0b",
  },
  {
    key: "cafes",
    ar: "الكافيهات",
    en: "Cafes",
    icon: "☕",
    color: "#8b5cf6",
  },
  {
    key: "entertainment",
    ar: "الترفيه",
    en: "Entertainment",
    icon: "🎮",
    color: "#ef4444",
  },
  {
    key: "shopping",
    ar: "التسوق",
    en: "Shopping",
    icon: "🛍️",
    color: "#10b981",
  },
  {
    key: "hotels",
    ar: "الفنادق",
    en: "Hotels",
    icon: "🏥",
    color: "#06b6d4",
  },
  {
    key: "cars",
    ar: "السيارات",
    en: "Cars",
    icon: "🔧",
    color: "#f97316",
  },
  {
    key: "Services",
    ar: "خدمات",
    en: "Services",
    icon: "🔧",
    color: "#06b6d4",
  },
];

// واجهة الشركة/المطعم
export interface Company {
  id: string;
  name: { ar: string; en: string };
  slug: string;
  logo: string;
  category: {
    key: string;
    ar: string;
    en: string;
  };
  description: { ar: string; en: string };
  location: { ar: string; en: string };
  distance: string;
  rating: number;
  reviewsCount: number;
  views: number;
  saves: number;
  color: string;
  topColor: string;
  isOpen: boolean;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// واجهة العرض
export interface Offer {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  validity: { ar: string; en: string };
  features: string[];
  rating: number;
  reviewsCount: number;
  views: number;
  downloads: number;
  purchases: number;
  bookmarks: number;
  isPopular: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  category: string;
  companyId: string;
  availableUntil: string;
  maxQuantity: number;
  terms: { ar: string; en: string };
  isTodayOffer?: boolean;
}

// بيانات الشركات
export const companies: Company[] = [
  {
    id: "hunger-station",
    name: { ar: "هنجر ستيشن", en: "Hunger Station" },
    slug: "hunger-station",
    logo: "Pro3",
    category: {
      key: "restaurants",
      ar: "المطاعم",
      en: "Restaurants",
    },
    description: {
      ar: "مطعم متخصص في الوجبات السريعة والبرجر الطازج",
      en: "Specialized restaurant in fresh fast food and burgers",
    },
    location: { ar: "شارع التحلية", en: "Al Tahlia Street" },
    distance: "1.0 KM",
    rating: 4.9,
    reviewsCount: 234,
    views: 1270,
    saves: 168,
    color: "#fbbf24",
    topColor: "bg-yellow-500",
    isOpen: true,
    deliveryTime: "25-35 دقيقة",
    minimumOrder: 50,
    deliveryFee: 15,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "stc",
    name: { ar: "اتصالات", en: "STC" },
    slug: "stc",
    logo: "Pro1",
    category: {
      key: "services",
      ar: "الخدمات",
      en: "Services",
    },
    description: {
      ar: "شركة الاتصالات السعودية - خدمات متنوعة",
      en: "Saudi Telecom Company - Various services",
    },
    location: { ar: "الرياض", en: "Riyadh" },
    distance: "2.5 KM",
    rating: 4.7,
    reviewsCount: 189,
    views: 980,
    saves: 120,
    color: "#10b981",
    topColor: "bg-green-500",
    isOpen: true,
    deliveryTime: "فوري",
    minimumOrder: 0,
    deliveryFee: 0,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "shahid",
    name: { ar: "شاهد", en: "Shahid" },
    slug: "shahid",
    logo: "Pro2",
    category: {
      key: "entertainment",
      ar: "الترفيه",
      en: "Entertainment",
    },
    description: {
      ar: "منصة البث المباشر الرائدة في الشرق الأوسط",
      en: "Leading streaming platform in the Middle East",
    },
    location: { ar: "عبر الإنترنت", en: "Online" },
    distance: "0 KM",
    rating: 4.8,
    reviewsCount: 456,
    views: 2100,
    saves: 320,
    color: "#ef4444",
    topColor: "bg-red-500",
    isOpen: true,
    deliveryTime: "فوري",
    minimumOrder: 0,
    deliveryFee: 0,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "starbucks",
    name: { ar: "ستاربكس", en: "Starbucks" },
    slug: "starbucks",
    logo: "Pro4",
    category: {
      key: "cafes",
      ar: "الكافيهات",
      en: "Cafes",
    },
    description: {
      ar: "سلسلة مقاهي عالمية مشهورة بالقهوة المميزة",
      en: "Global coffee chain famous for premium coffee",
    },
    location: { ar: "شارع الملك فهد", en: "King Fahd Street" },
    distance: "0.8 KM",
    rating: 4.6,
    reviewsCount: 312,
    views: 1450,
    saves: 200,
    color: "#8b5cf6",
    topColor: "bg-purple-500",
    isOpen: true,
    deliveryTime: "15-25 دقيقة",
    minimumOrder: 30,
    deliveryFee: 10,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "dalma-mall",
    name: { ar: "دلم مول", en: "Dalma Mall" },
    slug: "dalma-mall",
    logo: "Pro5",
    category: {
      key: "shopping",
      ar: "التسوق",
      en: "Shopping",
    },
    description: {
      ar: "مركز تسوق متكامل مع أفضل الماركات العالمية",
      en: "Integrated shopping center with the best international brands",
    },
    location: { ar: "شارع العليا", en: "Al Olaya Street" },
    distance: "3.2 KM",
    rating: 4.5,
    reviewsCount: 178,
    views: 890,
    saves: 95,
    color: "#7c3aed",
    topColor: "bg-purple-600",
    isOpen: true,
    deliveryTime: "30-45 دقيقة",
    minimumOrder: 100,
    deliveryFee: 20,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "gathern",
    name: { ar: "جاذرن", en: "Gathern" },
    slug: "gathern",
    logo: "Pro6",
    category: {
      key: "entertainment",
      ar: "الترفيه",
      en: "Entertainment",
    },
    description: {
      ar: "منصة ترفيهية متنوعة للألعاب والمحتوى",
      en: "Diverse entertainment platform for games and content",
    },
    location: { ar: "عبر الإنترنت", en: "Online" },
    distance: "0 KM",
    rating: 4.4,
    reviewsCount: 123,
    views: 650,
    saves: 80,
    color: "#f97316",
    topColor: "bg-orange-500",
    isOpen: true,
    deliveryTime: "فوري",
    minimumOrder: 0,
    deliveryFee: 0,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "care-plus",
    name: { ar: "كير بلس", en: "Care Plus" },
    slug: "care-plus",
    logo: "Pro7",
    category: {
      key: "hotels",
      ar: "الفنادق",
      en: "Hotels",
    },
    description: {
      ar: "مركز صحي متكامل للعناية والعلاج",
      en: "Integrated health center for care and treatment",
    },
    location: { ar: "شارع الملك عبدالعزيز", en: "King Abdulaziz Street" },
    distance: "1.8 KM",
    rating: 4.7,
    reviewsCount: 89,
    views: 420,
    saves: 45,
    color: "#06b6d4",
    topColor: "bg-cyan-500",
    isOpen: true,
    deliveryTime: "20-30 دقيقة",
    minimumOrder: 0,
    deliveryFee: 0,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: "uber",
    name: { ar: "أوبر", en: "Uber" },
    slug: "uber",
    logo: "Pro8",
    category: {
      key: "services",
      ar: "الخدمات",
      en: "Services",
    },
    description: {
      ar: "خدمة النقل والمواصلات الذكية",
      en: "Smart transportation and mobility service",
    },
    location: { ar: "جميع أنحاء المملكة", en: "All over the Kingdom" },
    distance: "متاح",
    rating: 4.6,
    reviewsCount: 567,
    views: 1800,
    saves: 250,
    color: "#1f2937",
    topColor: "bg-gray-800",
    isOpen: true,
    deliveryTime: "5-15 دقيقة",
    minimumOrder: 0,
    deliveryFee: 0,
    coordinates: { lat: 24.7136, lng: 46.6753 },
  },
];

// بيانات العروض
export const offers: Offer[] = [
  // عروض هنجر ستيشن
  {
    id: "hunger-burger-50",
    title: { ar: "خصم 50% على البرجر", en: "50% off on Burgers" },
    description: {
      ar: "احصل على خصم 50% على جميع أنواع البرجر الطازج",
      en: "Get 50% off on all types of fresh burgers",
    },
    image: "Pro3",
    originalPrice: 450,
    discountPrice: 225,
    discountPercentage: 50,
    validity: { ar: "30 يوم", en: "30 days" },
    features: ["برجر طازج", "بطاطس مقرمشة", "مشروب مجاني", "توصيل سريع"],
    rating: 4.9,
    reviewsCount: 234,
    views: 1270,
    downloads: 168,
    purchases: 89,
    bookmarks: 45,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    category: "restaurants",
    companyId: "hunger-station",
    availableUntil: "2024-12-31",
    maxQuantity: 5,
    terms: {
      ar: "الخصم لا يطبق على الطلبات الخارجية",
      en: "Discount does not apply to external orders",
    },
    isTodayOffer: true,
  },
  {
    id: "hunger-pizza-30",
    title: { ar: "خصم 30% على البيتزا", en: "30% off on Pizza" },
    description: {
      ar: "استمتع بخصم 30% على جميع أنواع البيتزا",
      en: "Enjoy 30% off on all types of pizza",
    },
    image: "Pro3",
    originalPrice: 350,
    discountPrice: 245,
    discountPercentage: 30,
    validity: { ar: "15 يوم", en: "15 days" },
    features: ["بيتزا طازجة", "جبنة مميزة", "توصيل مجاني"],
    rating: 4.7,
    reviewsCount: 156,
    views: 890,
    downloads: 120,
    purchases: 67,
    bookmarks: 32,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    category: "restaurants",
    companyId: "hunger-station",
    availableUntil: "2024-12-15",
    maxQuantity: 3,
    terms: {
      ar: "الحد الأدنى للطلب 100 ريال",
      en: "Minimum order 100 SAR",
    },
  },
  // عروض STC
  {
    id: "stc-data-25",
    title: { ar: "خصم 25% على باقات البيانات", en: "25% off on Data Packages" },
    description: {
      ar: "احصل على خصم 25% على جميع باقات البيانات",
      en: "Get 25% off on all data packages",
    },
    image: "Pro1",
    originalPrice: 200,
    discountPrice: 150,
    discountPercentage: 25,
    validity: { ar: "60 يوم", en: "60 days" },
    features: ["بيانات غير محدودة", "سرعة عالية", "تغطية شاملة"],
    rating: 4.7,
    reviewsCount: 189,
    views: 980,
    downloads: 120,
    purchases: 78,
    bookmarks: 40,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    category: "services",
    companyId: "stc",
    availableUntil: "2024-12-31",
    maxQuantity: 10,
    terms: {
      ar: "يجب تفعيل الباقة خلال 7 أيام",
      en: "Package must be activated within 7 days",
    },
  },
  // عروض شاهد
  {
    id: "shahid-premium-40",
    title: {
      ar: "خصم 40% على الاشتراك المميز",
      en: "40% off on Premium Subscription",
    },
    description: {
      ar: "احصل على خصم 40% على الاشتراك المميز لمدة 6 أشهر",
      en: "Get 40% off on premium subscription for 6 months",
    },
    image: "Pro2",
    originalPrice: 300,
    discountPrice: 180,
    discountPercentage: 40,
    validity: { ar: "6 أشهر", en: "6 months" },
    features: ["محتوى حصري", "جودة عالية", "بدون إعلانات", "تحميل للعرض"],
    rating: 4.8,
    reviewsCount: 456,
    views: 2100,
    downloads: 320,
    purchases: 156,
    bookmarks: 89,
    isPopular: true,
    isNew: true,
    isBestSeller: true,
    category: "entertainment",
    companyId: "shahid",
    availableUntil: "2024-12-31",
    maxQuantity: 1,
    terms: {
      ar: "الاشتراك قابل للتجديد التلقائي",
      en: "Subscription is auto-renewable",
    },
    isTodayOffer: true,
  },
  // عروض ستاربكس
  {
    id: "starbucks-coffee-35",
    title: { ar: "خصم 35% على القهوة", en: "35% off on Coffee" },
    description: {
      ar: "استمتع بخصم 35% على جميع أنواع القهوة",
      en: "Enjoy 35% off on all types of coffee",
    },
    image: "Pro4",
    originalPrice: 45,
    discountPrice: 29,
    discountPercentage: 35,
    validity: { ar: "7 أيام", en: "7 days" },
    features: ["قهوة طازجة", "حجم كبير", "توصيل سريع"],
    rating: 4.6,
    reviewsCount: 312,
    views: 1450,
    downloads: 200,
    purchases: 134,
    bookmarks: 67,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    category: "cafes",
    companyId: "starbucks",
    availableUntil: "2024-12-10",
    maxQuantity: 5,
    terms: {
      ar: "يجب استخدام الكوبون في نفس اليوم",
      en: "Coupon must be used on the same day",
    },
  },
  {
    id: "starbucks-coffee-25",
    title: { ar: "خصم 25% على القهوة", en: "25% off on Coffee" },
    description: {
      ar: "استمتع بخصم 25% على جميع أنواع القهوة",
      en: "Enjoy 25% off on all types of coffee",
    },
    image: "Pro4",
    originalPrice: 50,
    discountPrice: 37,
    discountPercentage: 25,
    validity: { ar: "5 أيام", en: "5 days" },
    features: ["قهوة طازجة", "حجم متوسط", "توصيل سريع"],
    rating: 4.5,
    reviewsCount: 280,
    views: 1200,
    downloads: 150,
    purchases: 98,
    bookmarks: 45,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    category: "cafes",
    companyId: "starbucks",
    availableUntil: "2024-12-08",
    maxQuantity: 3,
    terms: {
      ar: "يجب استخدام الكوبون في نفس اليوم",
      en: "Coupon must be used on the same day",
    },
  },
  // عروض دلم مول
  {
    id: "dalma-fashion-20",
    title: { ar: "خصم 20% على الأزياء", en: "20% off on Fashion" },
    description: {
      ar: "احصل على خصم 20% على جميع الأزياء والملابس",
      en: "Get 20% off on all fashion and clothing",
    },
    image: "Pro5",
    originalPrice: 500,
    discountPrice: 400,
    discountPercentage: 20,
    validity: { ar: "45 يوم", en: "45 days" },
    features: ["ماركات عالمية", "جودة عالية", "توصيل مجاني"],
    rating: 4.5,
    reviewsCount: 178,
    views: 890,
    downloads: 95,
    purchases: 45,
    bookmarks: 23,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    category: "shopping",
    companyId: "dalma-mall",
    availableUntil: "2024-12-20",
    maxQuantity: 2,
    terms: {
      ar: "الخصم لا يطبق على المنتجات المخصومة مسبقاً",
      en: "Discount does not apply to already discounted items",
    },
  },
  // عروض جاذرن
  {
    id: "gathern-games-50",
    title: { ar: "خصم 50% على الألعاب", en: "50% off on Games" },
    description: {
      ar: "احصل على خصم 50% على جميع الألعاب والملحقات",
      en: "Get 50% off on all games and accessories",
    },
    image: "Pro6",
    originalPrice: 200,
    discountPrice: 100,
    discountPercentage: 50,
    validity: { ar: "21 يوم", en: "21 days" },
    features: ["ألعاب حديثة", "ملحقات مجانية", "تحديثات مجانية"],
    rating: 4.4,
    reviewsCount: 123,
    views: 650,
    downloads: 80,
    purchases: 34,
    bookmarks: 18,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    category: "entertainment",
    companyId: "gathern",
    availableUntil: "2024-12-25",
    maxQuantity: 3,
    terms: {
      ar: "الألعاب قابلة للتحميل مرة واحدة فقط",
      en: "Games are downloadable only once",
    },
  },
  // عروض كير بلس
  {
    id: "care-checkup-30",
    title: { ar: "خصم 30% على الفحص الشامل", en: "30% off on Full Checkup" },
    description: {
      ar: "احصل على خصم 30% على الفحص الطبي الشامل",
      en: "Get 30% off on comprehensive medical checkup",
    },
    image: "Pro7",
    originalPrice: 800,
    discountPrice: 560,
    discountPercentage: 30,
    validity: { ar: "90 يوم", en: "90 days" },
    features: ["فحص شامل", "تقارير مفصلة", "استشارة مجانية"],
    rating: 4.7,
    reviewsCount: 89,
    views: 420,
    downloads: 45,
    purchases: 23,
    bookmarks: 12,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    category: "hotels",
    companyId: "care-plus",
    availableUntil: "2024-12-31",
    maxQuantity: 1,
    terms: {
      ar: "يجب حجز الموعد مسبقاً",
      en: "Appointment must be booked in advance",
    },
  },
  // عروض أوبر
  {
    id: "uber-rides-15",
    title: { ar: "خصم 15% على الرحلات", en: "15% off on Rides" },
    description: {
      ar: "احصل على خصم 15% على جميع رحلات أوبر",
      en: "Get 15% off on all Uber rides",
    },
    image: "Pro8",
    originalPrice: 100,
    discountPrice: 85,
    discountPercentage: 15,
    validity: { ar: "14 يوم", en: "14 days" },
    features: ["رحلات آمنة", "سائقين معتمدين", "تتبع مباشر"],
    rating: 4.6,
    reviewsCount: 567,
    views: 1800,
    downloads: 250,
    purchases: 189,
    bookmarks: 95,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    category: "cars",
    companyId: "uber",
    availableUntil: "2024-12-18",
    maxQuantity: 10,
    terms: {
      ar: "الخصم يطبق على أول 5 رحلات فقط",
      en: "Discount applies to first 5 rides only",
    },
  },
];

// دوال مساعدة
export const getCompaniesByCategory = (categoryKey: string): Company[] => {
  if (categoryKey === "all") {
    return companies;
  }
  return companies.filter((company) => company.category.key === categoryKey);
};

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find((company) => company.id === id);
};

export const getOffersByCompany = (companyId: string): Offer[] => {
  return offers.filter((offer) => offer.companyId === companyId);
};

export const getOffersByCategory = (categoryKey: string): Offer[] => {
  if (categoryKey === "all") {
    return offers;
  }
  return offers.filter((offer) => offer.category === categoryKey);
};

export const getOfferById = (id: string): Offer | undefined => {
  return offers.find((offer) => offer.id === id);
};

export const getAllOffers = (): Offer[] => {
  return offers;
};

export const getFilteredOffers = (filter: string): Offer[] => {
  switch (filter) {
    case "all":
      return offers;
    case "today":
      return offers.filter((offer) => offer.isTodayOffer);
    case "new":
      return offers.filter((offer) => offer.isNew);
    case "bestseller":
      return offers.filter((offer) => offer.isBestSeller);
    case "popular":
      return offers.filter((offer) => offer.isPopular);
    case "nearby":
      // محاكاة العروض القريبة
      return offers.slice(0, 6);
    case "most_visited":
      return offers.sort((a, b) => b.views - a.views).slice(0, 8);
    case "top_rated":
      return offers.sort((a, b) => b.rating - a.rating).slice(0, 8);
    default:
      return offers;
  }
};

export const getPopularOffers = (): Offer[] => {
  return offers.filter((offer) => offer.isPopular);
};

export const getNewOffers = (): Offer[] => {
  return offers.filter((offer) => offer.isNew);
};

export const getBestSellerOffers = (): Offer[] => {
  return offers.filter((offer) => offer.isBestSeller);
};

export const getTodayOffers = (): Offer[] => {
  return offers.filter((offer) => offer.isTodayOffer);
};

export const getHighestRatedOffers = (): Offer[] => {
  return offers.sort((a, b) => b.rating - a.rating).slice(0, 8);
};

export const getMostViewedOffers = (): Offer[] => {
  return offers.sort((a, b) => b.views - a.views).slice(0, 8);
};

export const getMostPurchasedOffers = (): Offer[] => {
  return offers.sort((a, b) => b.purchases - a.purchases).slice(0, 8);
};

// دالة للحصول على صورة العرض
export const getOfferImage = (imageName: string) => {
  switch (imageName) {
    case "Pro1":
      return Pro1;
    case "Pro2":
      return Pro2;
    case "Pro3":
      return Pro3;
    case "Pro4":
      return Pro4;
    case "Pro5":
      return Pro5;
    case "Pro6":
      return Pro6;
    case "Pro7":
      return Pro7;
    case "Pro8":
      return Pro8;
    default:
      return Pro1;
  }
};

// دالة للحصول على صورة الشركة
export const getCompanyImage = (imageName: string) => {
  return getOfferImage(imageName);
};
