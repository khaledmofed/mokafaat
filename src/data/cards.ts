export interface CardCompany {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  logo: string;
  category: {
    key: string;
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  color: string;
  offers: CardOffer[];
}

export interface CardOffer {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  price: number;
  originalPrice?: number;
  currency: string;
  validity: {
    ar: string;
    en: string;
  };
  features: string[];
  image: string;
  rating: number;
  purchases: number;
  views: number;
  downloads: number;
  bookmarks: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export const cardCategories = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "telecommunications", ar: "الاتصالات", en: "Telecommunications" },
  { key: "tv_channels", ar: "قنوات تلفزيون", en: "TV Channels" },
  { key: "stores", ar: "متاجر", en: "Stores" },
  { key: "games", ar: "ألعاب", en: "Games" },
  { key: "food_delivery", ar: "توصيل طعام", en: "Food Delivery" },
  { key: "entertainment", ar: "ترفيه", en: "Entertainment" },
];

export const cardCompanies: CardCompany[] = [
  {
    id: "stc",
    name: { ar: "STC Pay", en: "STC Pay" },
    logo: "Cards1",
    category: {
      key: "telecommunications",
      ar: "الاتصالات",
      en: "Telecommunications",
    },
    description: {
      ar: "خدمات الدفع الإلكتروني والاتصالات من STC",
      en: "Electronic payment and telecommunications services from STC",
    },
    color: "#400198",
    offers: [
      {
        id: "stc-tv-3months",
        title: { ar: "STC TV 3 أشهر", en: "STC TV 3 Months" },
        description: {
          ar: "أفلام. مسلسلات. قنوات تلفزيون",
          en: "Movies. Series. TV Channels",
        },
        price: 100,
        originalPrice: 150,
        currency: "SAR",
        validity: { ar: "3 أشهر", en: "3 Months" },
        features: ["أفلام", "مسلسلات", "قنوات تلفزيون", "بث مباشر"],
        image: "Cards6",
        rating: 5.0,
        purchases: 17,
        views: 1270,
        downloads: 1270,
        bookmarks: 168,
        isPopular: true,
      },
      {
        id: "stc-tv-classic-3months",
        title: { ar: "STC TV Classic 3 أشهر", en: "STC TV Classic 3 Months" },
        description: {
          ar: "باقة كلاسيكية شاملة",
          en: "Comprehensive classic package",
        },
        price: 250,
        originalPrice: 300,
        currency: "SAR",
        validity: { ar: "3 أشهر", en: "3 Months" },
        features: ["قنوات إضافية", "محتوى حصري", "جودة عالية"],
        image: "Cards7",
        rating: 4.8,
        purchases: 12,
        views: 890,
        downloads: 890,
        bookmarks: 95,
        isPopular: false,
      },
      {
        id: "stc-minutes-package",
        title: {
          ar: "حزم دقائق شهرية متجددة",
          en: "Monthly Renewable Minutes Package",
        },
        description: { ar: "250 دقيقة مجانية", en: "250 Free Minutes" },
        price: 125,
        originalPrice: 180,
        currency: "SAR",
        validity: { ar: "شهرية", en: "Monthly" },
        features: ["متجددة", "دقائق مجانية", "تغطية شاملة"],
        image: "Cards8",
        rating: 4.9,
        purchases: 25,
        views: 1560,
        downloads: 1560,
        bookmarks: 203,
        isNew: true,
      },
    ],
  },
  {
    id: "shahid",
    name: { ar: "شاهد", en: "Shahid" },
    logo: "Cards13",
    category: { key: "tv_channels", ar: "قنوات تلفزيون", en: "TV Channels" },
    description: {
      ar: "منصة البث الرقمي الرائدة في الشرق الأوسط",
      en: "Leading digital streaming platform in the Middle East",
    },
    color: "#00C851",
    offers: [
      {
        id: "shahid-vip-monthly",
        title: { ar: "باقة VIP", en: "VIP Package" },
        description: { ar: "اشتراك شهر", en: "Monthly Subscription" },
        price: 29.99,
        originalPrice: 39.99,
        currency: "SAR",
        validity: { ar: "شهري", en: "Monthly" },
        features: ["محتوى حصري", "بدون إعلانات", "جودة 4K"],
        image: "Cards13",
        rating: 4.7,
        purchases: 45,
        views: 2100,
        downloads: 2100,
        bookmarks: 312,
        isPopular: true,
      },
      {
        id: "shahid-vip-yearly",
        title: { ar: "باقة VIP سنوية", en: "VIP Yearly Package" },
        description: { ar: "اشتراك سنوي", en: "Yearly Subscription" },
        price: 299.99,
        originalPrice: 399.99,
        currency: "SAR",
        validity: { ar: "سنوي", en: "Yearly" },
        features: ["توفير 25%", "محتوى حصري", "بدون إعلانات"],
        image: "Cards13",
        rating: 4.9,
        purchases: 18,
        views: 980,
        downloads: 980,
        bookmarks: 156,
        isPopular: false,
      },
    ],
  },
  {
    id: "hunger-station",
    name: { ar: "Hunger Station", en: "Hunger Station" },
    logo: "Cards12",
    category: { key: "food_delivery", ar: "توصيل طعام", en: "Food Delivery" },
    description: {
      ar: "أكبر منصة توصيل طعام في المملكة",
      en: "Largest food delivery platform in Saudi Arabia",
    },
    color: "#FFD700",
    offers: [
      {
        id: "hunger-station-delivery-pass",
        title: { ar: "باقة التوصيل المجاني", en: "Free Delivery Pass" },
        description: {
          ar: "توصيل مجاني لمدة شهر",
          en: "Free delivery for one month",
        },
        price: 19.99,
        originalPrice: 29.99,
        currency: "SAR",
        validity: { ar: "شهري", en: "Monthly" },
        features: ["توصيل مجاني", "خصومات حصرية", "أولوية في الطلبات"],
        image: "Cards12",
        rating: 4.6,
        purchases: 67,
        views: 1890,
        downloads: 1890,
        bookmarks: 245,
        isPopular: true,
      },
      {
        id: "hunger-station-cashback",
        title: { ar: "بطاقة استرداد نقدي", en: "Cashback Card" },
        description: {
          ar: "استرداد 10% من كل طلب",
          en: "10% cashback on every order",
        },
        price: 49.99,
        originalPrice: 69.99,
        currency: "SAR",
        validity: { ar: "3 أشهر", en: "3 Months" },
        features: ["استرداد نقدي", "خصومات إضافية", "نقاط مكافآت"],
        image: "Cards12",
        rating: 4.8,
        purchases: 23,
        views: 1120,
        downloads: 1120,
        bookmarks: 178,
        isNew: true,
      },
    ],
  },
  {
    id: "gathern",
    name: { ar: "جاذر إن", en: "Gathern" },
    logo: "Cards14",
    category: { key: "entertainment", ar: "ترفيه", en: "Entertainment" },
    description: {
      ar: "منصة الترفيه والألعاب التفاعلية",
      en: "Interactive entertainment and gaming platform",
    },
    color: "#8B5CF6",
    offers: [
      {
        id: "gathern-premium",
        title: { ar: "باقة بريميوم", en: "Premium Package" },
        description: { ar: "وصول كامل للمحتوى", en: "Full access to content" },
        price: 39.99,
        originalPrice: 49.99,
        currency: "SAR",
        validity: { ar: "شهري", en: "Monthly" },
        features: ["ألعاب حصرية", "محتوى متميز", "دعم فني 24/7"],
        image: "Cards14",
        rating: 4.5,
        purchases: 34,
        views: 1450,
        downloads: 1450,
        bookmarks: 198,
        isPopular: true,
      },
    ],
  },
  // Add Kentaki
  {
    id: "kentaki",
    name: { ar: "كنتاكي", en: "Kentaki" },
    logo: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
    category: {
      key: "food_delivery",
      ar: "توصيل طعام",
      en: "Food Delivery",
    },
    description: {
      ar: "دجاج كنتاكي الأصلي مع التوابل السرية",
      en: "Original Kentaki chicken with secret spices",
    },
    color: "#dc2626",
    offers: [
      {
        id: "kentaki-original-meal",
        title: { ar: "وجبة كنتاكي الأصلي", en: "Kentaki Original Meal" },
        description: {
          ar: "دجاج كنتاكي الأصلي مع البطاطس والمشروب",
          en: "Original Kentaki chicken with fries and drink",
        },
        price: 42,
        originalPrice: 55,
        currency: "SAR",
        validity: { ar: "يوم واحد", en: "One day" },
        features: ["دجاج أصلي", "بطاطس حارة", "مشروب بارد"],
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
        rating: 4.8,
        purchases: 456,
        views: 1234,
        downloads: 1234,
        bookmarks: 89,
        isPopular: true,
      },
    ],
  },
  // Add Pizza Hut
  {
    id: "pizza-hut",
    name: { ar: "بيتزا هت", en: "Pizza Hut" },
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
    category: {
      key: "food_delivery",
      ar: "توصيل طعام",
      en: "Food Delivery",
    },
    description: {
      ar: "بيتزا إيطالية طازجة مع الجبن والطماطم",
      en: "Fresh Italian pizza with cheese and tomato",
    },
    color: "#dc2626",
    offers: [
      {
        id: "pizza-margherita-meal",
        title: { ar: "بيتزا مارجريتا", en: "Margherita Pizza" },
        description: {
          ar: "بيتزا إيطالية كلاسيكية مع الجبن والطماطم",
          en: "Classic Italian pizza with cheese and tomato",
        },
        price: 45,
        originalPrice: 60,
        currency: "SAR",
        validity: { ar: "يوم واحد", en: "One day" },
        features: ["جبن موزاريلا", "طماطم طازجة", "ريحان"],
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
        rating: 4.7,
        purchases: 234,
        views: 890,
        downloads: 890,
        bookmarks: 45,
        isPopular: true,
      },
    ],
  },
];

export const getCompaniesByCategory = (categoryKey: string): CardCompany[] => {
  if (categoryKey === "all") return cardCompanies;
  return cardCompanies.filter(
    (company) => company.category.key === categoryKey
  );
};

export const getCompanyById = (id: string): CardCompany | undefined => {
  return cardCompanies.find((company) => company.id === id);
};

export const getOfferById = (
  companyId: string,
  offerId: string
): CardOffer | undefined => {
  const company = getCompanyById(companyId);
  return company?.offers.find((offer) => offer.id === offerId);
};
