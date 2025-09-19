import {
  CarIcon,
  CoffeeIcon,
  DeliveryIcon,
  HeadphoneIcon,
  HotelIcon,
  RestaurantIcon,
  ShopIcon,
  Pro1,
  Pro2,
  Pro3,
  Pro4,
  Pro5,
  Pro6,
  Pro7,
  Pro8,
} from "@assets";

// Categories for offers
export const offerCategories = [
  {
    key: "restaurants",
    ar: "المطاعم",
    en: "Restaurants",
    icon: RestaurantIcon,
    color: "#f59e0b",
  },
  {
    key: "cafes",
    ar: "الكافيهات",
    en: "Cafes",
    icon: CoffeeIcon,
    color: "#8b5cf6",
  },
  {
    key: "entertainment",
    ar: "الترفيه",
    en: "Entertainment",
    icon: HeadphoneIcon,
    color: "#ef4444",
  },
  {
    key: "shopping",
    ar: "متاجر",
    en: "Shops",
    icon: ShopIcon,
    color: "#10b981",
  },
  {
    key: "hotels",
    ar: "الفنادق",
    en: "Hotels",
    icon: HotelIcon,
    color: "#06b6d4",
  },
  {
    key: "cars",
    ar: "السيارات",
    en: "Cars",
    icon: CarIcon,
    color: "#f97316",
  },
  {
    key: "services",
    ar: "الخدمات",
    en: "Services",
    icon: DeliveryIcon,
    color: "#06b6d4",
  },
];

