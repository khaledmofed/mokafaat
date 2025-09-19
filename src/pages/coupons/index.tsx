import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { IoCalendarOutline, IoFlashOutline } from "react-icons/io5";
import { BsHeart, BsShare } from "react-icons/bs";
import { FiGrid, FiList } from "react-icons/fi";
import { copon1, copon2, copon3, copon4, cutCopon } from "@assets";
import CouponsHero from "./components/CouponsHero";
import GetStartedSection from "@pages/home/components/GetStartedSection";

const CouponsPage = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("nearby");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const perPage = 9;

  // Function to get coupon image
  const getCouponImage = (logoName: string) => {
    switch (logoName) {
      case "copon1":
        return copon1;
      case "copon2":
        return copon2;
      case "copon3":
        return copon3;
      case "copon4":
        return copon4;
      default:
        return copon1;
    }
  };

  // Filter coupons based on selected filter
  const filteredCoupons = useMemo(() => {
    // Mock coupons data
    const couponsData = [
      {
        id: "1",
        storeName: "متجر اي هيرب",
        storeCategory: "تصنيف المتجر",
        logo: "copon1",
        discount: "50%",
        offer: "احصل علي خصم حتي 50% لاول شراء",
        uses: 62,
        expiry: "30 مايو 2025",
        rating: 4.8,
        views: 1250,
        downloads: 340,
        isNearby: true,
        visits: 890,
      },
      {
        id: "2",
        storeName: "متجر نتفليكس",
        storeCategory: "ترفيه",
        logo: "copon2",
        discount: "30%",
        offer: "خصم 30% على الاشتراك الشهري",
        uses: 45,
        expiry: "15 يونيو 2025",
        rating: 4.9,
        views: 2100,
        downloads: 520,
        isNearby: false,
        visits: 1500,
      },
      {
        id: "3",
        storeName: "متجر ستاربكس",
        storeCategory: "مطاعم",
        logo: "copon3",
        discount: "25%",
        offer: "خصم 25% على جميع المشروبات",
        uses: 78,
        expiry: "20 مايو 2025",
        rating: 4.7,
        views: 1800,
        downloads: 450,
        isNearby: true,
        visits: 1200,
      },
      {
        id: "4",
        storeName: "متجر أمازون",
        storeCategory: "تسوق",
        logo: "copon4",
        discount: "40%",
        offer: "خصم 40% على الإلكترونيات",
        uses: 95,
        expiry: "10 يونيو 2025",
        rating: 4.6,
        views: 3200,
        downloads: 780,
        isNearby: false,
        visits: 2100,
      },
      {
        id: "5",
        storeName: "متجر ماكدونالدز",
        storeCategory: "مطاعم",
        logo: "copon1",
        discount: "20%",
        offer: "خصم 20% على الوجبات السريعة",
        uses: 120,
        expiry: "25 مايو 2025",
        rating: 4.5,
        views: 1500,
        downloads: 380,
        isNearby: true,
        visits: 950,
      },
      {
        id: "6",
        storeName: "متجر آبل",
        storeCategory: "تكنولوجيا",
        logo: "copon2",
        discount: "15%",
        offer: "خصم 15% على منتجات آبل",
        uses: 35,
        expiry: "5 يونيو 2025",
        rating: 4.9,
        views: 2800,
        downloads: 650,
        isNearby: false,
        visits: 1800,
      },
      {
        id: "7",
        storeName: "متجر زارا",
        storeCategory: "أزياء",
        logo: "copon3",
        discount: "35%",
        offer: "خصم 35% على الملابس",
        uses: 67,
        expiry: "18 مايو 2025",
        rating: 4.4,
        views: 1900,
        downloads: 420,
        isNearby: true,
        visits: 1100,
      },
      {
        id: "8",
        storeName: "متجر آيكيا",
        storeCategory: "منزل",
        logo: "copon4",
        discount: "45%",
        offer: "خصم 45% على الأثاث",
        uses: 82,
        expiry: "12 يونيو 2025",
        rating: 4.8,
        views: 2400,
        downloads: 580,
        isNearby: false,
        visits: 1600,
      },
      {
        id: "9",
        storeName: "متجر أديداس",
        storeCategory: "رياضة",
        logo: "copon1",
        discount: "30%",
        offer: "خصم 30% على الأحذية الرياضية",
        uses: 55,
        expiry: "8 يونيو 2025",
        rating: 4.7,
        views: 1700,
        downloads: 390,
        isNearby: true,
        visits: 1050,
      },
    ];

    let coupons = [...couponsData];

    if (search) {
      coupons = coupons.filter(
        (coupon) =>
          coupon.storeName.toLowerCase().includes(search.toLowerCase()) ||
          coupon.storeCategory.toLowerCase().includes(search.toLowerCase()) ||
          coupon.offer.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply filter
    switch (selectedFilter) {
      case "nearby":
        coupons = coupons.filter((coupon) => coupon.isNearby);
        break;
      case "most_visited":
        coupons = coupons.sort((a, b) => b.visits - a.visits);
        break;
      case "highest_rated":
        coupons = coupons.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return coupons;
  }, [selectedFilter, search]);

  const totalPages = Math.ceil(filteredCoupons.length / perPage) || 1;
  const startIdx = (currentPage - 1) * perPage;
  const paginated = filteredCoupons.slice(startIdx, startIdx + perPage);

  return (
    <>
      <Helmet>
        <title>{t("coupons.title")}</title>
        <link rel="canonical" href="https://mukafaat.com/coupons" />
      </Helmet>

      <CouponsHero />

      <section className="container mx-auto md:p-10 p-6 portfolio-mobile">
        {/* Filters + Search + View Mode */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3 style-portfolio-button-mobile-container">
            <button
              onClick={() => {
                setSelectedFilter("nearby");
                setCurrentPage(1);
              }}
              className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                selectedFilter === "nearby"
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t("coupons.filters.nearby")}
            </button>
            <button
              onClick={() => {
                setSelectedFilter("most_visited");
                setCurrentPage(1);
              }}
              className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                selectedFilter === "most_visited"
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t("coupons.filters.most_visited")}
            </button>
            <button
              onClick={() => {
                setSelectedFilter("highest_rated");
                setCurrentPage(1);
              }}
              className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                selectedFilter === "highest_rated"
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t("coupons.filters.highest_rated")}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="w-full md:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={t("coupons.search_placeholder")}
                className="w-full px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
              />
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-[#400198] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-[#400198] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Coupons Display */}
        {paginated.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {paginated.map((coupon) => (
              <div
                key={coupon.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === "list" ? "flex items-center p-4" : ""
                }`}
              >
                {/* Coupon Card */}
                <div className={viewMode === "list" ? "flex-1 p-0" : "p-6"}>
                  {viewMode === "list" ? (
                    // List View Layout
                    <div className="flex items-center justify-between w-full">
                      {/* Left Section - Store Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img
                            src={getCouponImage(coupon.logo)}
                            alt={coupon.storeName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900 text-base">
                            {coupon.storeName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {coupon.storeCategory}
                          </p>
                          <h4 className="text-sm font-bold text-gray-900 mt-1">
                            {coupon.offer}
                          </h4>
                        </div>
                      </div>

                      {/* Middle Section - Usage and Expiry */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <IoFlashOutline className="text-orange-500 text-xl" />
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("coupons.usage")}
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {coupon.uses} {t("coupons.uses_for_code")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoCalendarOutline className="text-orange-500 text-xl" />
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("coupons.expires")}
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {coupon.expiry}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Action Button */}
                      <div className="flex items-center justify-between gap-3 w-1/3">
                        <div className="relative">
                          <div
                            style={{
                              top: "-3rem",
                              position: "absolute",
                              borderRight: "3px dashed rgb(221, 221, 221)",
                              width: "1px",
                              height: "108px",
                            }}
                          />
                        </div>
                        <button className="flex items-center overflow-hidden rounded-full font-medium text-base hover:opacity-90 transition-all duration-200">
                          {/* Right section - Purple with text */}
                          <div
                            className="bg-[#400198] h-[45px] text-white px-4 py-2 flex items-center justify-center"
                            style={{
                              borderBottomLeftRadius: "60px",
                              paddingLeft: "30px",
                              zIndex: 1,
                            }}
                          >
                            <span
                              className="font-medium text-sm"
                              style={{ marginTop: "-4px" }}
                            >
                              {t("coupons.show_coupon")}
                            </span>
                          </div>
                          {/* Left section - Gray with number */}
                          <div
                            className="bg-[#EBEBEC] h-[45px] text-gray-700 px-6 py-2 flex items-center justify-center"
                            style={{
                              paddingRight: "38px",
                              marginRight: "-48px",
                            }}
                          >
                            <span className="font-bold text-lg">
                              {coupon.uses}
                            </span>
                          </div>
                        </button>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200">
                            <BsShare className="text-sm" />
                          </button>
                          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200">
                            <BsHeart className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Grid View Layout
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img
                              src={getCouponImage(coupon.logo)}
                              alt={coupon.storeName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm">
                              {coupon.storeName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {coupon.storeCategory}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Offer */}
                      <div className="mb-4">
                        <h4 className="text-base font-bold text-gray-900 mb-2">
                          {coupon.offer}
                        </h4>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="px-0">
                          <button className="flex items-center overflow-hidden rounded-full font-medium text-base hover:opacity-90 transition-all duration-200">
                            {/* Right section - Purple with text */}
                            <div
                              className="bg-[#400198] h-[45px] text-white px-4 py-2 flex items-center justify-center"
                              style={{
                                borderBottomLeftRadius: "60px",
                                paddingLeft: "30px",
                                zIndex: 1,
                              }}
                            >
                              <span
                                className="font-medium text-sm"
                                style={{ marginTop: "-4px" }}
                              >
                                {t("coupons.show_coupon")}
                              </span>
                            </div>
                            {/* Left section - Gray with number */}
                            <div
                              className="bg-[#EBEBEC] h-[45px] text-gray-700 px-6 py-2 flex items-center justify-center"
                              style={{
                                paddingRight: "38px",
                                marginRight: "-48px",
                              }}
                            >
                              <span className="font-bold text-lg">
                                {coupon.uses}
                              </span>
                            </div>
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200">
                            <BsShare className="text-sm" />
                          </button>
                          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200">
                            <BsHeart className="text-sm" />
                          </button>
                        </div>
                      </div>
                      <div
                        className="mb-4 relative"
                        style={{
                          height: "20px",
                          width: "calc(100% + 3rem)",
                          right: "-1.5rem",
                        }}
                      >
                        <img
                          src={cutCopon}
                          alt="cutCopon"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Usage and Expiry */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-2">
                          <IoFlashOutline className="text-orange-500 text-xl" />
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("coupons.usage")}
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              {coupon.uses} {t("coupons.uses_for_code")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <IoCalendarOutline className="text-orange-500 text-xl" />
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("coupons.expires")}
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              {coupon.expiry}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              {search
                ? t("coupons.no_results", { search })
                : t("coupons.no_coupons")}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm ${
                    isActive
                      ? "bg-[#400198] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default CouponsPage;
