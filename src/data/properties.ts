export interface PropertyType {
  id: number;
  name: string;
  nameAr: string;
  slug: string;
  icon: string;
  count: number;
}

export interface Property {
  id: number;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  bedrooms: number;
  area: string;
  price: string;
  propertyType: string;
  propertyTypeAr: string;
  image: string;
  rating: number;
  views: number;
  slug: string;
  propertySlug: string;
  description: string;
  descriptionAr: string;
  amenities: string[];
  amenitiesAr: string[];
  nearbyPlaces: {
    beach: string;
    cityCenter: string;
    airport: string;
  };
  specifications: {
    rooms: string;
    bathrooms: string;
    area: string;
    price: string;
  }[];
  paymentPlan: {
    downPayment: string;
    installments: string;
  };
  whyChoose: string[];
  whyChooseAr: string[];
  // Additional images for detail page
  additionalImages: string[];
}

export interface InvestmentProperty {
  id: number;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  image: string;
  date: string;
  price: string;
  priceAr: string;
  description: string;
  descriptionAr: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  date: string;
  views: number;
  category: string;
  categoryAr: string;
}

export interface Country {
  id: number;
  name: string;
  nameAr: string;
  flag: string;
  propertyCount: number;
}

// Property Types Data
export const propertyTypes: PropertyType[] = [
  {
    id: 1,
    name: "Freehold",
    nameAr: "ملكية حرة",
    slug: "freehold",
    icon: "/src/assets/property/property-icon.png",
    count: 156,
  },
  {
    id: 2,
    name: "Installment",
    nameAr: "تقسيط",
    slug: "installment",
    icon: "/src/assets/property/property-icon.png",
    count: 89,
  },
  {
    id: 3,
    name: "Rent",
    nameAr: "إيجار",
    slug: "rent",
    icon: "/src/assets/property/property-icon.png",
    count: 234,
  },
  {
    id: 4,
    name: "Villas",
    nameAr: "فيلات",
    slug: "villas",
    icon: "/src/assets/property/property-icon.png",
    count: 67,
  },
  {
    id: 5,
    name: "Apartments",
    nameAr: "شقق",
    slug: "apartments",
    icon: "/src/assets/property/property-icon.png",
    count: 189,
  },
  {
    id: 6,
    name: "Offices",
    nameAr: "مكاتب",
    slug: "offices",
    icon: "/src/assets/property/property-icon.png",
    count: 45,
  },
  {
    id: 7,
    name: "Under Construction",
    nameAr: "قيد الإنشاء",
    slug: "under-construction",
    icon: "/src/assets/property/property-icon.png",
    count: 23,
  },
  {
    id: 8,
    name: "Investment",
    nameAr: "استثماري",
    slug: "investment",
    icon: "/src/assets/property/property-icon.png",
    count: 34,
  },
  {
    id: 9,
    name: "Luxury",
    nameAr: "فاخر",
    slug: "luxury",
    icon: "/src/assets/property/property-icon.png",
    count: 56,
  },
  {
    id: 10,
    name: "Ready to Move",
    nameAr: "جاهز للسكن",
    slug: "ready-to-move",
    icon: "/src/assets/property/property-icon.png",
    count: 78,
  },
  {
    id: 11,
    name: "Sea View",
    nameAr: "إطلالة بحرية",
    slug: "sea-view",
    icon: "/src/assets/property/property-icon.png",
    count: 29,
  },
];

