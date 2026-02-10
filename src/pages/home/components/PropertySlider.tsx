import React, { useMemo, useCallback, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCheck, FaEye, FaStar } from "react-icons/fa";
import { PatternNewProperty, Restu1, Restu2, Restu3 } from "@assets";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsHeart, BsShare } from "react-icons/bs";
import { useWebHome } from "@hooks/api/useMokafaatQueries";

interface RestaurantType {
  id: number;
  name: string;
  location: string;
  distance: string;
  discount: string;
  offer: string;
  categories: string;
  saves: number;
  views: number;
  rating: number;
  logo: string;
  slug: string;
  topColor: string;
  hasDiscountTag?: boolean;
}

const TOP_COLORS = [
  "bg-orange-500",
  "bg-orange-600",
  "bg-pink-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-indigo-500",
];

const DEFAULT_LOGOS = [Restu1, Restu2, Restu3];

function mapMerchantToRestaurant(
  merchant: Record<string, unknown>,
  index: number
): RestaurantType {
  const id = Number(merchant.id ?? 0);
  const name = String(merchant.name ?? "");
  const description = String(merchant.description ?? "");
  let logo = String(merchant.logo ?? "");
  const rating = Number(merchant.rating ?? 0) || 0;

  if (!logo || logo === "null") {
    logo = DEFAULT_LOGOS[index % DEFAULT_LOGOS.length];
  } else if (logo.includes("/storage/https://")) {
    const i = logo.indexOf("/storage/https://");
    logo =
      logo.substring(0, i + "/storage".length) +
      logo.substring(i + "/storage/https://".length);
  }

  return {
    id,
    name: name || `تاجر ${id}`,
    location: "—",
    distance: "—",
    discount: "",
    offer: description || "عروض متاحة",
    categories: "—",
    saves: 0,
    views: 0,
    rating: rating || 0,
    logo,
    slug: `merchant-${id}`,
    topColor: TOP_COLORS[index % TOP_COLORS.length],
    hasDiscountTag: false,
  };
}

