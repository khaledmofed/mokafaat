import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";
import { NavigationLinksProps } from "@interfaces";
import { APP_ROUTES } from "@constants";
import LanguageToggle from "./LanguageToggle";
import { useIsRTL } from "@hooks";
import { BsChevronDown } from "react-icons/bs";

import {
  CarIcon,
  CoffeeIcon,
  DeliveryIcon,
  HeadphoneIcon,
  HotelIcon,
  RestaurantIcon,
  ShopIcon,
  UnderTitle,
  A1,
  ManGroup,
} from "@assets";
import { MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { useWebHome } from "@hooks/api/useMokafaatQueries";

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  links,
  t,
  handleCloseNavigation,
}) => {
  const isRTL = useIsRTL();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: webHomeResponse } = useWebHome();

  // Fallback categories (من الترجمة) إذا الـ API ما رجع بيانات
  const fallbackOffersCategories = useMemo(
    () => [
      {
        id: 1,
        icon: RestaurantIcon,
        title: t("home.categories.restaurants"),
        alt: t("home.categories.restaurants"),
        key: "restaurants",
      },
      {
        id: 2,
        icon: CoffeeIcon,
        title: t("home.categories.cafes"),
        alt: t("home.categories.cafes"),
        key: "cafes",
      },
      {
        id: 3,
        icon: HeadphoneIcon,
        title: t("home.categories.entertainment"),
        alt: t("home.categories.entertainment"),
        key: "entertainment",
      },
      {
        id: 4,
        icon: ShopIcon,
        title: t("home.categories.shops"),
        alt: t("home.categories.shops"),
        key: "shopping",
      },
      {
        id: 5,
        icon: HotelIcon,
        title: t("home.categories.hotels"),
        alt: t("home.categories.hotels"),
        key: "hotels",
      },
      {
        id: 6,
        icon: CarIcon,
        title: t("home.categories.cars"),
        alt: t("home.categories.cars"),
        key: "cars",
      },
      {
        id: 7,
        icon: DeliveryIcon,
        title: t("home.categories.delivery"),
        alt: t("home.categories.delivery"),
        key: "services",
      },
    ],
    [t]
  );

  // استخراج categories من الـ API response لـ mega menu العروض
  const apiOffersCategories = useMemo(() => {
    if (!webHomeResponse) return [];

    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cats = data?.categories as Array<Record<string, unknown>> | undefined;

    if (!Array.isArray(cats) || cats.length === 0) return [];

    const mapped = cats
      .map((cat) => {
        const id = cat.id;
        const name = String(cat.name ?? cat.title ?? "");
        const slug = String(cat.slug ?? "");
        let image = String(cat.image ?? cat.image_url ?? "");

        // إصلاح URL مكرر في الصور
        if (image && image.includes("/storage/https://")) {
          const storageIndex = image.indexOf("/storage/https://");
          image =
            image.substring(0, storageIndex + "/storage".length) +
            image.substring(storageIndex + "/storage/https://".length);
        }

        if (!name || !slug) {
          console.warn("Category missing name or slug:", cat);
          return null;
        }

        return {
          id: typeof id === "number" ? id : 0,
          icon: image || RestaurantIcon,
          title: name,
          alt: name,
          key: slug,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);

    return mapped;
  }, [webHomeResponse]);

  const offersCategories =
    apiOffersCategories.length > 0
      ? apiOffersCategories
      : fallbackOffersCategories;

  // Booking types data from BookingsPage tabs
  const bookingTypes = [
    {
      id: 1,
      key: "flights",
      label: { ar: "الطيران", en: "Flights" },
      icon: "plane",
      description: { ar: "احجز رحلاتك بسهولة", en: "Book your flights easily" },
    },
    {
      id: 2,
      key: "hotels",
      label: { ar: "الفنادق", en: "Hotels" },
      icon: "hotel",
      description: {
        ar: "اختر فندقك المثالي",
        en: "Choose your perfect hotel",
      },
    },
    {
      id: 3,
      key: "cars",
      label: { ar: "السيارات", en: "Cars" },
      icon: "car",
      description: {
        ar: "استأجر سيارة لرحلتك",
        en: "Rent a car for your trip",
      },
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // في الموبايل، النص يكون غامق دائماً
  // في الديسكتوب، يتغير حسب حالة التمرير
  const mobileTextColorClass = isScrolled
    ? "lg:text-gray-800 text-black"
    : "lg:text-gray-800 text-black";
  const mobileHoverColorClass = isScrolled
    ? "lg:hover:text-[#fd671a] hover:text-[#fd671a]"
    : "lg:hover:text-[#fd671a] hover:text-[#fd671a]";
  const mobileActiveColorClass = "lg:text-[#fd671a] text-[#fd671a]";
  const navigate = useNavigate();

  const handleScrollToSection = (path: string) => {
    if (window.location.pathname !== APP_ROUTES.home) {
      navigate(APP_ROUTES.home);
      handleCloseNavigation();
    }
    setTimeout(() => {
      const element = document.getElementById(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  // Cards dropdown items
  // const cardsItems = [
  //   {
  //     id: 1,
  //     icon: BsCardText,
  //     title: "Credit Cards",
  //     titleAr: "بطاقات الائتمان",
  //     description: "Manage your credit cards",
  //     descriptionAr: "إدارة بطاقات الائتمان الخاصة بك",
  //     slug: "credit-cards",
  //   },
  //   {
  //     id: 2,
  //     icon: IoCardOutline,
  //     title: "Debit Cards",
  //     titleAr: "بطاقات الخصم",
  //     description: "Manage your debit cards",
  //     descriptionAr: "إدارة بطاقات الخصم الخاصة بك",
  //     slug: "debit-cards",
  //   },
  //   {
  //     id: 3,
  //     icon: BsTicketPerforated,
  //     title: "Gift Cards",
  //     titleAr: "بطاقات الهدايا",
  //     description: "Purchase and manage gift cards",
  //     descriptionAr: "شراء وإدارة بطاقات الهدايا",
  //     slug: "gift-cards",
  //   },
  // ];

  // Coupons dropdown items
  // const couponsItems = [
  //   {
  //     id: 1,
  //     icon: BsTicketPerforated,
  //     title: "Discount Coupons",
  //     titleAr: "كوبونات الخصم",
  //     description: "Find the best discount offers",
  //     descriptionAr: "اعثر على أفضل عروض الخصم",
  //     slug: "discount-coupons",
  //   },
  //   {
  //     id: 2,
  //     icon: BsCalendarCheck,
  //     title: "Special Offers",
  //     titleAr: "العروض الخاصة",
  //     description: "Check out our special promotions",
  //     descriptionAr: "اطلع على عروضنا الخاصة",
  //     slug: "special-offers",
  //   },
  // ];

  return (
    <ul className="flex flex-col lg:flex-row p-4 lg:p-0 mt-4 rounded-lg border-0 lg:gap-4 lg:mt-0 lg:border-0 lg:items-center w-full lg:w-auto padding-mobile-menu">
      {links.map((item) => (
        <li
          key={item.path}
          className="relative group"
          onClick={handleCloseNavigation}
        >
          {item.scroll ? (
            <ScrollLink
              to={item.path}
              smooth={true}
              duration={800}
              className={`block cursor-pointer py-2 pl-3 pr-4 lg:p-0 text-sm transition duration-500 ease-in-out ${mobileTextColorClass} ${mobileHoverColorClass}`}
              activeClass={`${mobileActiveColorClass} font-semibold`}
              onClick={() => handleScrollToSection(item.path)}
            >
              {t(`home.navbar.${item.title}`)}
            </ScrollLink>
          ) : item.title === "cards" ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer">
                <NavLink
                  to="/cards"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 lg:p-0 text-base transition duration-500 ease-in-out ${
                      isActive
                        ? `${mobileActiveColorClass} font-semibold`
                        : `${mobileTextColorClass} ${mobileHoverColorClass} font-medium`
                    }`
                  }
                >
                  {t(`home.navbar.${item.title}`)}
                </NavLink>
                {/* <BsChevronDown className="text-gray-400 text-xs" /> */}
              </div>
              {/* Cards Dropdown */}
              {/* <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-4 z-50">
                <div className="space-y-0">
                  {cardsItems.map((card) => {
                    const IconComponent = card.icon;
                    return (
                      <Link
                        key={card.id}
                        to={`/cards/${card.slug}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <IconComponent className="text-gray-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {isRTL ? card.titleAr : card.title}
                          </h4>
                          <p className="text-gray-500 text-xs">
                            {isRTL ? card.descriptionAr : card.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div> */}
            </div>
          ) : item.title === "coupons" ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer">
                <NavLink
                  to="/coupons"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 lg:p-0 text-base transition duration-500 ease-in-out ${
                      isActive
                        ? `${mobileActiveColorClass} font-semibold`
                        : `${mobileTextColorClass} ${mobileHoverColorClass} font-medium`
                    }`
                  }
                >
                  {t(`home.navbar.${item.title}`)}
                </NavLink>
                {/* <BsChevronDown className="text-gray-400 text-xs" /> */}
              </div>
              {/* Coupons Dropdown */}
              {/* <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-4 z-50">
                <div className="space-y-0">
                  {couponsItems.map((coupon) => {
                    const IconComponent = coupon.icon;
                    return (
                      <Link
                        key={coupon.id}
                        to={`/coupons/${coupon.slug}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <IconComponent className="text-gray-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {isRTL ? coupon.titleAr : coupon.title}
                          </h4>
                          <p className="text-gray-500 text-xs">
                            {isRTL ? coupon.descriptionAr : coupon.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div> */}
            </div>
          ) : item.title === "bookings" ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer space-between-mobile">
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 lg:p-0 text-sm transition duration-500 ease-in-out ${
                      isActive
                        ? `${mobileActiveColorClass} font-semibold`
                        : `${mobileTextColorClass} ${mobileHoverColorClass} font-medium`
                    }`
                  }
                >
                  {t(`home.navbar.${item.title}`)}
                </NavLink>
                <BsChevronDown className="text-gray-400 text-xs no-hide-this-on-mobile" />
              </div>
              {/* Bookings Dropdown */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 fixed border mt-2 bg-white rounded-lg shadow-xl py-4 z-50 mega-menu-offers mega-menu-this-on-mobile">
                <div className="px-4">
                  <div className="grid grid-cols-4 gap-4">
                    {/* Left Column - Bookings Grid (3 columns) */}
                    <div className="col-span-3 p-6">
                      <div className="text-start gap-2 mb-3">
                        <span
                          className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: isRTL
                              ? "Readex Pro, sans-serif"
                              : "Jost, sans-serif",
                          }}
                        >
                          {isRTL ? "أنواع الحجوزات" : "Booking Types"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>

                      {/* Mega menu grid - 3 columns with booking items */}
                      <div className="grid grid-cols-3 gap-2">
                        {bookingTypes.map((booking) => {
                          const getIconComponent = (iconType: string) => {
                            switch (iconType) {
                              case "plane":
                                return MdOutlineFlight;
                              case "hotel":
                                return RiHotelLine;
                              case "car":
                                return FaCar;
                              default:
                                return MdOutlineFlight;
                            }
                          };
                          const IconComponent = getIconComponent(booking.icon);
                          return (
                            <Link
                              key={booking.id}
                              to={`/bookings?tab=${booking.key}`}
                              className={`group/item flex flex-col px-4 py-5 rounded-xl bg-[#fdf5ff] hover:bg-gray-50 transition-all duration-300 border border-[#e9d5ff] border-[1.5px] hover:border-gray-200 hover:shadow-sm ${
                                isRTL ? "text-right" : "text-left"
                              }`}
                            >
                              <div className="mb-4 w-12 h-12 bg-[#e9d5ff] rounded-full flex items-center justify-center group-hover/item:bg-[#e9d5ff] group-hover/item:scale-105 transition-all duration-300">
                                <IconComponent className="text-[#400198] text-xl" />
                              </div>
                              <span
                                className={`font-semibold text-gray-900 text-sm mb-1 group-hover/item:text-[#192B51] ${
                                  isRTL ? "text-right" : "text-left"
                                }`}
                              >
                                {isRTL ? booking.label.ar : booking.label.en}
                              </span>
                              <p
                                className={`text-gray-600 text-xs leading-tight line-clamp-2 ${
                                  isRTL ? "text-right" : "text-left"
                                }`}
                              >
                                {isRTL
                                  ? booking.description.ar
                                  : booking.description.en}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column - Side Image */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="relative">
                        <div className="w-auto h-[240px] p-2 flex items-center justify-center">
                          <img
                            src={ManGroup}
                            alt="Booking Types"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : item.title === "offers" ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer space-between-mobile">
                <NavLink
                  to="/offers"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 lg:p-0 text-sm transition duration-500 ease-in-out ${
                      isActive
                        ? `${mobileActiveColorClass} font-semibold`
                        : `${mobileTextColorClass} ${mobileHoverColorClass} font-medium`
                    }`
                  }
                >
                  {t(`home.navbar.${item.title}`)}
                </NavLink>
                <BsChevronDown className="text-gray-400 text-xs no-hide-this-on-mobile" />
              </div>
              {/* Offers Dropdown */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 fixed border mt-2 bg-white rounded-lg shadow-xl py-4 z-50 mega-menu-offers mega-menu-this-on-mobile">
                <div className="px-4">
                  <div className="grid grid-cols-4 gap-4">
                    {/* Left Column - Categories Grid (3 columns) */}
                    <div className="col-span-3 p-6">
                      <div className="text-start gap-2 mb-3">
                        <span
                          className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: isRTL
                              ? "Readex Pro, sans-serif"
                              : "Jost, sans-serif",
                          }}
                        >
                          {isRTL ? "التصنيفات" : "Categories"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>

                      {/* Mega menu grid - 7 columns with category items */}
                      <div className="grid grid-cols-7 gap-1">
                        {offersCategories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/offers/${category.key}`}
                            className={`group/item flex flex-col px-4 py-5 rounded-xl bg-[#fdf5ff] hover:bg-gray-50 transition-all duration-300 border border-[#e9d5ff] border-[1.5px] hover:border-gray-200 hover:shadow-sm ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            <div className="mb-4 w-10 h-10 bg-[#e9d5ff] rounded-full flex items-center justify-center group-hover/item:bg-[#e9d5ff] group-hover/item:scale-105 transition-all duration-300">
                              <img
                                src={category.icon}
                                alt={category.alt}
                                className="w-5 h-5"
                              />
                            </div>
                            <span
                              className={`font-semibold text-gray-900 text-sm mb-1 group-hover/item:text-[#192B51] ${
                                isRTL ? "text-right" : "text-left"
                              }`}
                            >
                              {category.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Side Image */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="relative">
                        <div className="w-auto h-[230px]  p-2 flex items-center justify-center">
                          <img
                            src={A1}
                            alt="Property Types"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              to={item.path}
              target={item.newTab ? "_blank" : "_self"}
              className={({ isActive }) =>
                `block py-2 pl-3 pr-4 lg:p-0 text-base transition duration-500 ease-in-out ${
                  isActive
                    ? `${mobileActiveColorClass} font-semibold`
                    : `${mobileTextColorClass} ${mobileHoverColorClass} font-medium`
                }`
              }
            >
              {t(`home.navbar.${item.title}`)}
            </NavLink>
          )}
        </li>
      ))}

      <div className="lg:hidden color-mobile-menu">
        <LanguageToggle handleCloseNavigation={handleCloseNavigation} />
      </div>
    </ul>
  );
};

export default NavigationLinks;