// Restaurant/Company interface
export interface Restaurant {
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
  offers: Offer[];
  menu: MenuItem[];
  isOpen: boolean;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Menu Item interface
export interface MenuItem {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  features: string[];
  rating: number;
  reviewsCount: number;
  views: number;
  purchases: number;
  bookmarks: number;
  isPopular: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  category: string;
  companyId: string;
  maxQuantity: number;
  isAvailable: boolean;
  preparationTime: string;
  calories?: number;
  allergens?: string[];
}

// Offer interface
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

// Dummy data for restaurants and offers
export const restaurants: Restaurant[] = [
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
    offers: [
      {
        id: "hunger-burger-50",
        title: { ar: "خصم 50% على البرجر", en: "50% off on Burgers" },
        description: {
          ar: "احصل على خصم 50% على جميع أنواع البرجر الطازج",
          en: "Get 50% off on all types of fresh burgers",
        },
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
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
    ],
    menu: [
      {
        id: "hunger-classic-burger",
        title: { ar: "برجر كلاسيك", en: "Classic Burger" },
        description: {
          ar: "برجر لحم طازج مع الخس والطماطم والبصل",
          en: "Fresh beef burger with lettuce, tomato and onion",
        },
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
        price: 35,
        features: ["لحم طازج", "خس طازج", "طماطم", "بصل"],
        rating: 4.8,
        reviewsCount: 156,
        views: 890,
        purchases: 234,
        bookmarks: 45,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "hunger-station",
        maxQuantity: 5,
        isAvailable: true,
        preparationTime: "15-20 دقيقة",
        calories: 450,
        allergens: ["جلوتين", "حليب"],
      },
      {
        id: "hunger-chicken-burger",
        title: { ar: "برجر دجاج", en: "Chicken Burger" },
        description: {
          ar: "برجر دجاج مقرمش مع الصلصة الخاصة",
          en: "Crispy chicken burger with special sauce",
        },
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
        price: 32,
        features: ["دجاج مقرمش", "صلصة خاصة", "خس", "طماطم"],
        rating: 4.6,
        reviewsCount: 98,
        views: 567,
        purchases: 189,
        bookmarks: 32,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "restaurants",
        companyId: "hunger-station",
        maxQuantity: 5,
        isAvailable: true,
        preparationTime: "12-18 دقيقة",
        calories: 380,
        allergens: ["جلوتين"],
      },
      {
        id: "hunger-fries",
        title: { ar: "بطاطس مقلية", en: "French Fries" },
        description: {
          ar: "بطاطس مقلية مقرمشة مع الملح",
          en: "Crispy fried potatoes with salt",
        },
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop",
        price: 15,
        features: ["بطاطس طازجة", "مقرمشة", "ملح"],
        rating: 4.4,
        reviewsCount: 67,
        views: 345,
        purchases: 156,
        bookmarks: 23,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "hunger-station",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "8-12 دقيقة",
        calories: 280,
        allergens: [],
      },
      {
        id: "hunger-cola",
        title: { ar: "كولا", en: "Cola" },
        description: {
          ar: "مشروب غازي منعش",
          en: "Refreshing carbonated drink",
        },
        image:
          "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=400&fit=crop",
        price: 8,
        features: ["منعش", "بارد", "غازي"],
        rating: 4.2,
        reviewsCount: 45,
        views: 234,
        purchases: 98,
        bookmarks: 12,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "hunger-station",
        maxQuantity: 5,
        isAvailable: true,
        preparationTime: "2-3 دقيقة",
        calories: 140,
        allergens: [],
      },
    ],
  },
  {
    id: "popeye-restaurant",
    name: { ar: "مطعم بوباي", en: "Popeye Restaurant" },
    slug: "popeye-restaurant",
    logo: "Pro2",
    category: {
      key: "restaurants",
      ar: "المطاعم",
      en: "Restaurants",
    },
    description: {
      ar: "مطعم متخصص في الدجاج المقلي والوجبات البحرية",
      en: "Restaurant specialized in fried chicken and seafood",
    },
    location: { ar: "شارع التحلية", en: "Al Tahlia Street" },
    distance: "1.0 KM",
    rating: 4.7,
    reviewsCount: 178,
    views: 270,
    saves: 7168,
    color: "#7c3aed",
    topColor: "bg-purple-500",
    isOpen: true,
    deliveryTime: "30-40 دقيقة",
    minimumOrder: 40,
    deliveryFee: 12,
    coordinates: { lat: 24.7146, lng: 46.6763 },
    offers: [
      {
        id: "popeye-chicken-30",
        title: { ar: "خصم 30% على الدجاج", en: "30% off on Chicken" },
        description: {
          ar: "احصل على خصم 30% على جميع وجبات الدجاج",
          en: "Get 30% off on all chicken meals",
        },
        image:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop",
        originalPrice: 600,
        discountPrice: 420,
        discountPercentage: 30,
        validity: { ar: "15 يوم", en: "15 days" },
        features: ["دجاج طازج", "صلصات متنوعة", "خضار طازجة", "توصيل مجاني"],
        rating: 4.7,
        reviewsCount: 178,
        views: 270,
        downloads: 7168,
        purchases: 156,
        bookmarks: 89,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "restaurants",
        companyId: "popeye-restaurant",
        availableUntil: "2024-12-15",
        maxQuantity: 3,
        terms: {
          ar: "الحد الأدنى للطلب 40 ريال",
          en: "Minimum order 40 SAR",
        },
        isTodayOffer: true,
      },
    ],
    menu: [
      {
        id: "popeye-fried-chicken",
        title: { ar: "دجاج مقلي", en: "Fried Chicken" },
        description: {
          ar: "دجاج مقلي مقرمش مع التوابل الخاصة",
          en: "Crispy fried chicken with special spices",
        },
        image:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop",
        price: 45,
        features: ["دجاج طازج", "مقرمش", "توابل خاصة"],
        rating: 4.7,
        reviewsCount: 189,
        views: 756,
        purchases: 298,
        bookmarks: 67,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "popeye-restaurant",
        maxQuantity: 4,
        isAvailable: true,
        preparationTime: "20-25 دقيقة",
        calories: 520,
        allergens: ["جلوتين"],
      },
      {
        id: "popeye-chicken-wings",
        title: { ar: "أجنحة دجاج", en: "Chicken Wings" },
        description: {
          ar: "أجنحة دجاج حارة مع الصلصة",
          en: "Spicy chicken wings with sauce",
        },
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
        price: 38,
        features: ["أجنحة حارة", "صلصة خاصة", "مقرمشة"],
        rating: 4.5,
        reviewsCount: 134,
        views: 567,
        purchases: 198,
        bookmarks: 45,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "restaurants",
        companyId: "popeye-restaurant",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "15-20 دقيقة",
        calories: 380,
        allergens: ["جلوتين"],
      },
      {
        id: "popeye-rice",
        title: { ar: "أرز بخاري", en: "Bukhari Rice" },
        description: {
          ar: "أرز بخاري مع الدجاج والخضار",
          en: "Bukhari rice with chicken and vegetables",
        },
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
        price: 25,
        features: ["أرز بخاري", "دجاج", "خضار"],
        rating: 4.3,
        reviewsCount: 89,
        views: 345,
        purchases: 156,
        bookmarks: 23,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "popeye-restaurant",
        maxQuantity: 2,
        isAvailable: true,
        preparationTime: "18-22 دقيقة",
        calories: 420,
        allergens: [],
      },
      {
        id: "popeye-salad",
        title: { ar: "سلطة خضراء", en: "Green Salad" },
        description: {
          ar: "سلطة خضراء طازجة مع الصلصة",
          en: "Fresh green salad with dressing",
        },
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
        price: 18,
        features: ["خضار طازجة", "صلصة", "صحية"],
        rating: 4.1,
        reviewsCount: 56,
        views: 234,
        purchases: 89,
        bookmarks: 18,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "popeye-restaurant",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "5-8 دقيقة",
        calories: 120,
        allergens: [],
      },
    ],
  },
  {
    id: "aish-majmar",
    name: { ar: "عيش مجمر", en: "Aish Majmar" },
    slug: "aish-majmar",
    logo: "Pro4",
    category: {
      key: "restaurants",
      ar: "المطاعم",
      en: "Restaurants",
    },
    description: {
      ar: "مطعم متخصص في الخبز المجمر والوجبات التقليدية",
      en: "Restaurant specialized in crispy bread and traditional meals",
    },
    location: { ar: "شارع الملك فهد", en: "King Fahd Street" },
    distance: "2.1 KM",
    rating: 4.5,
    reviewsCount: 92,
    views: 180,
    saves: 168,
    color: "#1e3a8a",
    topColor: "bg-blue-500",
    isOpen: true,
    deliveryTime: "20-30 دقيقة",
    minimumOrder: 35,
    deliveryFee: 10,
    coordinates: { lat: 24.7126, lng: 46.6743 },
    offers: [
      {
        id: "aish-buy-one-get-one",
        title: {
          ar: "اشتري وجبة و الثانية مجاناً",
          en: "Buy one meal get second free",
        },
        description: {
          ar: "عرض خاص: اشتري أي وجبة واحصل على وجبة ثانية مجاناً",
          en: "Special offer: Buy any meal and get a second one free",
        },
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        originalPrice: 350,
        discountPrice: 175,
        discountPercentage: 50,
        validity: { ar: "7 أيام", en: "7 days" },
        features: ["خبز طازج", "وجبات تقليدية", "عصائر طبيعية", "توصيل سريع"],
        rating: 4.5,
        reviewsCount: 92,
        views: 180,
        downloads: 168,
        purchases: 67,
        bookmarks: 34,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "aish-majmar",
        availableUntil: "2024-12-10",
        maxQuantity: 2,
        isTodayOffer: true,
        terms: {
          ar: "الوجبة الثانية من نفس النوع",
          en: "Second meal must be of the same type",
        },
      },
    ],
    menu: [
      {
        id: "aish-majmar-bread",
        title: { ar: "عيش مجمر", en: "Crispy Bread" },
        description: {
          ar: "خبز مجمر طازج مع الزعتر والزيت",
          en: "Fresh crispy bread with thyme and oil",
        },
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        price: 12,
        features: ["خبز طازج", "زعتر", "زيت زيتون"],
        rating: 4.5,
        reviewsCount: 78,
        views: 456,
        purchases: 134,
        bookmarks: 28,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "aish-majmar",
        maxQuantity: 5,
        isAvailable: true,
        preparationTime: "10-15 دقيقة",
        calories: 180,
        allergens: ["جلوتين"],
      },
      {
        id: "aish-manakeesh",
        title: { ar: "مناقيش", en: "Manakeesh" },
        description: {
          ar: "مناقيش بالجبن والزعتر",
          en: "Manakeesh with cheese and thyme",
        },
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
        price: 18,
        features: ["جبن", "زعتر", "خبز طازج"],
        rating: 4.3,
        reviewsCount: 56,
        views: 345,
        purchases: 98,
        bookmarks: 19,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "restaurants",
        companyId: "aish-majmar",
        maxQuantity: 4,
        isAvailable: true,
        preparationTime: "12-18 دقيقة",
        calories: 280,
        allergens: ["جلوتين", "حليب"],
      },
      {
        id: "aish-foul",
        title: { ar: "فول مدمس", en: "Fava Beans" },
        description: {
          ar: "فول مدمس مع الزيت والليمون",
          en: "Fava beans with oil and lemon",
        },
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
        price: 15,
        features: ["فول طازج", "زيت", "ليمون"],
        rating: 4.2,
        reviewsCount: 45,
        views: 234,
        purchases: 67,
        bookmarks: 12,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "aish-majmar",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "8-12 دقيقة",
        calories: 220,
        allergens: [],
      },
      {
        id: "aish-tea",
        title: { ar: "شاي", en: "Tea" },
        description: {
          ar: "شاي ساخن مع النعناع",
          en: "Hot tea with mint",
        },
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
        price: 5,
        features: ["شاي ساخن", "نعناع", "سكر"],
        rating: 4.0,
        reviewsCount: 34,
        views: 123,
        purchases: 45,
        bookmarks: 8,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "aish-majmar",
        maxQuantity: 5,
        isAvailable: true,
        preparationTime: "3-5 دقيقة",
        calories: 20,
        allergens: [],
      },
    ],
  },
  {
    id: "kentaki",
    name: { ar: "كنتاكي", en: "Kentaki" },
    slug: "kentaki",
    logo: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
    category: {
      key: "restaurants",
      ar: "المطاعم",
      en: "Restaurants",
    },
    description: {
      ar: "مطعم متخصص في الدجاج المقلي والوجبات السريعة",
      en: "Restaurant specialized in fried chicken and fast food",
    },
    location: { ar: "شارع الملك فهد", en: "King Fahd Street" },
    distance: "2.1 KM",
    rating: 4.7,
    reviewsCount: 67,
    views: 320,
    saves: 7245,
    color: "#ef4444",
    topColor: "bg-red-500",
    isOpen: true,
    deliveryTime: "25-35 دقيقة",
    minimumOrder: 45,
    deliveryFee: 15,
    coordinates: { lat: 24.7156, lng: 46.6773 },
    offers: [
      {
        id: "kentaki-30-off",
        title: { ar: "خصم 30% على جميع الوجبات", en: "30% off on all meals" },
        description: {
          ar: "احصل على خصم 30% على جميع وجبات كنتاكي",
          en: "Get 30% off on all Kentaki meals",
        },
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
        originalPrice: 750,
        discountPrice: 525,
        discountPercentage: 30,
        validity: { ar: "20 يوم", en: "20 days" },
        features: ["دجاج مقرمش", "بطاطس حارة", "مشروبات باردة", "توصيل مجاني"],
        rating: 4.7,
        reviewsCount: 67,
        views: 320,
        downloads: 7245,
        purchases: 234,
        bookmarks: 123,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "kentaki",
        availableUntil: "2024-12-25",
        maxQuantity: 4,
        terms: {
          ar: "الخصم لا يطبق على العروض الأخرى",
          en: "Discount does not apply to other offers",
        },
      },
    ],
    menu: [
      {
        id: "kentaki-original",
        title: { ar: "كنتاكي الأصلي", en: "Kentaki Original" },
        description: {
          ar: "دجاج كنتاكي الأصلي مع التوابل السرية",
          en: "Original Kentaki chicken with secret spices",
        },
        image:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
        price: 42,
        features: ["دجاج أصلي", "توابل سرية", "مقرمش"],
        rating: 4.8,
        reviewsCount: 234,
        views: 1234,
        purchases: 456,
        bookmarks: 89,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "kentaki",
        maxQuantity: 4,
        isAvailable: true,
        preparationTime: "18-22 دقيقة",
        calories: 480,
        allergens: ["جلوتين"],
      },
      {
        id: "kentaki-spicy",
        title: { ar: "كنتاكي حار", en: "Kentaki Spicy" },
        description: {
          ar: "دجاج كنتاكي حار مع الصلصة الحارة",
          en: "Spicy Kentaki chicken with hot sauce",
        },
        image:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop",
        price: 45,
        features: ["دجاج حار", "صلصة حارة", "مقرمش"],
        rating: 4.6,
        reviewsCount: 189,
        views: 987,
        purchases: 345,
        bookmarks: 67,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "restaurants",
        companyId: "kentaki",
        maxQuantity: 4,
        isAvailable: true,
        preparationTime: "20-25 دقيقة",
        calories: 520,
        allergens: ["جلوتين"],
      },
      {
        id: "kentaki-fries",
        title: { ar: "بطاطس كنتاكي", en: "Kentaki Fries" },
        description: {
          ar: "بطاطس كنتاكي المقلية مع التوابل",
          en: "Kentaki fried potatoes with spices",
        },
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop",
        price: 18,
        features: ["بطاطس طازجة", "توابل", "مقرمشة"],
        rating: 4.4,
        reviewsCount: 123,
        views: 567,
        purchases: 234,
        bookmarks: 34,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "kentaki",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "10-15 دقيقة",
        calories: 320,
        allergens: [],
      },
      {
        id: "kentaki-cola",
        title: { ar: "كولا كنتاكي", en: "Kentaki Cola" },
        description: {
          ar: "مشروب كولا منعش",
          en: "Refreshing cola drink",
        },
        image:
          "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=400&fit=crop",
        price: 10,
        features: ["منعش", "بارد", "غازي"],
        rating: 4.2,
        reviewsCount: 78,
        views: 345,
        purchases: 156,
        bookmarks: 23,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "kentaki",
        maxQuantity: 5,
        isAvailable: true,
        preparationTime: "2-3 دقيقة",
        calories: 150,
        allergens: [],
      },
    ],
  },
  // Add more restaurants for other categories
  {
    id: "starbucks-cafe",
    name: { ar: "ستاربكس", en: "Starbucks" },
    slug: "starbucks-cafe",
    logo: "Pro5",
    category: {
      key: "cafes",
      ar: "الكافيهات",
      en: "Cafes",
    },
    description: {
      ar: "كافيه متخصص في القهوة والمشروبات الساخنة",
      en: "Cafe specialized in coffee and hot beverages",
    },
    location: { ar: "شارع التحلية", en: "Al Tahlia Street" },
    distance: "0.8 KM",
    rating: 4.6,
    reviewsCount: 145,
    views: 890,
    saves: 234,
    color: "#10b981",
    topColor: "bg-green-500",
    isOpen: true,
    deliveryTime: "15-25 دقيقة",
    minimumOrder: 25,
    deliveryFee: 8,
    coordinates: { lat: 24.7146, lng: 46.6753 },
    offers: [
      {
        id: "starbucks-coffee-25",
        title: { ar: "خصم 25% على القهوة", en: "25% off on Coffee" },
        description: {
          ar: "احصل على خصم 25% على جميع أنواع القهوة",
          en: "Get 25% off on all types of coffee",
        },
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
        originalPrice: 300,
        discountPrice: 225,
        discountPercentage: 25,
        validity: { ar: "14 يوم", en: "14 days" },
        features: ["قهوة طازجة", "حلويات متنوعة", "جو هادئ", "واي فاي مجاني"],
        rating: 4.6,
        reviewsCount: 145,
        views: 890,
        downloads: 234,
        purchases: 78,
        bookmarks: 45,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "cafes",
        companyId: "starbucks-cafe",
        availableUntil: "2024-12-20",
        maxQuantity: 3,
        terms: {
          ar: "الخصم لا يطبق على المشروبات الباردة",
          en: "Discount does not apply to cold beverages",
        },
        isTodayOffer: true,
      },
    ],
    menu: [
      {
        id: "starbucks-latte",
        title: { ar: "لاتيه", en: "Latte" },
        description: {
          ar: "قهوة لاتيه مع الحليب الرغوي",
          en: "Coffee latte with foamy milk",
        },
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
        price: 22,
        features: ["قهوة عربية", "حليب رغوي", "رغوة"],
        rating: 4.7,
        reviewsCount: 189,
        views: 756,
        purchases: 298,
        bookmarks: 67,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "cafes",
        companyId: "starbucks-cafe",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "5-8 دقيقة",
        calories: 180,
        allergens: ["حليب"],
      },
      {
        id: "starbucks-cappuccino",
        title: { ar: "كابتشينو", en: "Cappuccino" },
        description: {
          ar: "كابتشينو إيطالي مع الرغوة",
          en: "Italian cappuccino with foam",
        },
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
        price: 20,
        features: ["قهوة إيطالية", "رغوة كثيفة", "حليب"],
        rating: 4.5,
        reviewsCount: 134,
        views: 567,
        purchases: 198,
        bookmarks: 45,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "cafes",
        companyId: "starbucks-cafe",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "4-6 دقيقة",
        calories: 160,
        allergens: ["حليب"],
      },
      {
        id: "starbucks-frappuccino",
        title: { ar: "فرابتشينو", en: "Frappuccino" },
        description: {
          ar: "مشروب قهوة بارد مع الثلج",
          en: "Cold coffee drink with ice",
        },
        image:
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        price: 25,
        features: ["قهوة باردة", "ثلج", "كريمة"],
        rating: 4.6,
        reviewsCount: 156,
        views: 678,
        purchases: 234,
        bookmarks: 56,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "cafes",
        companyId: "starbucks-cafe",
        maxQuantity: 2,
        isAvailable: true,
        preparationTime: "6-10 دقيقة",
        calories: 280,
        allergens: ["حليب"],
      },
      {
        id: "starbucks-croissant",
        title: { ar: "كرواسون", en: "Croissant" },
        description: {
          ar: "كرواسون طازج مع الزبدة",
          en: "Fresh croissant with butter",
        },
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
        price: 15,
        features: ["كرواسون طازج", "زبدة", "مقرمش"],
        rating: 4.3,
        reviewsCount: 89,
        views: 345,
        purchases: 156,
        bookmarks: 23,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "cafes",
        companyId: "starbucks-cafe",
        maxQuantity: 4,
        isAvailable: true,
        preparationTime: "2-3 دقيقة",
        calories: 240,
        allergens: ["جلوتين", "حليب"],
      },
    ],
  },
  // Add Pizza Restaurant
  {
    id: "pizza-hut",
    name: { ar: "بيتزا هت", en: "Pizza Hut" },
    slug: "pizza-hut",
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
    category: {
      key: "restaurants",
      ar: "المطاعم",
      en: "Restaurants",
    },
    description: {
      ar: "مطعم متخصص في البيتزا الإيطالية الطازجة",
      en: "Restaurant specialized in fresh Italian pizza",
    },
    location: { ar: "شارع الملك فهد", en: "King Fahd Street" },
    distance: "2.5 KM",
    rating: 4.6,
    reviewsCount: 189,
    views: 1234,
    saves: 67,
    color: "#dc2626",
    topColor: "bg-red-500",
    offers: [
      {
        id: "pizza-hut-40-off",
        title: { ar: "خصم 40% على البيتزا", en: "40% off on Pizza" },
        description: {
          ar: "احصل على خصم 40% على جميع أنواع البيتزا",
          en: "Get 40% off on all types of pizza",
        },
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
        originalPrice: 200,
        discountPrice: 120,
        discountPercentage: 40,
        validity: { ar: "10 أيام", en: "10 days" },
        features: ["بيتزا طازجة", "جبن موزاريلا", "صلصة طماطم", "توصيل سريع"],
        rating: 4.6,
        reviewsCount: 89,
        views: 567,
        downloads: 45,
        purchases: 23,
        bookmarks: 12,
        isPopular: true,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "pizza-hut",
        availableUntil: "2024-12-30",
        maxQuantity: 3,
        terms: {
          ar: "الخصم لا يطبق على المشروبات",
          en: "Discount does not apply to beverages",
        },
        isTodayOffer: true,
      },
    ],
    menu: [
      {
        id: "pizza-margherita",
        title: { ar: "بيتزا مارجريتا", en: "Margherita Pizza" },
        description: {
          ar: "بيتزا إيطالية كلاسيكية مع الجبن والطماطم",
          en: "Classic Italian pizza with cheese and tomato",
        },
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
        price: 45,
        features: ["جبن موزاريلا", "طماطم طازجة", "ريحان", "عجينة رقيقة"],
        rating: 4.7,
        reviewsCount: 156,
        views: 890,
        purchases: 234,
        bookmarks: 45,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "pizza-hut",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "20-25 دقيقة",
        calories: 380,
        allergens: ["جلوتين", "حليب"],
      },
      {
        id: "pizza-pepperoni",
        title: { ar: "بيتزا بيبروني", en: "Pepperoni Pizza" },
        description: {
          ar: "بيتزا مع الببروني والجبن الذائب",
          en: "Pizza with pepperoni and melted cheese",
        },
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
        price: 55,
        features: ["ببروني", "جبن موزاريلا", "صلصة طماطم", "عجينة رقيقة"],
        rating: 4.8,
        reviewsCount: 189,
        views: 1234,
        purchases: 345,
        bookmarks: 67,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "restaurants",
        companyId: "pizza-hut",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "22-28 دقيقة",
        calories: 420,
        allergens: ["جلوتين", "حليب"],
      },
      {
        id: "pizza-vegetarian",
        title: { ar: "بيتزا نباتية", en: "Vegetarian Pizza" },
        description: {
          ar: "بيتزا نباتية مع الخضار الطازجة",
          en: "Vegetarian pizza with fresh vegetables",
        },
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop",
        price: 40,
        features: ["خضار طازجة", "جبن موزاريلا", "فطر", "فلفل"],
        rating: 4.5,
        reviewsCount: 98,
        views: 567,
        purchases: 156,
        bookmarks: 23,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "restaurants",
        companyId: "pizza-hut",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "18-22 دقيقة",
        calories: 320,
        allergens: ["جلوتين", "حليب"],
      },
      {
        id: "pizza-chicken",
        title: { ar: "بيتزا دجاج", en: "Chicken Pizza" },
        description: {
          ar: "بيتزا مع قطع الدجاج المشوي",
          en: "Pizza with grilled chicken pieces",
        },
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop",
        price: 50,
        features: ["دجاج مشوي", "جبن موزاريلا", "صلصة باربكيو", "بصل"],
        rating: 4.6,
        reviewsCount: 134,
        views: 756,
        purchases: 198,
        bookmarks: 34,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "restaurants",
        companyId: "pizza-hut",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "20-25 دقيقة",
        calories: 450,
        allergens: ["جلوتين", "حليب"],
      },
    ],
    isOpen: true,
    deliveryTime: "30-40 دقيقة",
    minimumOrder: 60,
    deliveryFee: 20,
    coordinates: { lat: 24.7166, lng: 46.6783 },
  },
  // Add Coffee Shop
  {
    id: "coffee-bean",
    name: { ar: "كوفي بين", en: "Coffee Bean" },
    slug: "coffee-bean",
    logo: "Pro7",
    category: {
      key: "cafes",
      ar: "الكافيهات",
      en: "Cafes",
    },
    description: {
      ar: "كافيه متخصص في القهوة والحلويات الطازجة",
      en: "Cafe specialized in coffee and fresh desserts",
    },
    location: { ar: "شارع العليا", en: "Al Olaya Street" },
    distance: "1.8 KM",
    rating: 4.4,
    reviewsCount: 123,
    views: 789,
    saves: 45,
    color: "#8b4513",
    topColor: "bg-amber-600",
    offers: [
      {
        id: "coffee-bean-20-off",
        title: { ar: "خصم 20% على القهوة", en: "20% off on Coffee" },
        description: {
          ar: "احصل على خصم 20% على جميع أنواع القهوة",
          en: "Get 20% off on all types of coffee",
        },
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        originalPrice: 150,
        discountPrice: 120,
        discountPercentage: 20,
        validity: { ar: "7 أيام", en: "7 days" },
        features: ["قهوة طازجة", "حلويات متنوعة", "جو هادئ", "واي فاي مجاني"],
        rating: 4.4,
        reviewsCount: 67,
        views: 345,
        downloads: 23,
        purchases: 12,
        bookmarks: 8,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "cafes",
        companyId: "coffee-bean",
        availableUntil: "2024-12-28",
        maxQuantity: 2,
        terms: {
          ar: "الخصم لا يطبق على الحلويات",
          en: "Discount does not apply to desserts",
        },
        isTodayOffer: true,
      },
    ],
    menu: [
      {
        id: "coffee-bean-americano",
        title: { ar: "أمريكانو", en: "Americano" },
        description: {
          ar: "قهوة أمريكانو قوية ومنعشة",
          en: "Strong and refreshing Americano coffee",
        },
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        price: 18,
        features: ["قهوة قوية", "منعشة", "طازجة"],
        rating: 4.5,
        reviewsCount: 89,
        views: 456,
        purchases: 123,
        bookmarks: 23,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "cafes",
        companyId: "coffee-bean",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "3-5 دقيقة",
        calories: 5,
        allergens: [],
      },
      {
        id: "coffee-bean-mocha",
        title: { ar: "موكا", en: "Mocha" },
        description: {
          ar: "موكا مع الشوكولاتة والحليب",
          en: "Mocha with chocolate and milk",
        },
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
        price: 25,
        features: ["شوكولاتة", "حليب", "رغوة"],
        rating: 4.6,
        reviewsCount: 67,
        views: 345,
        purchases: 89,
        bookmarks: 18,
        isPopular: false,
        isNew: true,
        isBestSeller: false,
        category: "cafes",
        companyId: "coffee-bean",
        maxQuantity: 3,
        isAvailable: true,
        preparationTime: "4-6 دقيقة",
        calories: 180,
        allergens: ["حليب"],
      },
      {
        id: "coffee-bean-croissant",
        title: { ar: "كرواسون", en: "Croissant" },
        description: {
          ar: "كرواسون طازج مع الزبدة",
          en: "Fresh croissant with butter",
        },
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
        price: 12,
        features: ["كرواسون طازج", "زبدة", "مقرمش"],
        rating: 4.3,
        reviewsCount: 45,
        views: 234,
        purchases: 67,
        bookmarks: 12,
        isPopular: false,
        isNew: false,
        isBestSeller: false,
        category: "cafes",
        companyId: "coffee-bean",
        maxQuantity: 4,
        isAvailable: true,
        preparationTime: "2-3 دقيقة",
        calories: 240,
        allergens: ["جلوتين", "حليب"],
      },
      {
        id: "coffee-bean-cake",
        title: { ar: "كيك الشوكولاتة", en: "Chocolate Cake" },
        description: {
          ar: "كيك شوكولاتة طازج مع الكريمة",
          en: "Fresh chocolate cake with cream",
        },
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
        price: 22,
        features: ["شوكولاتة", "كريمة", "طازج"],
        rating: 4.7,
        reviewsCount: 78,
        views: 456,
        purchases: 134,
        bookmarks: 28,
        isPopular: true,
        isNew: false,
        isBestSeller: true,
        category: "cafes",
        companyId: "coffee-bean",
        maxQuantity: 2,
        isAvailable: true,
        preparationTime: "1-2 دقيقة",
        calories: 320,
        allergens: ["جلوتين", "حليب", "بيض"],
      },
    ],
    isOpen: true,
    deliveryTime: "15-20 دقيقة",
    minimumOrder: 30,
    deliveryFee: 10,
    coordinates: { lat: 24.7176, lng: 46.6793 },
  },
];

// Helper functions
export const getRestaurantsByCategory = (categoryKey: string): Restaurant[] => {
  if (categoryKey === "all") {
    return restaurants;
  }
  return restaurants.filter(
    (restaurant) => restaurant.category.key === categoryKey
  );
};

export const getRestaurantById = (restaurantId: string): Restaurant | null => {
  return (
    restaurants.find((restaurant) => restaurant.id === restaurantId) || null
  );
};

export const getOfferById = (
  restaurantId: string,
  offerId: string
): Offer | null => {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return null;

  return restaurant.offers.find((offer) => offer.id === offerId) || null;
};

export const getAllOffers = (): Offer[] => {
  return restaurants.flatMap((restaurant) => restaurant.offers);
};

export const getOffersByCategory = (categoryKey: string): Offer[] => {
  const categoryRestaurants = getRestaurantsByCategory(categoryKey);
  return categoryRestaurants.flatMap((restaurant) => restaurant.offers);
};

export const getMostViewedOffers = (): Offer[] => {
  return getAllOffers()
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
};

export const getTodayOffers = (): Offer[] => {
  return getAllOffers().filter((offer) => offer.isTodayOffer);
};

export const getNewOffers = (): Offer[] => {
  return getAllOffers().filter((offer) => offer.isNew);
};

export const getBestSellerOffers = (): Offer[] => {
  return getAllOffers().filter((offer) => offer.isBestSeller);
};

export const getPopularOffers = (): Offer[] => {
  return getAllOffers().filter((offer) => offer.isPopular);
};

export const getHighestRatedOffers = (): Offer[] => {
  return getAllOffers()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
};

export const getMostPurchasedOffers = (): Offer[] => {
  return getAllOffers()
    .sort((a, b) => b.purchases - a.purchases)
    .slice(0, 10);
};

export const getFilteredOffers = (filter: string): Offer[] => {
  switch (filter) {
    case "all":
      return getAllOffers();
    case "today":
      return getTodayOffers();
    case "new":
      return getNewOffers();
    case "bestseller":
      return getBestSellerOffers();
    case "popular":
      return getPopularOffers();
    case "nearby":
      // محاكاة العروض القريبة
      return getAllOffers().slice(0, 6);
    case "most_visited":
      return getMostViewedOffers();
    case "top_rated":
      return getHighestRatedOffers();
    default:
      return getAllOffers();
  }
};

export const getNearbyOffers = (
  userLat: number,
  userLng: number,
  radiusKm: number = 5
): Offer[] => {
  const nearbyRestaurants = restaurants.filter((restaurant) => {
    if (!restaurant.coordinates) return false;

    const distance = calculateDistance(
      userLat,
      userLng,
      restaurant.coordinates.lat,
      restaurant.coordinates.lng
    );

    return distance <= radiusKm;
  });

  return nearbyRestaurants.flatMap((restaurant) => restaurant.offers);
};

// Helper function to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// دالة للحصول على صورة العرض
export const getOfferImage = (imageName: string) => {
  // If it's already a URL, return it directly
  if (imageName.startsWith("http")) {
    return imageName;
  }

  // Otherwise, use the local images
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