const PropertySlider: React.FC = () => {
  const isRTL = useIsRTL();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [key, setKey] = useState(0); // Key for forcing re-render

  const { data: webHomeResponse } = useWebHome();

  const apiMerchants = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const merchants = data?.merchants as
      | Array<Record<string, unknown>>
      | undefined;
    return Array.isArray(merchants) ? merchants : [];
  }, [webHomeResponse]);

  const restaurantsFromApi = useMemo(
    () => apiMerchants.map((m, i) => mapMerchantToRestaurant(m, i)),
    [apiMerchants]
  );

  // Force re-render when language changes
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [i18n.language]);

  const restaurantsStatic: RestaurantType[] = useMemo(
    () => [
      {
        id: 1,
        name: t("propertySlider.restaurants.hungerStation"),
        location: "شارع التحلية",
        distance: "1.5 KM",
        discount: "17% خصم",
        offer: "خصم 17% علي فاتورة مشترياتك",
        categories: "منتجات , مشروبات , أدوات منزلية",
        saves: 168,
        views: 1270,
        rating: 5.0,
        logo: Restu1,
        slug: "hunger-station",
        topColor: "bg-orange-500",
        hasDiscountTag: false,
      },
      {
        id: 2,
        name: t("propertySlider.restaurants.popeyes"),
        location: "شارع التحلية",
        distance: "1.5 KM",
        discount: "50% خصم",
        offer: "خصم 50% علي فاتورة طلبا",
        categories: "منتجات , مشروبات , أدوات منزلية",
        saves: 168,
        views: 270,
        rating: 4.9,
        logo: Restu2,
        slug: "popeyes",
        topColor: "bg-orange-600",
        hasDiscountTag: true,
      },
      {
        id: 3,
        name: t("propertySlider.restaurants.crispyBread"),
        location: "شارع التحلية",
        distance: "1.5 KM",
        discount: "اشتري وجبه واحصل الثانية مجاناً",
        offer: "اشتري وجبه واحصل الثانية مجاناً",
        categories: "منتجات , مشروبات , أدوات منزلية",
        saves: 168,
        views: 180,
        rating: 4.7,
        logo: Restu3,
        slug: "crispy-bread",
        topColor: "bg-pink-500",
        hasDiscountTag: false,
      },
      {
        id: 4,
        name: t("propertySlider.restaurants.kfc"),
        location: "شارع الملك فهد",
        distance: "2.1 KM",
        discount: "30% خصم",
        offer: "خصم 30% علي جميع الوجبات",
        categories: "وجبات سريعة , مشروبات",
        saves: 245,
        views: 320,
        rating: 4.7,
        logo: Restu1,
        slug: "kfc",
        topColor: "bg-red-500",
        hasDiscountTag: true,
      },
      {
        id: 5,
        name: t("propertySlider.restaurants.mcdonalds"),
        location: "شارع العليا",
        distance: "0.8 KM",
        discount: "25% خصم",
        offer: "خصم 25% علي البرجر",
        categories: "برجر , مشروبات , وجبات سريعة",
        saves: 189,
        views: 298,
        rating: 4.5,
        logo: Restu2,
        slug: "mcdonalds",
        topColor: "bg-yellow-500",
        hasDiscountTag: false,
      },
      {
        id: 6,
        name: t("propertySlider.restaurants.pandaExpress"),
        location: "شارع التحلية",
        distance: "1.2 KM",
        discount: "40% خصم",
        offer: "خصم 40% علي الوجبات الصينية",
        categories: "وجبات صينية , مشروبات , معجنات",
        saves: 156,
        views: 234,
        rating: 4.6,
        logo: Restu3,
        slug: "panda-express",
        topColor: "bg-green-500",
        hasDiscountTag: true,
      },
    ],
    [t]
  );

  const restaurants: RestaurantType[] = useMemo(
    () =>
      restaurantsFromApi.length > 0 ? restaurantsFromApi : restaurantsStatic,
    [restaurantsFromApi, restaurantsStatic]
  );

  const owlCarouselOptions = useMemo(
    () => ({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
      navText: [
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke-width="2" points="9 6 15 12 9 18" transform="matrix(-1 0 0 1 24 0)"></polyline></svg>',
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke-width="2" points="9 6 15 12 9 18"></polyline></svg>',
      ],
    }),
    []
  );

  const handleRestaurantClick = useCallback(
    (slug: string) => {
      navigate(`/restaurants/${slug}`);
    },
    [navigate]
  );

  return (
    <section className="pt-16 pb-24 bg-white relative overflow-hidden">
      <div
        className={`absolute -top-40 w-1/1 sm:w-1/1 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={PatternNewProperty}
          alt="offers"
          className="h-auto animate-float"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-6 container mx-auto mb-0 px-0 flex-mobile">
          {/* Subtitle */}
          <div className=" flex justify-between items-center ">
            <div className={`space-y-6`}>
              {/* Header */}
              <div className="text-start mb-0">
                <h2 className="text-[#400198] text-3xl font-bold">
                  {t("propertySlider.title")}
                </h2>
                <p className="text-md text-gray-700 leading-relaxed">
                  {t("propertySlider.subtitle")}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-0">
              <button
                onClick={() => navigate("/gallery")}
                className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
                style={{
                  marginTop: "0px",
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                <span>{t("home.cards.viewAll")}</span>
                <IoIosArrowRoundForward
                  className={`text-3xl transform ${
                    isRTL ? "rotate-45" : "-rotate-45"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Header Section */}

        {/* Owl Carousel Container */}
        <div className="relative">
          <OwlCarousel
            key={`${key}-${restaurants.length}`}
            className="owl-theme"
            {...owlCarouselOptions}
            style={{ direction: "ltr" }}
          >
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="item"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                <div
                  onClick={() => handleRestaurantClick(restaurant.slug)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                >
                  {/* Top Section - Dynamic Color Background */}
                  <div
                    className={`${restaurant.topColor} relative h-24 flex items-center justify-between px-3`}
                  >
                    {/* Restaurant Logo */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    {/* Right Side - Restaurant Info */}
                    <div className="flex-1 text-right ms-2 text-start">
                      <h3 className="text-white font-bold text-base mb-1">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center justify-start gap-1 text-white text-xs">
                        <FaMapMarkerAlt className="text-xs" />
                        <span>
                          {restaurant.location}, {restaurant.distance}
                        </span>
                      </div>
                    </div>
                    {/* Left Side - Icons */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                        <BsHeart className="text-white text-sm" />
                      </div>
                      <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                        <BsShare className="text-white text-sm" />
                      </div>
                    </div>
                    {/* Wavy Separator */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <svg
                        viewBox="0 0 300 20"
                        className="w-full h-5 fill-white"
                        preserveAspectRatio="none"
                      >
                        <path d="M0,20 Q75,0 150,20 T300,20 L300,20 L0,20 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Section - White Background */}
                  <div className="p-4 h-28 flex flex-col justify-between">
                    {/* Discount Badge and Offer */}
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="text-black font-bold text-sm mb-1 leading-tight">
                          {restaurant.offer}
                        </h4>
                        <p className="text-gray-500 text-xs">
                          {restaurant.categories}
                        </p>
                      </div>
                      {restaurant.hasDiscountTag && (
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">
                          {restaurant.discount}
                        </div>
                      )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-start gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="font-bold">{restaurant.rating}</span>
                        <FaStar className="text-orange-500" />
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="font-bold">{restaurant.views}</span>
                        <FaEye />
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="font-bold">{restaurant.saves}</span>
                        <FaCheck className="text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default PropertySlider;
