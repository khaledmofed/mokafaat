import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { PatternNewProperty } from "@assets";
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowRoundForward } from "react-icons/io";
import NewsCard from "./NewsCard";

interface NewsArticle {
  id: number;
  image: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  dateEn: string;
  views: string;
  category: string;
  categoryEn: string;
  categoryAr: string;
  slug: string;
}

// Export news articles data
export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "أفضل العروض والخصومات في المملكة العربية السعودية",
    titleEn: "Best Offers and Discounts in Saudi Arabia",
    description:
      "اكتشف أحدث العروض والخصومات الحصرية في المملكة العربية السعودية. وفر المال مع أفضل الكوبونات والعروض المتاحة",
    descriptionEn:
      "Discover the latest exclusive offers and discounts in Saudi Arabia. Save money with the best coupons and deals available",
    date: "15 مارس 2025",
    dateEn: "15 Mar 2025",
    views: "1,245",
    category: "العروض والخصومات",
    categoryEn: "Offers & Discounts",
    categoryAr: "العروض والخصومات",
    slug: "best-offers-discounts-saudi",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "دليل شامل لاستخدام البطاقات الائتمانية بذكاء",
    titleEn: "Complete Guide to Smart Credit Card Usage",
    description:
      "تعلم كيفية استخدام البطاقات الائتمانية بذكاء لتحقيق أقصى استفادة من المكافآت والخصومات المتاحة",
    descriptionEn:
      "Learn how to use credit cards smartly to maximize rewards and available discounts",
    date: "12 مارس 2025",
    dateEn: "12 Mar 2025",
    views: "892",
    category: "البطاقات الائتمانية",
    categoryEn: "Credit Cards",
    categoryAr: "البطاقات الائتمانية",
    slug: "smart-credit-card-guide",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "كيفية الحصول على أفضل أسعار الحجوزات السياحية",
    titleEn: "How to Get the Best Travel Booking Prices",
    description:
      "نصائح وحيل للحصول على أفضل الأسعار عند حجز الفنادق والطيران والسيارات. وفر المال في رحلاتك القادمة",
    descriptionEn:
      "Tips and tricks to get the best prices when booking hotels, flights, and cars. Save money on your upcoming trips",
    date: "10 مارس 2025",
    dateEn: "10 Mar 2025",
    views: "1,567",
    category: "الحجوزات السياحية",
    categoryEn: "Travel Bookings",
    categoryAr: "الحجوزات السياحية",
    slug: "best-travel-booking-prices",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "أفضل المطاعم والمقاهي في الرياض وجدة",
    titleEn: "Best Restaurants and Cafes in Riyadh and Jeddah",
    description:
      "اكتشف أفضل المطاعم والمقاهي في الرياض وجدة مع العروض الحصرية والخصومات المتاحة",
    descriptionEn:
      "Discover the best restaurants and cafes in Riyadh and Jeddah with exclusive offers and available discounts",
    date: "8 مارس 2025",
    dateEn: "8 Mar 2025",
    views: "2,134",
    category: "المطاعم والمقاهي",
    categoryEn: "Restaurants & Cafes",
    categoryAr: "المطاعم والمقاهي",
    slug: "best-restaurants-riyadh-jeddah",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "كوبونات التسوق الإلكتروني: دليل المبتدئين",
    titleEn: "E-commerce Shopping Coupons: Beginner's Guide",
    description:
      "تعلم كيفية استخدام كوبونات التسوق الإلكتروني لتحقيق توفير كبير في مشترياتك اليومية",
    descriptionEn:
      "Learn how to use e-commerce shopping coupons to achieve significant savings on your daily purchases",
    date: "6 مارس 2025",
    dateEn: "6 Mar 2025",
    views: "1,789",
    category: "الكوبونات والعروض",
    categoryEn: "Coupons & Deals",
    categoryAr: "الكوبونات والعروض",
    slug: "ecommerce-coupons-guide",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "أفضل تطبيقات التوفير والخصومات في السعودية",
    titleEn: "Best Savings and Discount Apps in Saudi Arabia",
    description:
      "تعرف على أفضل التطبيقات التي تساعدك في التوفير والحصول على الخصومات في المملكة العربية السعودية",
    descriptionEn:
      "Learn about the best apps that help you save and get discounts in Saudi Arabia",
    date: "4 مارس 2025",
    dateEn: "4 Mar 2025",
    views: "1,456",
    category: "تطبيقات التوفير",
    categoryEn: "Savings Apps",
    categoryAr: "تطبيقات التوفير",
    slug: "best-savings-apps-saudi",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "نصائح للحصول على أفضل أسعار الفنادق",
    titleEn: "Tips for Getting the Best Hotel Prices",
    description:
      "اكتشف الأسرار والحيل للحصول على أفضل أسعار الفنادق في جميع أنحاء العالم",
    descriptionEn:
      "Discover the secrets and tricks to get the best hotel prices around the world",
    date: "2 مارس 2025",
    dateEn: "2 Mar 2025",
    views: "1,234",
    category: "الحجوزات السياحية",
    categoryEn: "Travel Bookings",
    categoryAr: "الحجوزات السياحية",
    slug: "best-hotel-prices-tips",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "أفضل العروض على البطاقات الهدايا",
    titleEn: "Best Gift Card Offers",
    description:
      "اكتشف أفضل العروض والخصومات على البطاقات الهدايا من المتاجر والمطاعم الشهيرة",
    descriptionEn:
      "Discover the best offers and discounts on gift cards from famous stores and restaurants",
    date: "28 فبراير 2025",
    dateEn: "28 Feb 2025",
    views: "987",
    category: "البطاقات الهدايا",
    categoryEn: "Gift Cards",
    categoryAr: "البطاقات الهدايا",
    slug: "best-gift-card-offers",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "دليل السياحة الداخلية في السعودية",
    titleEn: "Saudi Arabia Domestic Tourism Guide",
    description:
      "اكتشف أجمل الوجهات السياحية داخل المملكة العربية السعودية مع أفضل العروض على الحجوزات",
    descriptionEn:
      "Discover the most beautiful tourist destinations within Saudi Arabia with the best booking offers",
    date: "26 فبراير 2025",
    dateEn: "26 Feb 2025",
    views: "1,678",
    category: "السياحة الداخلية",
    categoryEn: "Domestic Tourism",
    categoryAr: "السياحة الداخلية",
    slug: "saudi-domestic-tourism-guide",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "كيفية اختيار أفضل بطاقة ائتمانية لك",
    titleEn: "How to Choose the Best Credit Card for You",
    description:
      "دليل شامل لاختيار البطاقة الائتمانية المناسبة لاحتياجاتك وأسلوب حياتك",
    descriptionEn:
      "Comprehensive guide to choosing the right credit card for your needs and lifestyle",
    date: "24 فبراير 2025",
    dateEn: "24 Feb 2025",
    views: "1,345",
    category: "البطاقات الائتمانية",
    categoryEn: "Credit Cards",
    categoryAr: "البطاقات الائتمانية",
    slug: "choose-best-credit-card",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "أفضل العروض على حجز السيارات",
    titleEn: "Best Car Rental Booking Offers",
    description:
      "اكتشف أفضل العروض والخصومات على حجز السيارات في المملكة العربية السعودية",
    descriptionEn:
      "Discover the best offers and discounts on car rentals in Saudi Arabia",
    date: "22 فبراير 2025",
    dateEn: "22 Feb 2025",
    views: "1,123",
    category: "حجز السيارات",
    categoryEn: "Car Rentals",
    categoryAr: "حجز السيارات",
    slug: "best-car-rental-offers",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3auto=format&fit=crop&w=1000&q=80",
    title: "نصائح للتسوق الذكي وتوفير المال",
    titleEn: "Smart Shopping Tips to Save Money",
    description:
      "تعلم فن التسوق الذكي وكيفية توفير المال في كل مشترياتك باستخدام الكوبونات والعروض",
    descriptionEn:
      "Learn the art of smart shopping and how to save money on all your purchases using coupons and offers",
    date: "20 فبراير 2025",
    dateEn: "20 Feb 2025",
    views: "1,567",
    category: "نصائح التسوق",
    categoryEn: "Shopping Tips",
    categoryAr: "نصائح التسوق",
    slug: "smart-shopping-tips",
  },
];

