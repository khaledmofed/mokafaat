import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { IoCalendarOutline, IoFlashOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaTag, FaPercent, FaUtensils } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import { copon1, copon2, copon3, copon4, cutCopon } from "@assets";
import CouponsHero from "./components/CouponsHero";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import CouponModal, { type CouponWithIcon } from "@pages/home/components/CouponModal";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiCouponsToModels } from "@network/mappers/couponsMapper";
import { stripHtml } from "@utils/stripHtml";
import { useIsRTL } from "@hooks";
import { useUserStore } from "@stores/userStore";
import { useFavorites, useFavoriteToggle } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";

type CouponDisplay = {
  id: string;
  storeName: string;
  storeCategory: string;
  logo: string;
  discount: string;
  offer: string;
  uses: number;
  expiry: string;
  rating: number;
  views: number;
  downloads: number;
  isNearby: boolean;
  visits: number;
};

const CouponsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const isAuthenticated = useUserStore((s) => !!s.token);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(() => normalizeFavoritesList(favoritesData ?? null), [favoritesData]);

  const isCouponFavorite = (couponId: string) =>
    favoritesList.some((f) => f.favorable_type === "coupon" && String(f.favorable_id) === String(couponId));

  const handleFavoriteClick = (e: React.MouseEvent, couponId: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    const isFavorite = isCouponFavorite(couponId);
    toggleFavorite.mutate(
      { favorable_type: "coupon", favorable_id: couponId },
      {
        onSuccess: () => {
          toast.success(isFavorite ? (isRTL ? "تمت إزالته من المحفوظات" : "Removed from favorites") : (isRTL ? "تمت الإضافة إلى المحفوظات" : "Added to favorites"));
        },
        onError: () => toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
      }
    );
  };

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("nearby");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCoupon, setSelectedCoupon] = useState<CouponWithIcon | null>(null);
  const perPage = 9;

  const { data: webHomeResponse } = useWebHome();

  const allCouponsRaw = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const coupons = data?.coupons as Record<string, unknown> | undefined;
    return Array.isArray(coupons?.all) ? coupons.all : [];
  }, [webHomeResponse]);

  const couponModels = useMemo(
    () => mapApiCouponsToModels(allCouponsRaw as Array<Record<string, unknown>>),
    [allCouponsRaw]
  );

  const couponsWithIcons = useMemo((): CouponWithIcon[] => {
    return couponModels.map((coupon) => {
      let icon = <FaTag className="text-2xl" />;
      if (coupon.discountPercentage) {
        icon = <FaPercent className="text-2xl" />;
      } else if (
        coupon.category?.includes("مطاعم") ||
        coupon.title.includes("وجبة")
      ) {
        icon = <FaUtensils className="text-2xl" />;
      }
      return { ...coupon, icon };
    });
  }, [couponModels]);

  const apiCouponsAsDisplay = useMemo((): CouponDisplay[] => {
    const logos = ["copon1", "copon2", "copon3", "copon4"];
    return couponModels.map((c, i) => ({
      id: String(c.id),
      storeName: c.title,
      storeCategory: c.category ?? "",
      logo: logos[i % logos.length],
      discount:
        c.dealSubtext ??
        (c.discountPercentage ? `${c.discountPercentage}%` : ""),
      offer: c.savings,
      uses: 0,
      expiry: c.validity,
      rating: 0,
      views: 0,
      downloads: 0,
      isNearby: i % 2 === 0,
      visits: 0,
    }));
  }, [couponModels]);

  const getCouponImage = (logoName: string) => {
    if (logoName.startsWith("http")) return logoName;
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

  const filteredCoupons = useMemo(() => {
    let coupons: CouponDisplay[] =
      apiCouponsAsDisplay.length > 0 ? apiCouponsAsDisplay : [];

    if (search) {
      coupons = coupons.filter(
        (coupon) =>
          coupon.storeName.toLowerCase().includes(search.toLowerCase()) ||
          coupon.storeCategory.toLowerCase().includes(search.toLowerCase()) ||
          coupon.offer.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (selectedFilter) {
      case "nearby":
        coupons = coupons.filter((coupon) => coupon.isNearby);
        break;
      case "most_visited":
        coupons = [...coupons].sort((a, b) => b.visits - a.visits);
        break;
      case "highest_rated":
        coupons = [...coupons].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return coupons;
  }, [selectedFilter, search, apiCouponsAsDisplay]);

  const totalPages = Math.ceil(filteredCoupons.length / perPage) || 1;
  const startIdx = (currentPage - 1) * perPage;
  const paginated = filteredCoupons.slice(startIdx, startIdx + perPage);

  const openCouponModal = (displayCoupon: CouponDisplay) => {
    const withIcon = couponsWithIcons.find(
      (c) => String(c.id) === String(displayCoupon.id)
    );
    if (withIcon) setSelectedCoupon(withIcon);
  };

  const getLogoUrlForModal = (coupon: { id: number }) => {
    const d = apiCouponsAsDisplay.find(
      (x) => String(x.id) === String(coupon.id)
    );
    return d ? getCouponImage(d.logo) : "";
  };

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
                role="button"
                tabIndex={0}
                onClick={() => openCouponModal(coupon)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCouponModal(coupon);
                  }
                }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
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
                            {stripHtml(coupon.storeName)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {stripHtml(coupon.storeCategory)}
                          </p>
                          <h4 className="text-sm font-bold text-gray-900 mt-1">
                            {stripHtml(coupon.offer)}
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
                          <button
                            type="button"
                            onClick={(e) => handleFavoriteClick(e, coupon.id)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                            disabled={toggleFavorite.isPending}
                          >
                            {isCouponFavorite(coupon.id) ? <BsHeartFill className="text-sm text-red-500" /> : <BsHeart className="text-sm" />}
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
                              {stripHtml(coupon.storeName)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {stripHtml(coupon.storeCategory)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Offer */}
                      <div className="mb-4">
                        <h4 className="text-base font-bold text-gray-900 mb-2">
                          {stripHtml(coupon.offer)}
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
                          <button
                            type="button"
                            onClick={(e) => handleFavoriteClick(e, coupon.id)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                            disabled={toggleFavorite.isPending}
                          >
                            {isCouponFavorite(coupon.id) ? <BsHeartFill className="text-sm text-red-500" /> : <BsHeart className="text-sm" />}
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

      {selectedCoupon && (
        <CouponModal
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
          getLogoUrl={getLogoUrlForModal}
        />
      )}
    </>
  );
};

export default CouponsPage;
