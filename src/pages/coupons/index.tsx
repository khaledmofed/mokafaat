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
import CouponModal, {
  type CouponWithIcon,
} from "@pages/home/components/CouponModal";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { useCouponsHome } from "@hooks/api/useMokafaatQueries";
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
  visits: number;
  couponCode: string;
};

const CouponsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const isAuthenticated = useUserStore((s) => !!s.token);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(
    () => normalizeFavoritesList(favoritesData ?? null),
    [favoritesData],
  );

  const isCouponFavorite = (couponId: string) =>
    favoritesList.some(
      (f) =>
        f.favorable_type === "coupon" &&
        String(f.favorable_id) === String(couponId),
    );

  const handleFavoriteClick = (e: React.MouseEvent, couponId: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(
        `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }
    const isFavorite = isCouponFavorite(couponId);
    toggleFavorite.mutate(
      { favorable_type: "coupon", favorable_id: couponId },
      {
        onSuccess: () => {
          toast.success(
            isFavorite
              ? isRTL
                ? "تمت إزالته من المفضلة"
                : "Removed from favorites"
              : isRTL
                ? "تمت الإضافة إلى المفضلة"
                : "Added to favorites",
          );
        },
        onError: () => toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
      },
    );
  };

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<"latest" | "top_used">(
    "latest",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCoupon, setSelectedCoupon] = useState<CouponWithIcon | null>(
    null,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const perPage = 9;

  const { data: couponsHomeResponse, isLoading: isLoadingCoupons } =
    useCouponsHome();

  const homeData = useMemo(() => {
    if (!couponsHomeResponse) return null;
    const res = couponsHomeResponse as Record<string, unknown>;
    return (res?.data as Record<string, unknown>) ?? res;
  }, [couponsHomeResponse]);

  const categoriesList = useMemo(() => {
    if (!homeData) return [];
    const list = homeData.categories as
      | Array<Record<string, unknown>>
      | undefined;
    return Array.isArray(list) ? list : [];
  }, [homeData]);

  const allCouponsRaw = useMemo(() => {
    if (!homeData) return [];
    if (selectedFilter === "top_used") {
      const list = homeData.top_used_coupons as
        | Array<Record<string, unknown>>
        | undefined;
      return Array.isArray(list) ? list : [];
    }
    const list = homeData.latest_coupons as
      | Array<Record<string, unknown>>
      | undefined;
    return Array.isArray(list) ? list : [];
  }, [homeData, selectedFilter]);

  const couponModels = useMemo(() => {
    const withTitle = (allCouponsRaw as Array<Record<string, unknown>>).map(
      (c) => ({
        ...c,
        title: c.name ?? c.title,
        // نمرّر أسماء بديلة ليستفيد منها الـ mapper لو احتاج
        couponCode: c.coupon_code,
        storeUrl: c.store_url,
      }),
    );
    return mapApiCouponsToModels(withTitle);
  }, [allCouponsRaw]);

  const couponRawById = useMemo(() => {
    const m = new Map<string, Record<string, unknown>>();
    (allCouponsRaw as Array<Record<string, unknown>>).forEach((c) => {
      const id = c?.id != null ? String(c.id) : null;
      if (id) m.set(id, c);
    });
    return m;
  }, [allCouponsRaw]);

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
    const pickLogo = (raw: Record<string, unknown> | undefined): string => {
      if (!raw) return "";
      const direct =
        (raw.image as string | undefined) || (raw.logo as string | undefined);
      if (direct) return String(direct);
      const merchant = raw.merchant as Record<string, unknown> | undefined;
      const merchantLogo = merchant?.logo as string | undefined;
      return merchantLogo ? String(merchantLogo) : "";
    };

    const pickUses = (raw: Record<string, unknown> | undefined): number => {
      const v = raw?.usage_count ?? raw?.uses ?? raw?.used_count ?? 0;
      const n = typeof v === "number" ? v : parseInt(String(v ?? "0"), 10);
      return Number.isFinite(n) ? n : 0;
    };

    const pickExpiry = (
      raw: Record<string, unknown> | undefined,
      fallback: string,
    ): string => {
      const v = raw?.end_date ?? raw?.expires_at ?? raw?.expiry;
      if (!v) return fallback;
      const d = new Date(String(v));
      if (Number.isNaN(d.getTime())) return fallback;
      return d.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    return (allCouponsRaw as Array<Record<string, unknown>>).map((raw) => {
      const merchant = raw.merchant as Record<string, unknown> | undefined;
      const category = raw.category as Record<string, unknown> | undefined;
      const storeName =
        (merchant?.name as string) ?? (raw.name as string) ?? "";
      const storeCategory = (category?.name as string) ?? "";
      const logoUrl = pickLogo(raw);
      const uses = pickUses(raw);
      const expiry = pickExpiry(raw, "");
      const discountPct =
        raw.discount_percentage != null
          ? Number(raw.discount_percentage)
          : null;
      const discount = discountPct != null ? `${discountPct}%` : "";
      const offer = (raw.name as string) ?? (raw.description as string) ?? "";

      return {
        id: String(raw.id ?? ""),
        storeName,
        storeCategory,
        logo: logoUrl || "copon1",
        discount,
        offer,
        uses,
        expiry,
        rating: 0,
        views: 0,
        downloads: 0,
        visits: uses,
        couponCode: String(raw.coupon_code ?? ""),
      };
    });
  }, [allCouponsRaw, isRTL]);

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

    if (selectedCategoryId) {
      coupons = coupons.filter(
        (c) =>
          String(
            (couponRawById.get(c.id)?.category as Record<string, unknown>)?.id,
          ) === selectedCategoryId,
      );
    }

    if (search) {
      coupons = coupons.filter(
        (coupon) =>
          coupon.storeName.toLowerCase().includes(search.toLowerCase()) ||
          coupon.storeCategory.toLowerCase().includes(search.toLowerCase()) ||
          coupon.offer.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return coupons;
  }, [selectedCategoryId, search, apiCouponsAsDisplay, couponRawById]);

  const totalPages = Math.max(1, Math.ceil(filteredCoupons.length / perPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredCoupons.slice(start, start + perPage);
  }, [filteredCoupons, currentPage, perPage]);

  const openCouponModal = (displayCoupon: CouponDisplay) => {
    const withIcon = couponsWithIcons.find(
      (c) => String(c.id) === String(displayCoupon.id),
    );
    if (withIcon) setSelectedCoupon(withIcon);
  };

  const getLogoUrlForModal = (coupon: { id: number }) => {
    const d = apiCouponsAsDisplay.find(
      (x) => String(x.id) === String(coupon.id),
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

      {isLoadingCoupons ? (
        <div className="container mx-auto md:p-10 p-6 flex justify-center min-h-[300px] items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="container mx-auto md:p-10 p-6 portfolio-mobile">
          {/* Filters + Search + View Mode */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3 style-portfolio-button-mobile-container">
              <button
                onClick={() => {
                  setSelectedFilter("latest");
                  setCurrentPage(1);
                }}
                className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                  selectedFilter === "latest"
                    ? "bg-[#400198] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {isRTL ? "الأحدث" : "Latest"}
              </button>
              <button
                onClick={() => {
                  setSelectedFilter("top_used");
                  setCurrentPage(1);
                }}
                className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                  selectedFilter === "top_used"
                    ? "bg-[#400198] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {t("coupons.filters.most_visited")}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Category Filter (API) */}
              <div className="w-full md:w-56">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
                >
                  <option value="">
                    {isRTL ? "كل التصنيفات" : "All categories"}
                  </option>
                  {categoriesList.map((c) => {
                    const id = c?.id != null ? String(c.id) : "";
                    const name =
                      (c?.name as string | undefined) ??
                      (c?.title as string | undefined) ??
                      "";
                    if (!id || !name) return null;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
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
                          {coupon.expiry && (
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
                          )}
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
                                {coupon.couponCode
                                  ? coupon.couponCode.slice(0, 3)
                                  : coupon.uses}
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
                              {isCouponFavorite(coupon.id) ? (
                                <BsHeartFill className="text-sm text-red-500" />
                              ) : (
                                <BsHeart className="text-sm" />
                              )}
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
                                  {coupon.couponCode
                                    ? coupon.couponCode.slice(0, 3)
                                    : coupon.uses}
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
                              {isCouponFavorite(coupon.id) ? (
                                <BsHeartFill className="text-sm text-red-500" />
                              ) : (
                                <BsHeart className="text-sm" />
                              )}
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
                          {coupon.expiry && (
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
                          )}
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
      )}

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