const NewsBlogs: React.FC = () => {
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  const owlCarouselOptions1 = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  };

  const handleShare = (id: number) => {
    console.log("Share clicked:", id);
  };

  const handleVisit = (id: number) => {
    console.log("Visit clicked:", id);
  };

  return (
    <section className="pb-16 lg:pb-32 relative overflow-hidden pt-10 lg:pt-20">
      <div className="container mx-auto relative px-4 z-10">
        <div className="block lg:flex gap-12 justify-between items-end">
          {/* Left Section - Content */}

          <div className={`space-y-6`}>
            {/* Header */}
            <div className="text-start mb-0">
              <h2 className="text-[#400198] text-3xl font-bold">
                {t("newsBlogs.subtitle")}
              </h2>
              <p className="text-md text-gray-700 leading-relaxed">
                {t("newsBlogs.mainTitle")}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => navigate("/blogs")}
              className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
              style={{
                marginTop: "0px",
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              <span>{t("newsBlogs.viewBlogs")}</span>
              <IoIosArrowRoundForward
                className={`text-3xl transform ${
                  isRTL ? "rotate-45" : "-rotate-45"
                }`}
              />
            </button>
          </div>
        </div>

        {/* News Articles Carousel */}
        <div className="mt-0 InvestmentCarousel NewsCarousel">
          <OwlCarousel
            className="owl-theme"
            {...owlCarouselOptions1}
            style={{
              direction: "ltr",
            }}
          >
            {newsArticles.map((article) => (
              <div key={article.id} className="item">
                <NewsCard
                  {...article}
                  onShare={handleShare}
                  onVisit={handleVisit}
                />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>

      <div
        className={`absolute -bottom-40 w-1/1 sm:w-1/1 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={PatternNewProperty}
          alt={t("worldwideProperties.appPattern")}
          className="h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default NewsBlogs;
