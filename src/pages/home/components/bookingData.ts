// استخدام روابط الصور مباشرة من الإنترنت

export interface BookingProperty {
  id: number;
  image: string;
  title: string;
  price: string;
  category: "all" | "cars" | "hotels" | "flights";
  rating: number;
  location?: string;
  feature?: string;
}

// Booking properties data
export const bookingProperties: BookingProperty[] = [
  // ترتيب مختلط لظهور تشكيلة متنوعة في حالة "الجميع"

  // سيارة
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    title: "تويوتا كامري 2024",
    price: "250 ريال",
    category: "cars",
    rating: 4.8,
    location: "الرياض",
    feature: "أوتوماتيك",
  },

  // فندق
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    title: "فندق ريتز كارلتون",
    price: "800 ريال",
    category: "hotels",
    rating: 4.9,
    location: "الرياض",
    feature: "5 نجوم",
  },

  // طيران
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    title: "الطيران السعودي - الرياض إلى دبي",
    price: "650 ريال",
    category: "flights",
    rating: 4.5,
    location: "الرياض - دبي",
    feature: "اقتصادي",
  },

  // سيارة
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    title: "هيونداي إلنترا 2023",
    price: "180 ريال",
    category: "cars",
    rating: 4.6,
    location: "جدة",
    feature: "اقتصادي",
  },

  // فندق
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    title: "فندق شيراتون",
    price: "450 ريال",
    category: "hotels",
    rating: 4.7,
    location: "جدة",
    feature: "شاطئ البحر",
  },

  // طيران
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    title: "طيران الإمارات - جدة إلى لندن",
    price: "2500 ريال",
    category: "flights",
    rating: 4.8,
    location: "جدة - لندن",
    feature: "درجة رجال الأعمال",
  },

  // سيارة
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    title: "نيسان ألتيما 2024",
    price: "220 ريال",
    category: "cars",
    rating: 4.7,
    location: "الدمام",
    feature: "فاخر",
  },

  // فندق
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    title: "فندق هيلتون",
    price: "350 ريال",
    category: "hotels",
    rating: 4.6,
    location: "الدمام",
    feature: "وسط المدينة",
  },

  // طيران
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    title: "الخطوط القطرية - الرياض إلى باريس",
    price: "1800 ريال",
    category: "flights",
    rating: 4.7,
    location: "الرياض - باريس",
    feature: "اقتصادي",
  },

  // سيارة
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    title: "كيا سورينتو 2023",
    price: "300 ريال",
    category: "cars",
    rating: 4.9,
    location: "الرياض",
    feature: "SUV",
  },

  // فندق
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    title: "فندق ماريوت",
    price: "400 ريال",
    category: "hotels",
    rating: 4.8,
    location: "الرياض",
    feature: "بزنس",
  },

  // طيران
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    title: "طيران الاتحاد - الدمام إلى اسطنبول",
    price: "1200 ريال",
    category: "flights",
    rating: 4.6,
    location: "الدمام - اسطنبول",
    feature: "اقتصادي",
  },
];