// Properties Data
export const properties: Property[] = [
  // Freehold Properties
  {
    id: 1,
    title: "Elegant Contemporary Villa",
    titleAr: "فيلا أنيقة معاصرة",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 4,
    area: "518 M²",
    price: "$ 4584.00",
    propertyType: "Freehold",
    propertyTypeAr: "ملكية حرة",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    views: 226,
    slug: "elegant-contemporary-villa",
    propertySlug: "freehold",
    description:
      "This elegant contemporary villa offers the perfect blend of luxury and comfort. Located in the prestigious Business Bay area, it features modern architecture, high-end finishes, and stunning city views.",
    descriptionAr:
      "تقدم هذه الفيلا الأنيقة المعاصرة مزيجاً مثالياً من الفخامة والراحة. تقع في منطقة خليج الأعمال المرموقة، وتتميز بالهندسة المعمارية الحديثة والإنهاءات عالية الجودة والمناظر الخلابة للمدينة.",
    amenities: ["Bathup", "WI-FI", "Parking", "Play area", "GYM"],
    amenitiesAr: [
      "جاكوزي",
      "واي فاي",
      "موقف سيارات",
      "منطقة لعب",
      "صالة رياضية",
    ],
    nearbyPlaces: {
      beach: "7 KM",
      cityCenter: "15 KM",
      airport: "5 KM",
    },
    specifications: [
      { rooms: "1+1", bathrooms: "01", area: "64 M²", price: "295,000 $" },
      { rooms: "2+1", bathrooms: "02", area: "85 M²", price: "385,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "120 M²", price: "485,000 $" },
      { rooms: "4+1", bathrooms: "03", area: "150 M²", price: "585,000 $" },
    ],
    paymentPlan: {
      downPayment: "50%",
      installments: "50% over 12 months",
    },
    whyChoose: [
      "Spacious living areas",
      "Modern kitchen with high-end appliances",
      "Private balcony with stunning views",
      "Access to exclusive amenities",
    ],
    whyChooseAr: [
      "مناطق معيشة واسعة",
      "مطبخ حديث مع أجهزة عالية الجودة",
      "شرفة خاصة مع مناظر خلابة",
      "الوصول إلى المرافق الحصرية",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    titleAr: "جناح بنتهاوس فاخر",
    location: "Palm Jumeirah, Dubai, UAE",
    locationAr: "جزيرة النخلة، دبي، الإمارات",
    bedrooms: 3,
    area: "450 M²",
    price: "$ 3800.00",
    propertyType: "Freehold",
    propertyTypeAr: "ملكية حرة",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    views: 189,
    slug: "luxury-penthouse-suite",
    propertySlug: "freehold",
    description:
      "Experience ultimate luxury in this stunning penthouse suite with panoramic views of the Arabian Gulf and Dubai skyline.",
    descriptionAr:
      "عش الفخامة القصوى في هذا الجناح الرائع مع مناظر بانورامية للخليج العربي وأفق دبي.",
    amenities: ["Pool", "Gym", "Concierge", "Security", "Parking"],
    amenitiesAr: ["مسبح", "صالة رياضية", "كونسيرج", "أمن", "موقف سيارات"],
    nearbyPlaces: {
      beach: "2 KM",
      cityCenter: "20 KM",
      airport: "25 KM",
    },
    specifications: [
      { rooms: "2+1", bathrooms: "02", area: "85 M²", price: "385,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "120 M²", price: "485,000 $" },
    ],
    paymentPlan: {
      downPayment: "40%",
      installments: "60% over 18 months",
    },
    whyChoose: [
      "Private elevator access",
      "Rooftop terrace",
      "Smart home technology",
      "24/7 security",
    ],
    whyChooseAr: [
      "وصول خاص بالمصعد",
      "تراس على السطح",
      "تقنية المنزل الذكي",
      "أمن على مدار الساعة",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 1241,
    title: "Elegant Contemporary Villa",
    titleAr: "فيلا أنيقة معاصرة",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 4,
    area: "518 M²",
    price: "$ 4584.00",
    propertyType: "Freehold",
    propertyTypeAr: "ملكية حرة",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    views: 226,
    slug: "elegant-contemporary-villa",
    propertySlug: "freehold",
    description:
      "This elegant contemporary villa offers the perfect blend of luxury and comfort. Located in the prestigious Business Bay area, it features modern architecture, high-end finishes, and stunning city views.",
    descriptionAr:
      "تقدم هذه الفيلا الأنيقة المعاصرة مزيجاً مثالياً من الفخامة والراحة. تقع في منطقة خليج الأعمال المرموقة، وتتميز بالهندسة المعمارية الحديثة والإنهاءات عالية الجودة والمناظر الخلابة للمدينة.",
    amenities: ["Bathup", "WI-FI", "Parking", "Play area", "GYM"],
    amenitiesAr: [
      "جاكوزي",
      "واي فاي",
      "موقف سيارات",
      "منطقة لعب",
      "صالة رياضية",
    ],
    nearbyPlaces: {
      beach: "7 KM",
      cityCenter: "15 KM",
      airport: "5 KM",
    },
    specifications: [
      { rooms: "1+1", bathrooms: "01", area: "64 M²", price: "295,000 $" },
      { rooms: "2+1", bathrooms: "02", area: "85 M²", price: "385,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "120 M²", price: "485,000 $" },
      { rooms: "4+1", bathrooms: "03", area: "150 M²", price: "585,000 $" },
    ],
    paymentPlan: {
      downPayment: "50%",
      installments: "50% over 12 months",
    },
    whyChoose: [
      "Spacious living areas",
      "Modern kitchen with high-end appliances",
      "Private balcony with stunning views",
      "Access to exclusive amenities",
    ],
    whyChooseAr: [
      "مناطق معيشة واسعة",
      "مطبخ حديث مع أجهزة عالية الجودة",
      "شرفة خاصة مع مناظر خلابة",
      "الوصول إلى المرافق الحصرية",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 1122,
    title: "Luxury Penthouse Suite",
    titleAr: "جناح بنتهاوس فاخر",
    location: "Palm Jumeirah, Dubai, UAE",
    locationAr: "جزيرة النخلة، دبي، الإمارات",
    bedrooms: 3,
    area: "450 M²",
    price: "$ 3800.00",
    propertyType: "Freehold",
    propertyTypeAr: "ملكية حرة",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    views: 189,
    slug: "luxury-penthouse-suite",
    propertySlug: "freehold",
    description:
      "Experience ultimate luxury in this stunning penthouse suite with panoramic views of the Arabian Gulf and Dubai skyline.",
    descriptionAr:
      "عش الفخامة القصوى في هذا الجناح الرائع مع مناظر بانورامية للخليج العربي وأفق دبي.",
    amenities: ["Pool", "Gym", "Concierge", "Security", "Parking"],
    amenitiesAr: ["مسبح", "صالة رياضية", "كونسيرج", "أمن", "موقف سيارات"],
    nearbyPlaces: {
      beach: "2 KM",
      cityCenter: "20 KM",
      airport: "25 KM",
    },
    specifications: [
      { rooms: "2+1", bathrooms: "02", area: "85 M²", price: "385,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "120 M²", price: "485,000 $" },
    ],
    paymentPlan: {
      downPayment: "40%",
      installments: "60% over 18 months",
    },
    whyChoose: [
      "Private elevator access",
      "Rooftop terrace",
      "Smart home technology",
      "24/7 security",
    ],
    whyChooseAr: [
      "وصول خاص بالمصعد",
      "تراس على السطح",
      "تقنية المنزل الذكي",
      "أمن على مدار الساعة",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 187,
    title: "Elegant Contemporary Villa",
    titleAr: "فيلا أنيقة معاصرة",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 4,
    area: "518 M²",
    price: "$ 4584.00",
    propertyType: "Freehold",
    propertyTypeAr: "ملكية حرة",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    views: 226,
    slug: "elegant-contemporary-villa",
    propertySlug: "freehold",
    description:
      "This elegant contemporary villa offers the perfect blend of luxury and comfort. Located in the prestigious Business Bay area, it features modern architecture, high-end finishes, and stunning city views.",
    descriptionAr:
      "تقدم هذه الفيلا الأنيقة المعاصرة مزيجاً مثالياً من الفخامة والراحة. تقع في منطقة خليج الأعمال المرموقة، وتتميز بالهندسة المعمارية الحديثة والإنهاءات عالية الجودة والمناظر الخلابة للمدينة.",
    amenities: ["Bathup", "WI-FI", "Parking", "Play area", "GYM"],
    amenitiesAr: [
      "جاكوزي",
      "واي فاي",
      "موقف سيارات",
      "منطقة لعب",
      "صالة رياضية",
    ],
    nearbyPlaces: {
      beach: "7 KM",
      cityCenter: "15 KM",
      airport: "5 KM",
    },
    specifications: [
      { rooms: "1+1", bathrooms: "01", area: "64 M²", price: "295,000 $" },
      { rooms: "2+1", bathrooms: "02", area: "85 M²", price: "385,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "120 M²", price: "485,000 $" },
      { rooms: "4+1", bathrooms: "03", area: "150 M²", price: "585,000 $" },
    ],
    paymentPlan: {
      downPayment: "50%",
      installments: "50% over 12 months",
    },
    whyChoose: [
      "Spacious living areas",
      "Modern kitchen with high-end appliances",
      "Private balcony with stunning views",
      "Access to exclusive amenities",
    ],
    whyChooseAr: [
      "مناطق معيشة واسعة",
      "مطبخ حديث مع أجهزة عالية الجودة",
      "شرفة خاصة مع مناظر خلابة",
      "الوصول إلى المرافق الحصرية",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 254,
    title: "Luxury Penthouse Suite",
    titleAr: "جناح بنتهاوس فاخر",
    location: "Palm Jumeirah, Dubai, UAE",
    locationAr: "جزيرة النخلة، دبي، الإمارات",
    bedrooms: 3,
    area: "450 M²",
    price: "$ 3800.00",
    propertyType: "Freehold",
    propertyTypeAr: "ملكية حرة",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    views: 189,
    slug: "luxury-penthouse-suite",
    propertySlug: "freehold",
    description:
      "Experience ultimate luxury in this stunning penthouse suite with panoramic views of the Arabian Gulf and Dubai skyline.",
    descriptionAr:
      "عش الفخامة القصوى في هذا الجناح الرائع مع مناظر بانورامية للخليج العربي وأفق دبي.",
    amenities: ["Pool", "Gym", "Concierge", "Security", "Parking"],
    amenitiesAr: ["مسبح", "صالة رياضية", "كونسيرج", "أمن", "موقف سيارات"],
    nearbyPlaces: {
      beach: "2 KM",
      cityCenter: "20 KM",
      airport: "25 KM",
    },
    specifications: [
      { rooms: "2+1", bathrooms: "02", area: "85 M²", price: "385,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "120 M²", price: "485,000 $" },
    ],
    paymentPlan: {
      downPayment: "40%",
      installments: "60% over 18 months",
    },
    whyChoose: [
      "Private elevator access",
      "Rooftop terrace",
      "Smart home technology",
      "24/7 security",
    ],
    whyChooseAr: [
      "وصول خاص بالمصعد",
      "تراس على السطح",
      "تقنية المنزل الذكي",
      "أمن على مدار الساعة",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Installment Properties
  {
    id: 3,
    title: "Modern Family Apartment",
    titleAr: "شقة عائلية حديثة",
    location: "Downtown Dubai, UAE",
    locationAr: "وسط مدينة دبي، الإمارات",
    bedrooms: 2,
    area: "120 M²",
    price: "$ 2500.00",
    propertyType: "Installment",
    propertyTypeAr: "تقسيط",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    views: 156,
    slug: "modern-family-apartment",
    propertySlug: "installment",
    description:
      "Perfect for families, this modern apartment offers comfortable living with easy access to schools, shopping centers, and public transportation.",
    descriptionAr:
      "مثالية للعائلات، تقدم هذه الشقة الحديثة معيشة مريحة مع سهولة الوصول إلى المدارس ومراكز التسوق والمواصلات العامة.",
    amenities: ["Balcony", "Storage", "Parking", "Playground", "Security"],
    amenitiesAr: ["شرفة", "مخزن", "موقف سيارات", "ملعب", "أمن"],
    nearbyPlaces: {
      beach: "12 KM",
      cityCenter: "5 KM",
      airport: "15 KM",
    },
    specifications: [
      { rooms: "1+1", bathrooms: "01", area: "75 M²", price: "180,000 $" },
      { rooms: "2+1", bathrooms: "02", area: "120 M²", price: "250,000 $" },
    ],
    paymentPlan: {
      downPayment: "30%",
      installments: "70% over 24 months",
    },
    whyChoose: [
      "Family-friendly neighborhood",
      "Modern amenities",
      "Affordable pricing",
      "Flexible payment plans",
    ],
    whyChooseAr: [
      "حي مناسب للعائلات",
      "مرافق حديثة",
      "أسعار معقولة",
      "خطط دفع مرنة",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Rent Properties
  {
    id: 4,
    title: "Cozy Studio Apartment",
    titleAr: "استوديو دافئ",
    location: "JBR, Dubai, UAE",
    locationAr: "جبل علي، دبي، الإمارات",
    bedrooms: 0,
    area: "45 M²",
    price: "$ 1200.00",
    propertyType: "Rent",
    propertyTypeAr: "إيجار",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.1,
    views: 98,
    slug: "cozy-studio-apartment",
    propertySlug: "rent",
    description:
      "Perfect for young professionals, this cozy studio offers modern living in a vibrant neighborhood with beach access.",
    descriptionAr:
      "مثالية للموظفين الشباب، يقدم هذا الاستوديو الدافئ معيشة حديثة في حي نابض بالحياة مع إمكانية الوصول للشاطئ.",
    amenities: ["Balcony", "WiFi", "Kitchen", "Laundry", "Security"],
    amenitiesAr: ["شرفة", "واي فاي", "مطبخ", "غسيل", "أمن"],
    nearbyPlaces: {
      beach: "0.5 KM",
      cityCenter: "18 KM",
      airport: "22 KM",
    },
    specifications: [
      { rooms: "Studio", bathrooms: "01", area: "45 M²", price: "1200 $" },
    ],
    paymentPlan: {
      downPayment: "2 months rent",
      installments: "Monthly payments",
    },
    whyChoose: [
      "Beach proximity",
      "Modern appliances",
      "Flexible lease terms",
      "Vibrant community",
    ],
    whyChooseAr: [
      "قرب من الشاطئ",
      "أجهزة حديثة",
      "شروط إيجار مرنة",
      "مجتمع نابض بالحياة",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Villas Properties
  {
    id: 5,
    title: "Beachfront Villa",
    titleAr: "فيلا على الشاطئ",
    location: "Palm Jumeirah, Dubai, UAE",
    locationAr: "جزيرة النخلة، دبي، الإمارات",
    bedrooms: 5,
    area: "650 M²",
    price: "$ 8500.00",
    propertyType: "Villas",
    propertyTypeAr: "فيلات",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    views: 312,
    slug: "beachfront-villa",
    propertySlug: "villas",
    description:
      "Exclusive beachfront villa with private beach access, infinity pool, and breathtaking ocean views.",
    descriptionAr:
      "فيلا حصرية على الشاطئ مع وصول خاص للشاطئ ومسبح لانهائي ومناظر خلابة للمحيط.",
    amenities: ["Private Beach", "Infinity Pool", "Garden", "Gym", "Security"],
    amenitiesAr: ["شاطئ خاص", "مسبح لانهائي", "حديقة", "صالة رياضية", "أمن"],
    nearbyPlaces: {
      beach: "0 KM",
      cityCenter: "25 KM",
      airport: "30 KM",
    },
    specifications: [
      { rooms: "3+1", bathrooms: "04", area: "450 M²", price: "650,000 $" },
      { rooms: "4+1", bathrooms: "05", area: "550 M²", price: "750,000 $" },
      { rooms: "5+1", bathrooms: "06", area: "650 M²", price: "850,000 $" },
    ],
    paymentPlan: {
      downPayment: "60%",
      installments: "40% over 36 months",
    },
    whyChoose: [
      "Direct beach access",
      "Luxury finishes",
      "Privacy and security",
      "Exclusive location",
    ],
    whyChooseAr: [
      "وصول مباشر للشاطئ",
      "إنهاءات فاخرة",
      "خصوصية وأمان",
      "موقع حصري",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Apartments Properties
  {
    id: 6,
    title: "City Center Apartment",
    titleAr: "شقة وسط المدينة",
    location: "Downtown Dubai, UAE",
    locationAr: "وسط مدينة دبي، الإمارات",
    bedrooms: 1,
    area: "85 M²",
    price: "$ 1800.00",
    propertyType: "Apartments",
    propertyTypeAr: "شقق",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    views: 167,
    slug: "city-center-apartment",
    propertySlug: "apartments",
    description:
      "Modern apartment in the heart of Dubai with easy access to shopping, dining, and entertainment.",
    descriptionAr:
      "شقة حديثة في قلب دبي مع سهولة الوصول للتسوق والمطاعم والترفيه.",
    amenities: ["Balcony", "Parking", "Security", "Gym", "Pool"],
    amenitiesAr: ["شرفة", "موقف سيارات", "أمن", "صالة رياضية", "مسبح"],
    nearbyPlaces: {
      beach: "15 KM",
      cityCenter: "0.5 KM",
      airport: "12 KM",
    },
    specifications: [
      { rooms: "1+1", bathrooms: "01", area: "85 M²", price: "1800 $" },
    ],
    paymentPlan: {
      downPayment: "1 month rent",
      installments: "Monthly payments",
    },
    whyChoose: [
      "Central location",
      "Modern design",
      "City views",
      "Walkable neighborhood",
    ],
    whyChooseAr: [
      "موقع مركزي",
      "تصميم حديث",
      "مناظر المدينة",
      "حي يمكن المشي فيه",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Offices Properties
  {
    id: 7,
    title: "Modern Office Space",
    titleAr: "مساحة مكتبية حديثة",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 0,
    area: "200 M²",
    price: "$ 3200.00",
    propertyType: "Offices",
    propertyTypeAr: "مكاتب",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    views: 134,
    slug: "modern-office-space",
    propertySlug: "offices",
    description:
      "Professional office space with modern amenities, meeting rooms, and business center facilities.",
    descriptionAr:
      "مساحة مكتبية احترافية مع مرافق حديثة وغرف اجتماعات ومرافق مركز الأعمال.",
    amenities: [
      "Meeting Rooms",
      "WiFi",
      "Parking",
      "Security",
      "Business Center",
    ],
    amenitiesAr: [
      "غرف اجتماعات",
      "واي فاي",
      "موقف سيارات",
      "أمن",
      "مركز أعمال",
    ],
    nearbyPlaces: {
      beach: "8 KM",
      cityCenter: "12 KM",
      airport: "8 KM",
    },
    specifications: [
      { rooms: "Open Plan", bathrooms: "02", area: "200 M²", price: "3200 $" },
    ],
    paymentPlan: {
      downPayment: "3 months rent",
      installments: "Monthly payments",
    },
    whyChoose: [
      "Business district location",
      "Professional environment",
      "Modern facilities",
      "Flexible leasing",
    ],
    whyChooseAr: [
      "موقع في حي الأعمال",
      "بيئة احترافية",
      "مرافق حديثة",
      "إيجار مرن",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Additional properties for variety
  {
    id: 8,
    title: "Garden Villa",
    titleAr: "فيلا حديقة",
    location: "Emirates Hills, Dubai, UAE",
    locationAr: "تلال الإمارات، دبي، الإمارات",
    bedrooms: 4,
    area: "580 M²",
    price: "$ 5200.00",
    propertyType: "Villas",
    propertyTypeAr: "فيلات",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    views: 245,
    slug: "garden-villa",
    propertySlug: "villas",
    description:
      "Spacious villa with beautiful garden, perfect for families who love outdoor living.",
    descriptionAr:
      "فيلا واسعة مع حديقة جميلة، مثالية للعائلات التي تحب الحياة الخارجية.",
    amenities: ["Garden", "Pool", "BBQ Area", "Parking", "Security"],
    amenitiesAr: ["حديقة", "مسبح", "منطقة شواء", "موقف سيارات", "أمن"],
    nearbyPlaces: {
      beach: "18 KM",
      cityCenter: "22 KM",
      airport: "28 KM",
    },
    specifications: [
      { rooms: "3+1", bathrooms: "03", area: "480 M²", price: "420,000 $" },
      { rooms: "4+1", bathrooms: "04", area: "580 M²", price: "520,000 $" },
    ],
    paymentPlan: {
      downPayment: "50%",
      installments: "50% over 24 months",
    },
    whyChoose: [
      "Large garden space",
      "Family-friendly design",
      "Quiet neighborhood",
      "Nature views",
    ],
    whyChooseAr: [
      "مساحة حديقة كبيرة",
      "تصميم مناسب للعائلات",
      "حي هادئ",
      "مناظر طبيعية",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Under Construction Properties
  {
    id: 9,
    title: "Future Development",
    titleAr: "تطوير مستقبلي",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 4,
    area: "480 M²",
    price: "$ 4000.00",
    propertyType: "Under Construction",
    propertyTypeAr: "قيد الإنشاء",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    views: 178,
    slug: "future-development",
    propertySlug: "under-construction",
    description:
      "Modern development project with cutting-edge design and premium finishes.",
    descriptionAr: "مشروع تطوير حديث بتصميم متطور وإنهاءات فاخرة.",
    amenities: [
      "Modern Design",
      "Premium Finishes",
      "Smart Home",
      "Security",
      "Parking",
    ],
    amenitiesAr: [
      "تصميم حديث",
      "إنهاءات فاخرة",
      "منزل ذكي",
      "أمن",
      "موقف سيارات",
    ],
    nearbyPlaces: {
      beach: "10 KM",
      cityCenter: "8 KM",
      airport: "12 KM",
    },
    specifications: [
      { rooms: "2+1", bathrooms: "02", area: "320 M²", price: "280,000 $" },
      { rooms: "3+1", bathrooms: "02", area: "400 M²", price: "350,000 $" },
      { rooms: "4+1", bathrooms: "03", area: "480 M²", price: "400,000 $" },
    ],
    paymentPlan: {
      downPayment: "30%",
      installments: "70% over 36 months",
    },
    whyChoose: [
      "Future-ready design",
      "Premium location",
      "Flexible payment plans",
      "High investment potential",
    ],
    whyChooseAr: [
      "تصميم مستقبلي",
      "موقع متميز",
      "خطط دفع مرنة",
      "إمكانية استثمار عالية",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Investment Properties
  {
    id: 10,
    title: "Investment Property",
    titleAr: "عقار استثماري",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 6,
    area: "700 M²",
    price: "$ 6000.00",
    propertyType: "Investment",
    propertyTypeAr: "استثماري",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    views: 267,
    slug: "investment-property",
    propertySlug: "investment",
    description:
      "High-yield investment property with excellent rental potential and capital appreciation.",
    descriptionAr:
      "عقار استثماري عالي العائد مع إمكانية إيجار ممتازة وتقدير رأس المال.",
    amenities: [
      "High Yield",
      "Rental Ready",
      "Investment Grade",
      "Security",
      "Parking",
    ],
    amenitiesAr: [
      "عائد مرتفع",
      "جاهز للإيجار",
      "درجة استثمارية",
      "أمن",
      "موقف سيارات",
    ],
    nearbyPlaces: {
      beach: "12 KM",
      cityCenter: "6 KM",
      airport: "10 KM",
    },
    specifications: [
      { rooms: "5+1", bathrooms: "05", area: "600 M²", price: "520,000 $" },
      { rooms: "6+1", bathrooms: "06", area: "700 M²", price: "600,000 $" },
    ],
    paymentPlan: {
      downPayment: "50%",
      installments: "50% over 24 months",
    },
    whyChoose: [
      "High rental yield",
      "Prime investment location",
      "Strong capital growth",
      "Professional management",
    ],
    whyChooseAr: [
      "عائد إيجار مرتفع",
      "موقع استثماري متميز",
      "نمو رأسمالي قوي",
      "إدارة احترافية",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Luxury Properties
  {
    id: 11,
    title: "Luxury Penthouse",
    titleAr: "بنتهاوس فاخر",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 5,
    area: "900 M²",
    price: "$ 12000.00",
    propertyType: "Luxury",
    propertyTypeAr: "فاخر",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    views: 389,
    slug: "luxury-penthouse",
    propertySlug: "luxury",
    description:
      "Ultra-luxury penthouse with panoramic city views and world-class amenities.",
    descriptionAr:
      "بنتهاوس فاخر للغاية مع مناظر بانورامية للمدينة ومرافق عالمية المستوى.",
    amenities: [
      "Ultra Luxury",
      "Panoramic Views",
      "World Class",
      "Concierge",
      "Private Pool",
    ],
    amenitiesAr: [
      "فخامة فائقة",
      "مناظر بانورامية",
      "مستوى عالمي",
      "كونسيرج",
      "مسبح خاص",
    ],
    nearbyPlaces: {
      beach: "8 KM",
      cityCenter: "2 KM",
      airport: "8 KM",
    },
    specifications: [
      { rooms: "4+1", bathrooms: "05", area: "750 M²", price: "950,000 $" },
      { rooms: "5+1", bathrooms: "06", area: "900 M²", price: "1,200,000 $" },
    ],
    paymentPlan: {
      downPayment: "60%",
      installments: "40% over 60 months",
    },
    whyChoose: [
      "Ultra-luxury living",
      "Panoramic city views",
      "World-class amenities",
      "Exclusive address",
    ],
    whyChooseAr: [
      "معيشة فاخرة للغاية",
      "مناظر بانورامية للمدينة",
      "مرافق عالمية المستوى",
      "عنوان حصري",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Ready to Move Properties
  {
    id: 12,
    title: "Ready Villa",
    titleAr: "فيلا جاهزة",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 4,
    area: "520 M²",
    price: "$ 4500.00",
    propertyType: "Ready to Move",
    propertyTypeAr: "جاهز للسكن",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    views: 298,
    slug: "ready-villa",
    propertySlug: "ready-to-move",
    description:
      "Move-in ready villa with all amenities and immediate occupancy available.",
    descriptionAr: "فيلا جاهزة للسكن مع جميع المرافق وإمكانية السكن الفوري.",
    amenities: [
      "Move-in Ready",
      "All Amenities",
      "Immediate Occupancy",
      "Security",
      "Garden",
    ],
    amenitiesAr: ["جاهز للسكن", "جميع المرافق", "سكن فوري", "أمن", "حديقة"],
    nearbyPlaces: {
      beach: "16 KM",
      cityCenter: "10 KM",
      airport: "18 KM",
    },
    specifications: [
      { rooms: "3+1", bathrooms: "03", area: "450 M²", price: "380,000 $" },
      { rooms: "4+1", bathrooms: "04", area: "520 M²", price: "450,000 $" },
    ],
    paymentPlan: {
      downPayment: "40%",
      installments: "60% over 24 months",
    },
    whyChoose: [
      "Immediate occupancy",
      "Fully furnished",
      "All utilities ready",
      "No waiting time",
    ],
    whyChooseAr: [
      "سكن فوري",
      "مفروشة بالكامل",
      "جميع المرافق جاهزة",
      "لا وقت انتظار",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  // Sea View Properties
  {
    id: 13,
    title: "Sea View Villa",
    titleAr: "فيلا بإطلالة بحرية",
    location: "Business Bay, Dubai, UAE",
    locationAr: "خليج الأعمال، دبي، الإمارات",
    bedrooms: 4,
    area: "580 M²",
    price: "$ 6800.00",
    propertyType: "Sea View",
    propertyTypeAr: "إطلالة بحرية",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    views: 356,
    slug: "sea-view-villa",
    propertySlug: "sea-view",
    description:
      "Stunning villa with breathtaking sea views and direct beach access.",
    descriptionAr: "فيلا رائعة مع إطلالات بحرية خلابة ووصول مباشر للشاطئ.",
    amenities: [
      "Sea View",
      "Beach Access",
      "Panoramic Views",
      "Private Beach",
      "Luxury Finishes",
    ],
    amenitiesAr: [
      "إطلالة بحرية",
      "وصول للشاطئ",
      "مناظر بانورامية",
      "شاطئ خاص",
      "إنهاءات فاخرة",
    ],
    nearbyPlaces: {
      beach: "0.5 KM",
      cityCenter: "20 KM",
      airport: "25 KM",
    },
    specifications: [
      { rooms: "3+1", bathrooms: "04", area: "480 M²", price: "580,000 $" },
      { rooms: "4+1", bathrooms: "05", area: "580 M²", price: "680,000 $" },
    ],
    paymentPlan: {
      downPayment: "55%",
      installments: "45% over 48 months",
    },
    whyChoose: [
      "Breathtaking sea views",
      "Direct beach access",
      "Luxury finishes",
      "Exclusive location",
    ],
    whyChooseAr: [
      "إطلالات بحرية خلابة",
      "وصول مباشر للشاطئ",
      "إنهاءات فاخرة",
      "موقع حصري",
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// Investment Properties Data
export const investmentProperties: InvestmentProperty[] = [
  {
    id: 1,
    title: "Luxury Hotel Investment",
    titleAr: "استثمار فندق فاخر",
    location: "Palm Jumeirah, Dubai",
    locationAr: "جزيرة النخلة، دبي",
    image: "/src/assets/images/property1.jpg",
    date: "2025-01-15",
    price: "$2.5M",
    priceAr: "2.5 مليون دولار",
    description: "High-yield hotel investment opportunity in prime location",
    descriptionAr: "فرصة استثمار فندقي عالي العائد في موقع متميز",
  },
  {
    id: 2,
    title: "Commercial Complex",
    titleAr: "مجمع تجاري",
    location: "Business Bay, Dubai",
    locationAr: "خليج الأعمال، دبي",
    image: "/src/assets/images/property2.jpg",
    date: "2025-01-10",
    price: "$5.8M",
    priceAr: "5.8 مليون دولار",
    description:
      "Mixed-use commercial development with retail and office spaces",
    descriptionAr: "تطوير تجاري متعدد الاستخدامات مع مساحات تجارية ومكتبية",
  },
  {
    id: 3,
    title: "Residential Tower",
    titleAr: "برج سكني",
    location: "Downtown Dubai",
    locationAr: "وسط مدينة دبي",
    image: "/src/assets/images/property3.jpg",
    date: "2025-01-05",
    price: "$8.2M",
    priceAr: "8.2 مليون دولار",
    description: "Premium residential tower with luxury amenities",
    descriptionAr: "برج سكني فاخر مع مرافق فاخرة",
  },
];

// News Articles Data
export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Dubai Real Estate Market Trends 2025",
    titleAr: "اتجاهات سوق العقارات في دبي 2025",
    description: "Analysis of current market conditions and future predictions",
    descriptionAr: "تحليل الظروف السوقية الحالية والتنبؤات المستقبلية",
    image: "/src/assets/images/news1.jpg",
    date: "2025-01-20",
    views: 1247,
    category: "Market Analysis",
    categoryAr: "تحليل السوق",
  },
  {
    id: 2,
    title: "New Property Developments in Palm Jumeirah",
    titleAr: "تطويرات عقارية جديدة في جزيرة النخلة",
    description: "Latest updates on luxury property projects",
    descriptionAr: "أحدث التحديثات حول مشاريع العقارات الفاخرة",
    image: "/src/assets/images/news2.jpg",
    date: "2025-01-18",
    views: 892,
    category: "Development",
    categoryAr: "التطوير",
  },
  {
    id: 3,
    title: "Investment Opportunities in Business Bay",
    titleAr: "فرص الاستثمار في خليج الأعمال",
    description: "Exploring profitable investment options",
    descriptionAr: "استكشاف خيارات الاستثمار المربحة",
    image: "/src/assets/images/news3.jpg",
    date: "2025-01-15",
    views: 1567,
    category: "Investment",
    categoryAr: "الاستثمار",
  },
  {
    id: 4,
    title: "Sustainable Real Estate Practices",
    titleAr: "الممارسات العقارية المستدامة",
    description: "Green building initiatives and eco-friendly properties",
    descriptionAr: "مبادرات البناء الأخضر والعقارات الصديقة للبيئة",
    image: "/src/assets/images/news4.jpg",
    date: "2025-01-12",
    views: 734,
    category: "Sustainability",
    categoryAr: "الاستدامة",
  },
];

// Countries/Cities Data
export const countries: Country[] = [
  {
    id: 1,
    name: "Istanbul",
    nameAr: "إسطنبول",
    flag: "/src/assets/images/tr.png",
    propertyCount: 234,
  },
  {
    id: 2,
    name: "Ankara",
    nameAr: "أنقرة",
    flag: "/src/assets/images/tr.png",
    propertyCount: 156,
  },
  {
    id: 3,
    name: "Izmir",
    nameAr: "إزمير",
    flag: "/src/assets/images/tr.png",
    propertyCount: 98,
  },
  {
    id: 4,
    name: "Antalya",
    nameAr: "أنطاليا",
    flag: "/src/assets/images/tr.png",
    propertyCount: 187,
  },
];

// Helper functions
export const getPropertiesByType = (propertySlug: string): Property[] => {
  return properties.filter(
    (property) => property.propertySlug === propertySlug
  );
};

export const getPropertyBySlug = (
  propertySlug: string,
  productSlug: string
): Property | undefined => {
  return properties.find(
    (property) =>
      property.propertySlug === propertySlug && property.slug === productSlug
  );
};

interface SearchFilters {
  propertyType?: string;
  bedrooms?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  location?: string;
}

export const searchProperties = (
  query: string,
  filters: SearchFilters = {}
): Property[] => {
  let results = properties;

  // Text search
  if (query) {
    results = results.filter(
      (property) =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply filters
  if (filters.propertyType) {
    results = results.filter(
      (property) => property.propertySlug === filters.propertyType
    );
  }

  if (filters.bedrooms !== undefined) {
    results = results.filter(
      (property) => property.bedrooms >= filters.bedrooms!
    );
  }

  if (filters.priceRange) {
    // Implement price range filtering logic based on numeric price values
    results = results.filter((property) => {
      const price = parseFloat(property.price.replace(/[^0-9.]/g, ""));
      return (
        price >= filters.priceRange!.min && price <= filters.priceRange!.max
      );
    });
  }

  if (filters.location) {
    results = results.filter((property) =>
      property.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((property) =>
      filters.amenities!.some((amenity) =>
        property.amenities.some((propAmenity) =>
          propAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      )
    );
  }

  return results;
};

export const getRelatedProperties = (
  currentProperty: Property,
  limit: number = 4
): Property[] => {
  return properties
    .filter(
      (property) =>
        property.id !== currentProperty.id &&
        property.propertySlug === currentProperty.propertySlug
    )
    .slice(0, limit);
};

// Helper function to get category filters with real counts
export const getCategoryFilters = () => {
  return propertyTypes.map((type) => ({
    id: type.slug,
    name: type.name,
    nameAr: type.nameAr,
    count: getPropertiesByType(type.slug).length,
  }));
};
