import React, { useState, useMemo } from "react";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaTag, FaPercent, FaUtensils } from "react-icons/fa";

const CouponsSection: React.FC = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Coupon data
  const couponsData = useMemo(
    () => [
      {
        id: 1,
        title: "عرض خاص الغداء فقط ب 29",
        price: "ريال",
        savings: "وفر ١٣ ريال علي فاتورتك",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "purple",
        icon: <FaUtensils className="text-2xl" />,
        dealText: "واحد",
        dealSubtext: "والثاني مجانا",
      },
      {
        id: 2,
        title: "خصم 25% على كامل الفاتورة",
        price: "25% خصم",
        savings: "خصم شامل على جميع المنتجات",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "green",
        icon: <FaPercent className="text-2xl" />,
        dealText: "25%",
        dealSubtext: "خصم",
      },
      {
        id: 3,
        title: "مشروب قهوة عربية",
        price: "9 ريال",
        savings: "قهوة عربية أصيلة",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام عدة مرات",
        color: "orange",
        icon: <FaUtensils className="text-2xl" />,
        dealText: "واحد",
        dealSubtext: "والثاني مجانا",
      },
      {
        id: 4,
        title: "خصم 5 ريال",
        price: "مجاناً 5 ريال",
        savings: "خصم مباشر على الفاتورة",
        validity: "صلاحية ٣٠ يوم",
        reusable: false,
        reusableText: "غير قابل لاعادة الاستخدام",
        color: "purple",
        icon: <FaTag className="text-2xl" />,
        dealText: "مجاناً",
        dealSubtext: "5 ريال",
      },
      {
        id: 5,
        title: "عرض خاص الغداء فقط ب 29",
        price: "ريال",
        savings: "وفر ١٣ ريال علي فاتورتك",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "orange",
        icon: <FaUtensils className="text-2xl" />,
        dealText: "واحد",
        dealSubtext: "والثاني مجانا",
      },
      {
        id: 6,
        title: "خصم 25% على كامل الفاتورة",
        price: "25% خصم",
        savings: "خصم شامل على جميع المنتجات",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "green",
        icon: <FaPercent className="text-2xl" />,
        dealText: "25%",
        dealSubtext: "خصم",
      },
      {
        id: 11,
        title: "عرض خاص الغداء فقط ب 29",
        price: "ريال",
        savings: "وفر ١٣ ريال علي فاتورتك",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "purple",
        icon: <FaUtensils className="text-2xl" />,
        dealText: "واحد",
        dealSubtext: "والثاني مجانا",
      },
      {
        id: 12,
        title: "خصم 25% على كامل الفاتورة",
        price: "25% خصم",
        savings: "خصم شامل على جميع المنتجات",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "green",
        icon: <FaPercent className="text-2xl" />,
        dealText: "25%",
        dealSubtext: "خصم",
      },
      {
        id: 13,
        title: "مشروب قهوة عربية",
        price: "9 ريال",
        savings: "قهوة عربية أصيلة",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام عدة مرات",
        color: "orange",
        icon: <FaUtensils className="text-2xl" />,
        dealText: "واحد",
        dealSubtext: "والثاني مجانا",
      },
      {
        id: 14,
        title: "خصم 5 ريال",
        price: "مجاناً 5 ريال",
        savings: "خصم مباشر على الفاتورة",
        validity: "صلاحية ٣٠ يوم",
        reusable: false,
        reusableText: "غير قابل لاعادة الاستخدام",
        color: "purple",
        icon: <FaTag className="text-2xl" />,
        dealText: "مجاناً",
        dealSubtext: "5 ريال",
      },
      {
        id: 15,
        title: "عرض خاص الغداء فقط ب 29",
        price: "ريال",
        savings: "وفر ١٣ ريال علي فاتورتك",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "orange",
        icon: <FaUtensils className="text-2xl" />,
        dealText: "واحد",
        dealSubtext: "والثاني مجانا",
      },
      {
        id: 16,
        title: "خصم 25% على كامل الفاتورة",
        price: "25% خصم",
        savings: "خصم شامل على جميع المنتجات",
        validity: "صلاحية ٣٠ يوم",
        reusable: true,
        reusableText: "قابل لاعادة الاستخدام",
        color: "green",
        icon: <FaPercent className="text-2xl" />,
        dealText: "25%",
        dealSubtext: "خصم",
      },
    ],
    []
  );

  // Filter options
  const filters = [
    {
      key: "all",
      label: t("home.coupons.filters.all"),
      count: couponsData.length,
    },
    {
      key: "discounts",
      label: t("home.coupons.filters.discounts"),
      count: couponsData.filter((item) => item.title.includes("خصم")).length,
    },
    {
      key: "coffee",
      label: t("home.coupons.filters.coffee"),
      count: couponsData.filter((item) => item.title.includes("قهوة")).length,
    },
    {
      key: "reusable",
      label: t("home.coupons.filters.reusable"),
      count: couponsData.filter((item) => item.reusable).length,
    },
  ];

  // Filtered coupons based on active filter
  const filteredCoupons = useMemo(() => {
    if (activeFilter === "all") {
      return couponsData;
    }
    if (activeFilter === "discounts") {
      return couponsData.filter((item) => item.title.includes("خصم"));
    }
    if (activeFilter === "coffee") {
      return couponsData.filter((item) => item.title.includes("قهوة"));
    }
    if (activeFilter === "reusable") {
      return couponsData.filter((item) => item.reusable);
    }
    return couponsData;
  }, [activeFilter, couponsData]);

  // Group coupons in pairs for slider
  const groupedCoupons = useMemo(() => {
    const groups = [];
    for (let i = 0; i < filteredCoupons.length; i += 2) {
      groups.push(filteredCoupons.slice(i, i + 2));
    }
    return groups;
  }, [filteredCoupons]);

  const owlCarouselOptions = {
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
        items: 3,
      },
    },
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-600";
      case "orange":
        return "bg-orange-500";
      case "purple":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  interface Coupon {
    id: number;
    title: string;
    price: string;
    savings: string;
    validity: string;
    reusable: boolean;
    reusableText: string;
    color: string;
    icon: React.ReactNode;
    dealText: string;
    dealSubtext: string;
  }

  const CouponCard = ({ coupon }: { coupon: Coupon }) => (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      style={{ direction: "rtl" }}
    >
      <div className="flex h-36">
        {/* Right Section - Colored Background with Notches */}
        <div
          className={`w-24 ${getColorClasses(
            coupon.color
          )} flex flex-col items-center justify-center text-white relative`}
        >
          {/* Top Notch */}
          <div className="absolute top-[40%] -right-2 w-6 h-6 bg-white rounded-full"></div>
          {/* Bottom Notch */}
          {/* <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white rounded-full"></div> */}

          {/* Icon */}
          <div className="mb-3">{coupon.icon}</div>

          {/* Deal Text */}
          <div className="text-center">
            <div className="text-sm font-bold mb-1">{coupon.dealText}</div>
            <div className="text-xs">{coupon.dealSubtext}</div>
          </div>
        </div>
        {/* Left Section - White Background */}
        <div className="flex-1 py-4 px-3 flex flex-col justify-between">
          {/* Top Section with Icon and Main Text */}
          <div className="flex items-start gap-2">
            {/* Green Circle Icon */}
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaUtensils className="w-4 h-4 text-white" />
            </div>

            {/* Main Text */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-base font-bold text-gray-800">
                  {coupon.title}
                </h3>
                {/* <span className="text-base font-bold text-gray-800">
                  {coupon.price}
                </span> */}
              </div>
              <p className="text-sm text-gray-500 mb-2">{coupon.savings}</p>
              <p className="text-xs text-gray-400">{coupon.validity}</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                coupon.reusable
                  ? "bg-orange-100 text-orange-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {coupon.reusableText}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              الشروط
              <IoIosArrowRoundForward className="text-xs" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-start mb-4">
          <h2 className="text-[#400198] text-3xl font-bold">
            {t("home.coupons.title")}
          </h2>
          <p className="text-md text-gray-700 leading-relaxed">
            {t("home.coupons.description")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-start mb-8 gap-4 flex-wrap w-[90%]">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              style={{
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Coupons Carousel */}
        <div className="relative OffersCarousel PropertiesCarousel">
          <OwlCarousel
            key={activeFilter}
            className="owl-theme"
            {...owlCarouselOptions}
            style={{
              direction: "ltr",
            }}
          >
            {groupedCoupons.map((group, index) => (
              <div key={index} className="item">
                <div className="space-y-4">
                  {group.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                  ))}
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/coupons")}
            className="bg-[#400198] hover:scale-105 transition-transform duration-300 text-base px-8 py-4 font-semibold rounded-full text-white flex items-center gap-2 mx-auto"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            <span>{t("home.coupons.viewAll")}</span>
            <IoIosArrowRoundForward
              className={`text-2xl transform ${
                isRTL ? "rotate-45" : "-rotate-45"
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
