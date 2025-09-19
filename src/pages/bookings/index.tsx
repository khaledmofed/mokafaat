import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { AboutPattern } from "@assets";
import { MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import BookingResults from "./components/BookingResults";
import BookingSidebar from "./components/BookingSidebar";
import BookingFiltersSidebar from "./components/BookingFiltersSidebar";
import GetStartedSection from "@pages/home/components/GetStartedSection";

type BookingType = "flights" | "hotels" | "cars";

interface BookingItem {
  id: number;
  name: { ar: string; en: string };
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: { ar: string; en: string };
  duration?: string;
  airline?: string;
  departure?: string;
  arrival?: string;
  stops?: string;
  class?: string;
  stars?: number;
  amenities?: string;
  location?: string;
  distance?: string;
  type?: string;
  transmission?: string;
  seats?: number;
  fuel?: string;
  year?: number;
  features?: string[];
}

interface BookingFilters extends Record<string, unknown> {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: { adults: number; children: number; infants: number };
  class?: string;
  priceRange?: [number, number];
  airlines?: string[];
  duration?: string;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: { adults: number; children: number };
  rooms?: number;
  stars?: number;
  starRatings?: number[];
  amenities?: string[];
  pickupCity?: string;
  pickupLocation?: string;
  pickupDateTime?: string;
  returnDateTime?: string;
  carType?: string;
  carTypes?: string[];
  transmission?: string;
  carPriceRange?: [number, number];
}

const BookingsPage: React.FC = () => {
  const isRTL = useIsRTL();
  const [activeTab, setActiveTab] = useState<BookingType>("flights");
  const [filters, setFilters] = useState<BookingFilters>({});
  const [results, setResults] = useState<BookingItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<BookingFilters | null>(
    null
  );

  const handleSearch = async (searchFilters?: BookingFilters) => {
    const filtersToUse = searchFilters || filters;
    console.log("🔍 handleSearch called with:", filtersToUse);
    setIsSearching(true);
    setHasSearched(true);
    setAppliedFilters(filtersToUse);
    setShowSidebar(false);
    setShowFiltersSidebar(false);

    setTimeout(() => {
      const allResults = generateMockResults(activeTab);
      const filteredResults = applyFilters(allResults, filtersToUse);
      setResults(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleTabChange = (tab: BookingType) => {
    setActiveTab(tab);
    setFilters({});
    setAppliedFilters(null);
    setHasSearched(false);
    setResults([]);
  };

  const applyFilters = (
    results: BookingItem[],
    filters: BookingFilters
  ): BookingItem[] => {
    return results.filter((item) => {
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        if (item.price < minPrice || item.price > maxPrice) return false;
      }
      if (filters.carPriceRange) {
        const [minPrice, maxPrice] = filters.carPriceRange;
        if (item.price < minPrice || item.price > maxPrice) return false;
      }
      if (filters.airlines && filters.airlines.length > 0) {
        if (!item.airline || !filters.airlines.includes(item.airline))
          return false;
      }
      if (filters.starRatings && filters.starRatings.length > 0) {
        if (!item.stars || !filters.starRatings.includes(item.stars))
          return false;
      }
      if (filters.amenities && filters.amenities.length > 0) {
        if (!item.amenities) return false;
        const itemAmenities = item.amenities.split(", ");
        const hasMatchingAmenity = filters.amenities.some((amenity) =>
          itemAmenities.includes(amenity)
        );
        if (!hasMatchingAmenity) return false;
      }
      if (filters.carTypes && filters.carTypes.length > 0) {
        if (!item.type || !filters.carTypes.includes(item.type)) return false;
      }
      if (filters.transmission) {
        if (item.transmission !== filters.transmission) return false;
      }
      return true;
    });
  };

  const generateMockResults = (type: BookingType): BookingItem[] => {
    if (type === "flights") {
      return [
        {
          id: 1,
          name: { ar: "رحلة إلى دبي", en: "Flight to Dubai" },
          image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
          price: 2500,
          rating: 4.5,
          reviews: 120,
          description: {
            ar: "رحلة مريحة إلى دبي",
            en: "Comfortable flight to Dubai",
          },
          duration: "4h 30m",
          airline: "الإمارات",
          departure: "14:30",
          arrival: "19:00",
          stops: "مباشر",
          class: "اقتصادي",
        },
        {
          id: 2,
          name: { ar: "رحلة إلى لندن", en: "Flight to London" },
          image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
          price: 2800,
          rating: 4.7,
          reviews: 95,
          description: {
            ar: "رحلة دولية مع ترفيه",
            en: "International flight with entertainment",
          },
          duration: "7h 20m",
          airline: "البريطانية",
          departure: "22:15",
          arrival: "06:35",
          stops: "توقف واحد",
          class: "اقتصادي",
        },
        {
          id: 3,
          name: { ar: "رحلة إلى باريس", en: "Flight to Paris" },
          image:
            "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop",
          price: 2200,
          rating: 4.4,
          reviews: 156,
          description: {
            ar: "رحلة رومانسية إلى باريس",
            en: "Romantic flight to Paris",
          },
          duration: "6h 15m",
          airline: "الفرنسية",
          departure: "08:45",
          arrival: "15:00",
          stops: "مباشر",
          class: "اقتصادي",
        },
        {
          id: 4,
          name: { ar: "رحلة إلى نيويورك", en: "Flight to New York" },
          image:
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
          price: 3500,
          rating: 4.8,
          reviews: 200,
          description: {
            ar: "رحلة عبر المحيط الأطلسي",
            en: "Transatlantic flight",
          },
          duration: "12h 45m",
          airline: "الأمريكية",
          departure: "23:30",
          arrival: "14:15",
          stops: "مباشر",
          class: "اقتصادي",
        },
        {
          id: 5,
          name: { ar: "رحلة إلى طوكيو", en: "Flight to Tokyo" },
          image:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
          price: 4200,
          rating: 4.9,
          reviews: 180,
          description: { ar: "رحلة إلى اليابان", en: "Flight to Japan" },
          duration: "11h 30m",
          airline: "اليابانية",
          departure: "01:00",
          arrival: "18:30",
          stops: "مباشر",
          class: "اقتصادي",
        },
        {
          id: 6,
          name: { ar: "رحلة إلى سيدني", en: "Flight to Sydney" },
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          price: 4800,
          rating: 4.6,
          reviews: 140,
          description: { ar: "رحلة إلى أستراليا", en: "Flight to Australia" },
          duration: "14h 20m",
          airline: "الأسترالية",
          departure: "20:15",
          arrival: "18:35",
          stops: "توقف واحد",
          class: "اقتصادي",
        },
      ];
    } else if (type === "hotels") {
      return [
        {
          id: 1,
          name: { ar: "فندق برج خليفة", en: "Burj Khalifa Hotel" },
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
          price: 800,
          rating: 4.8,
          reviews: 250,
          description: {
            ar: "فندق فاخر في برج خليفة",
            en: "Luxury hotel in Burj Khalifa",
          },
          stars: 5,
          amenities: "Free WiFi, Pool, Spa, Gym, Parking",
          location: "دبي، الإمارات",
          distance: "0.5 كم من المركز",
        },
        {
          id: 2,
          name: { ar: "فندق شيراتون", en: "Sheraton Hotel" },
          image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
          price: 450,
          rating: 4.3,
          reviews: 180,
          description: {
            ar: "فندق أنيق في وسط المدينة",
            en: "Elegant hotel in city center",
          },
          stars: 4,
          amenities: "Free WiFi, Pool, Gym, Parking",
          location: "الرياض، السعودية",
          distance: "1.2 كم من المركز",
        },
        {
          id: 3,
          name: { ar: "فندق الماريوت", en: "Marriott Hotel" },
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
          price: 600,
          rating: 4.5,
          reviews: 220,
          description: {
            ar: "فندق عالمي مع خدمات مميزة",
            en: "International hotel with premium services",
          },
          stars: 5,
          amenities: "Free WiFi, Pool, Spa, Gym, Parking, Restaurant",
          location: "القاهرة، مصر",
          distance: "0.8 كم من المركز",
        },
        {
          id: 4,
          name: { ar: "فندق الهيلتون", en: "Hilton Hotel" },
          image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
          price: 550,
          rating: 4.4,
          reviews: 190,
          description: {
            ar: "فندق مريح مع إطلالة جميلة",
            en: "Comfortable hotel with beautiful views",
          },
          stars: 4,
          amenities: "Free WiFi, Pool, Gym, Parking",
          location: "الدار البيضاء، المغرب",
          distance: "2.1 كم من المركز",
        },
        {
          id: 5,
          name: { ar: "فندق الفور سيزونز", en: "Four Seasons Hotel" },
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
          price: 900,
          rating: 4.9,
          reviews: 300,
          description: {
            ar: "فندق فاخر مع خدمات استثنائية",
            en: "Luxury hotel with exceptional services",
          },
          stars: 5,
          amenities:
            "Free WiFi, Pool, Spa, Gym, Parking, Restaurant, Concierge",
          location: "أبو ظبي، الإمارات",
          distance: "0.3 كم من المركز",
        },
        {
          id: 6,
          name: { ar: "فندق الريتز كارلتون", en: "Ritz Carlton Hotel" },
          image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
          price: 750,
          rating: 4.7,
          reviews: 280,
          description: {
            ar: "فندق كلاسيكي مع لمسة عصرية",
            en: "Classic hotel with modern touch",
          },
          stars: 5,
          amenities: "Free WiFi, Pool, Spa, Gym, Parking, Restaurant",
          location: "الكويت، الكويت",
          distance: "1.5 كم من المركز",
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: { ar: "تويوتا كامري", en: "Toyota Camry" },
          image:
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
          price: 120,
          rating: 4.6,
          reviews: 150,
          description: {
            ar: "سيارة مريحة وموثوقة",
            en: "Comfortable and reliable car",
          },
          type: "Sedan",
          transmission: "Automatic",
          seats: 5,
          fuel: "بنزين",
          year: 2023,
          features: ["تكييف", "نظام صوت", "كاميرا خلفية"],
        },
        {
          id: 2,
          name: { ar: "هونداي توسان", en: "Hyundai Tucson" },
          image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
          price: 150,
          rating: 4.4,
          reviews: 120,
          description: { ar: "سيارة SUV عملية", en: "Practical SUV car" },
          type: "SUV",
          transmission: "Automatic",
          seats: 5,
          fuel: "بنزين",
          year: 2023,
          features: ["تكييف", "نظام صوت", "كاميرا خلفية", "مقاعد جلدية"],
        },
        {
          id: 3,
          name: { ar: "نيسان ألتيما", en: "Nissan Altima" },
          image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
          price: 130,
          rating: 4.5,
          reviews: 140,
          description: {
            ar: "سيارة أنيقة مع تكنولوجيا متقدمة",
            en: "Elegant car with advanced technology",
          },
          type: "Sedan",
          transmission: "Automatic",
          seats: 5,
          fuel: "بنزين",
          year: 2023,
          features: ["تكييف", "نظام صوت", "كاميرا خلفية", "شاشة لمس"],
        },
        {
          id: 4,
          name: { ar: "فورد إكسبلورر", en: "Ford Explorer" },
          image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
          price: 180,
          rating: 4.7,
          reviews: 160,
          description: {
            ar: "سيارة SUV قوية ومتعددة الاستخدامات",
            en: "Powerful and versatile SUV",
          },
          type: "SUV",
          transmission: "Automatic",
          seats: 7,
          fuel: "بنزين",
          year: 2023,
          features: [
            "تكييف",
            "نظام صوت",
            "كاميرا خلفية",
            "مقاعد جلدية",
            "دفع رباعي",
          ],
        },
        {
          id: 5,
          name: { ar: "بي إم دبليو X5", en: "BMW X5" },
          image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
          price: 250,
          rating: 4.8,
          reviews: 200,
          description: {
            ar: "سيارة فاخرة مع أداء متميز",
            en: "Luxury car with exceptional performance",
          },
          type: "Luxury",
          transmission: "Automatic",
          seats: 5,
          fuel: "بنزين",
          year: 2023,
          features: [
            "تكييف",
            "نظام صوت",
            "كاميرا خلفية",
            "مقاعد جلدية",
            "دفع رباعي",
            "شاشة لمس",
          ],
        },
        {
          id: 6,
          name: { ar: "مرسيدس E-Class", en: "Mercedes E-Class" },
          image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
          price: 220,
          rating: 4.9,
          reviews: 180,
          description: {
            ar: "سيارة فاخرة مع راحة مطلقة",
            en: "Luxury car with absolute comfort",
          },
          type: "Luxury",
          transmission: "Automatic",
          seats: 5,
          fuel: "بنزين",
          year: 2023,
          features: [
            "تكييف",
            "نظام صوت",
            "كاميرا خلفية",
            "مقاعد جلدية",
            "شاشة لمس",
            "نظام ملاحة",
          ],
        },
      ];
    }
  };

  const tabs = [
    {
      key: "flights" as BookingType,
      label: { ar: "الطيران", en: "Flights" },
      icon: "plane",
    },
    {
      key: "hotels" as BookingType,
      label: { ar: "الفنادق", en: "Hotels" },
      icon: "hotel",
    },
    {
      key: "cars" as BookingType,
      label: { ar: "السيارات", en: "Cars" },
      icon: "car",
    },
  ];

  return (
    <>
      <Helmet>
        <title>الحجوزات - مكافآت</title>
        <meta
          name="description"
          content="احجز رحلاتك وفنادقك وسياراتك بسهولة"
        />
      </Helmet>

      <section className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[140px] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary opacity-30" />
          <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
            <h1
              className={`${
                isRTL
                  ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
                  : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
              } mb-4 tracking-tight leading-none text-white`}
            >
              {isRTL ? "الحجوزات" : "Bookings"}
            </h1>

            <div className="flex items-center justify-center text-sm md:text-base mb-8">
              <span className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs">
                {isRTL ? "الرئيسية" : "Home"}
              </span>
              <span className="text-white text-xs mx-2">|</span>
              <span className="text-[#fd671a] font-medium text-xs">
                {isRTL ? "الحجوزات" : "Bookings"}
              </span>
            </div>
          </div>

          <div className="absolute -bottom-10 transform z-9">
            <img
              src={AboutPattern}
              alt="Pattern"
              className="w-full h-96 animate-float"
            />
          </div>
        </section>

        {/* Tabs Section */}
        <section
          className="relative container mx-auto px-4 py-8 z-10"
          style={{ marginTop: "-80px" }}
        >
          <div className="max-w-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`bg-white rounded-xl py-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                    activeTab === tab.key
                      ? "border-2 border-[#400198]"
                      : "border-2 border-transparent"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 mb-4 flex items-center justify-center rounded-full group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300 ${
                        activeTab === tab.key
                          ? "bg-[#440798c9] text-white"
                          : "bg-gradient-to-br from-purple-50 to-purple-100 text-[#440798c9]"
                      }`}
                    >
                      {tab.icon === "plane" && (
                        <MdOutlineFlight className="text-2xl" />
                      )}
                      {tab.icon === "hotel" && (
                        <RiHotelLine className="text-2xl" />
                      )}
                      {tab.icon === "car" && <FaCar className="text-2xl" />}
                    </div>
                    <h3
                      className={`text-base font-semibold ${
                        activeTab === tab.key
                          ? "text-[#400198]"
                          : "text-gray-800"
                      }`}
                    >
                      {isRTL ? tab.label.ar : tab.label.en}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {hasSearched && results.length > 0 ? (
              <BookingResults
                results={results}
                type={activeTab}
                appliedFilters={appliedFilters}
                onToggleSidebar={() => setShowSidebar(!showSidebar)}
                onToggleFiltersSidebar={() =>
                  setShowFiltersSidebar(!showFiltersSidebar)
                }
                showSidebar={showSidebar}
                isFiltered={true}
                onApplyFilters={(newFilters: BookingFilters) => {
                  setAppliedFilters(newFilters);
                  const allResults = generateMockResults(activeTab);
                  const filteredResults = applyFilters(allResults, newFilters);
                  setResults(filteredResults);
                }}
              />
            ) : (
              <BookingResults
                results={generateMockResults(activeTab)}
                type={activeTab}
                appliedFilters={appliedFilters}
                onToggleSidebar={() => setShowSidebar(!showSidebar)}
                onToggleFiltersSidebar={() =>
                  setShowFiltersSidebar(!showFiltersSidebar)
                }
                showSidebar={showSidebar}
                isFiltered={false}
                onApplyFilters={(newFilters: BookingFilters) => {
                  setAppliedFilters(newFilters);
                  const allResults = generateMockResults(activeTab);
                  const filteredResults = applyFilters(allResults, newFilters);
                  setResults(filteredResults);
                }}
              />
            )}
          </div>
        </section>

        {/* Sidebar */}
        {showSidebar && (
          <BookingSidebar
            isOpen={showSidebar}
            onClose={() => setShowSidebar(false)}
            type={activeTab}
            filters={filters}
            onFiltersChange={(filters: BookingFilters) => setFilters(filters)}
            appliedFilters={appliedFilters}
            onSearch={handleSearch}
          />
        )}

        {/* Filters Sidebar */}
        {showFiltersSidebar && (
          <BookingFiltersSidebar
            isOpen={showFiltersSidebar}
            onClose={() => setShowFiltersSidebar(false)}
            type={activeTab}
            filters={filters}
            onFiltersChange={(filters: BookingFilters) => setFilters(filters)}
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        )}
      </section>
      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default BookingsPage;
