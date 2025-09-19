import {
  G1,
  G2,
  G3,
  G4,
  G5,
  G6,
  G7,
  G8,
  G9,
  G10,
  G11,
  G12,
  // G13,
  // G14,
  // G15,
  // G16,
  // G17,
  // G18,
} from "@assets";

export type PortfolioCategory = "Events" | "Promotion" | "Logistic";

export interface PortfolioItem {
  id: number;
  title: string;
  titleAr?: string;
  titleEn?: string;
  slug: string;
  image: string;
  category: PortfolioCategory;
  location: string;
  locationAr?: string;
  locationEn?: string;
  description: string;
  descriptionAr?: string;
  descriptionEn?: string;
  tags?: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "City Hub - Al Baha",
    titleAr: "سيتي هب - الباحة",
    titleEn: "City Hub - Al Baha",
    slug: "city-hub-al-baha",
    image: G1,
    category: "Events",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "A vibrant event bringing together communities with immersive activities and live performances.",
    descriptionAr: "فعالية نابضة تجمع المجتمعات مع أنشطة تفاعلية وعروض مباشرة.",
    descriptionEn:
      "A vibrant event bringing together communities with immersive activities and live performances.",
    tags: ["community", "live"],
  },
  {
    id: 2,
    title: "Expo Leadership Summit",
    titleAr: "قمة قادة المعرض",
    titleEn: "Expo Leadership Summit",
    slug: "expo-leadership-summit",
    image: G2,
    category: "Promotion",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "A strategic promotional summit highlighting leadership and innovation across industries.",
    descriptionAr:
      "قمة ترويجية استراتيجية تُبرز القيادة والابتكار عبر مختلف القطاعات.",
    descriptionEn:
      "A strategic promotional summit highlighting leadership and innovation across industries.",
    tags: ["summit", "promotion"],
  },
  {
    id: 3,
    title: "Global Sports Night",
    titleAr: "ليلة الرياضات العالمية",
    titleEn: "Global Sports Night",
    slug: "global-sports-night",
    image: G3,
    category: "Logistic",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "End-to-end logistics for an unforgettable international sports celebration.",
    descriptionAr: "خدمات لوجستية متكاملة لاحتفالية رياضية دولية لا تُنسى.",
    descriptionEn:
      "End-to-end logistics for an unforgettable international sports celebration.",
    tags: ["sports", "logistics"],
  },
  {
    id: 4,
    title: "Cultural Expo Parade",
    titleAr: "موكب المعرض الثقافي",
    titleEn: "Cultural Expo Parade",
    slug: "cultural-expo-parade",
    image: G4,
    category: "Events",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "A colorful parade showcasing regional culture with coordinated event operations.",
    descriptionAr:
      "موكب ملوّن يستعرض الثقافة الإقليمية مع عمليات فعالية منسقة.",
    descriptionEn:
      "A colorful parade showcasing regional culture with coordinated event operations.",
    tags: ["culture", "parade"],
  },
  {
    id: 5,
    title: "Brand Awareness Drive",
    titleAr: "حملة تعزيز الوعي بالعلامة",
    titleEn: "Brand Awareness Drive",
    slug: "brand-awareness-drive",
    image: G5,
    category: "Promotion",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "Multi-channel promotional campaign boosting audience reach and engagement.",
    descriptionAr:
      "حملة ترويجية متعددة القنوات تعزز الوصول للجمهور والتفاعل معه.",
    descriptionEn:
      "Multi-channel promotional campaign boosting audience reach and engagement.",
    tags: ["brand", "campaign"],
  },
  {
    id: 6,
    title: "Grand Logistics Showcase",
    titleAr: "عرض لوجستي كبير",
    titleEn: "Grand Logistics Showcase",
    slug: "grand-logistics-showcase",
    image: G6,
    category: "Logistic",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "Operational excellence in moving equipment and teams seamlessly at scale.",
    descriptionAr: "تميّز تشغيلي في نقل المعدات والفرق بسلاسة وعلى نطاق واسع.",
    descriptionEn:
      "Operational excellence in moving equipment and teams seamlessly at scale.",
    tags: ["operations", "scale"],
  },
  {
    id: 7,
    title: "Innovation Forum Day",
    titleAr: "يوم منتدى الابتكار",
    titleEn: "Innovation Forum Day",
    slug: "innovation-forum-day",
    image: G7,
    category: "Events",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "A forum-day experience featuring talks, workshops, and coordinated stage management.",
    descriptionAr: "يوم منتدى يتضمن محاضرات وورش عمل وإدارة منصة منسقة.",
    descriptionEn:
      "A forum-day experience featuring talks, workshops, and coordinated stage management.",
    tags: ["forum", "talks"],
  },
  {
    id: 8,
    title: "Citywide Promo Tour",
    titleAr: "جولة ترويجية في أنحاء المدينة",
    titleEn: "Citywide Promo Tour",
    slug: "citywide-promo-tour",
    image: G8,
    category: "Promotion",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "On-ground promotional activations across key city locations with brand ambassadors.",
    descriptionAr:
      "تفعيل ترويجي ميداني عبر مواقع رئيسية في المدينة بمشاركة سفراء العلامة.",
    descriptionEn:
      "On-ground promotional activations across key city locations with brand ambassadors.",
    tags: ["tour", "ambassadors"],
  },
  {
    id: 9,
    title: "Arena Logistics Run",
    titleAr: "تشغيل لوجستي في الساحة",
    titleEn: "Arena Logistics Run",
    slug: "arena-logistics-run",
    image: G9,
    category: "Logistic",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "Coordinated arena logistics ensuring timely setup and smooth audience flow.",
    descriptionAr:
      "تنسيق لوجستي للساحة يضمن إعدادًا في الوقت المناسب وتدفقًا سلسًا للجمهور.",
    descriptionEn:
      "Coordinated arena logistics ensuring timely setup and smooth audience flow.",
    tags: ["arena", "flow"],
  },
  {
    id: 10,
    title: "Ceremonial Opening Night",
    titleAr: "ليلة الافتتاح الاحتفالية",
    titleEn: "Ceremonial Opening Night",
    slug: "ceremonial-opening-night",
    image: G10,
    category: "Events",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "An elegant opening night with a curated program and show-direction.",
    descriptionAr: "ليلة افتتاح أنيقة ببرنامج منسق وإدارة عروض احترافية.",
    descriptionEn:
      "An elegant opening night with a curated program and show-direction.",
    tags: ["ceremony", "show"],
  },
  {
    id: 11,
    title: "Retail Promo Weekend",
    titleAr: "عطلة نهاية الأسبوع الترويجية للبيع بالتجزئة",
    titleEn: "Retail Promo Weekend",
    slug: "retail-promo-weekend",
    image: G11,
    category: "Promotion",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "Retail-focused promotions with sampling, interactive stations, and giveaways.",
    descriptionAr:
      "ترويج يركز على البيع بالتجزئة مع عينات ونقاط تفاعلية وهدايا.",
    descriptionEn:
      "Retail-focused promotions with sampling, interactive stations, and giveaways.",
    tags: ["retail", "sampling"],
  },
  {
    id: 12,
    title: "Festival Logistics Ops",
    titleAr: "عمليات لوجستية للمهرجان",
    titleEn: "Festival Logistics Ops",
    slug: "festival-logistics-ops",
    image: G12,
    category: "Logistic",
    location: "Jaddah. Alriwais St",
    locationAr: "جدة، شارع الرويس",
    locationEn: "Jeddah, Alriwais St",
    description:
      "Festival-wide logistics covering stage, seating, and equipment distribution.",
    descriptionAr:
      "خدمات لوجستية شاملة للمهرجان تشمل المنصة والمقاعد وتوزيع المعدات.",
    descriptionEn:
      "Festival-wide logistics covering stage, seating, and equipment distribution.",
    tags: ["festival", "distribution"],
  },
];
