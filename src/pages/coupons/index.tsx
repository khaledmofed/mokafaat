import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { IoCalendarOutline, IoFlashOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaTag, FaPercent, FaUtensils } from "react-icons/fa";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import OwlCarousel from "react-owl-carousel";
import { copon1, copon2, copon3, copon4, cutCopon } from "@assets";
import CouponsHero from "./components/CouponsHero";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import CouponModal, {
  type CouponWithIcon,
} from "@pages/home/components/CouponModal";
import { LoadingSpinner } from "@components/LoadingSpinner";
import {
  useWebCoupons,
  useWebCouponsHome,
} from "@hooks/api/useMokafaatQueries";
import { mapApiCouponsToModels } from "@network/mappers/couponsMapper";
import { stripHtml } from "@utils/stripHtml";
import { useIsRTL } from "@hooks";
import { useUserStore } from "@stores/userStore";
import { useFavorites, useFavoriteToggle } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";
import CategoryCard from "@components/CategoryCard";
import { buildWebCouponsParams } from "@utils/webFilters";
import { IoMdClose } from "react-icons/io";

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
  const { t, i18n } = useTranslation();
  const langBase = i18n.language?.split("-")[0] || "en";
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
              ? t("couponModal.removedFromFavorites")
              : t("couponModal.addedToFavorites"),
          );
        },
        onError: () => toast.error(t("couponModal.errorGeneric")),
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
  const [categoriesCarouselKey, setCategoriesCarouselKey] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const defaultCouponFilters = useMemo(
    () => ({
      merchantIds: [] as string[],
      couponTypes: [] as Array<"percentage" | "fixed">,
    }),
    [],
  );
  const [draftCouponFilters, setDraftCouponFilters] = useState<{
    sortBy?: "newest" | "most_used" | "highest_discount";
    merchantIds: string[];
    couponTypes: Array<"percentage" | "fixed">;
    discountMin?: number;
  }>(defaultCouponFilters);
  const [appliedCouponFilters, setAppliedCouponFilters] = useState<{
    sortBy?: "newest" | "most_used" | "highest_discount";
    merchantIds: string[];
    couponTypes: Array<"percentage" | "fixed">;
    discountMin?: number;
  }>(defaultCouponFilters);
  const perPage = 9;

  const { data: couponsHomeResponse, isLoading: isLoadingCoupons } =
    useWebCouponsHome();

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

  const merchantsList = useMemo(() => {
    if (!homeData) return [];
    const list = homeData.merchants as
      | Array<Record<string, unknown>>
      | undefined;
    return Array.isArray(list) ? list : [];
  }, [homeData]);

  const categoriesCarouselItems = useMemo(() => {
    const normalized = categoriesList
      .map((c) => {
        const id = c?.id != null ? String(c.id) : "";
        const name =
          (c?.name as string | undefined) ??
          (c?.title as string | undefined) ??
          "";
        const icon =
          (c?.icon as string | undefined) ??
          (c?.image as string | undefined) ??
          (c?.logo as string | undefined) ??
          "";
        if (!id || !name) return null;
        return { id, name, icon };
      })
      .filter(Boolean) as Array<{ id: string; name: string; icon: string }>;

    // Match CardsCategorySection behavior: reverse items for RTL
    return isRTL ? [...normalized].reverse() : normalized;
  }, [categoriesList, isRTL]);

  useEffect(() => {
    setCategoriesCarouselKey((prev) => prev + 1);
  }, [isRTL]);

  const categoriesOwlCarouselOptions = useMemo(
    () => ({
      loop: categoriesCarouselItems.length > 4,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      rtl: isRTL && categoriesCarouselItems.length < 4 ? "true" : "false",
      responsive: {
        0: { items: 2 },
        640: { items: 3 },
        1024: { items: 7 },
      },
    }),
    [isRTL, categoriesCarouselItems.length],
  );

  const listParams = useMemo(
    () =>
      buildWebCouponsParams({
        categoryIds: selectedCategoryId ? [selectedCategoryId] : undefined,
        search,
        perPage,
        page: currentPage,
        sortBy:
          appliedCouponFilters.sortBy ??
          (selectedFilter === "top_used" ? "most_used" : "newest"),
        merchantIds:
          appliedCouponFilters.merchantIds.length > 0
            ? appliedCouponFilters.merchantIds
            : undefined,
        couponTypes:
          appliedCouponFilters.couponTypes.length > 0
            ? appliedCouponFilters.couponTypes
            : undefined,
        discountMin: appliedCouponFilters.discountMin,
      }),
    [
      selectedCategoryId,
      search,
      perPage,
      currentPage,
      selectedFilter,
      appliedCouponFilters,
    ],
  );

  const { data: couponsListRes, isLoading: isLoadingList } =
    useWebCoupons(listParams);

  const allCouponsRaw = useMemo(() => {
    const root = (couponsListRes as Record<string, unknown>) ?? {};
    const data =
      (root.data as Record<string, unknown>) ??
      (root as Record<string, unknown>);
    const list = (data.coupons ?? data.data ?? data) as unknown;
    return Array.isArray(list) ? (list as Array<Record<string, unknown>>) : [];
  }, [couponsListRes]);

  const pagination = useMemo(() => {
    const root = (couponsListRes as Record<string, unknown>) ?? {};
    const data =
      (root.data as Record<string, unknown>) ??
      (root as Record<string, unknown>);
    const pg =
      (data.pagination as Record<string, unknown> | undefined) ??
      (data.meta as Record<string, unknown> | undefined) ??
      (data as Record<string, unknown>);
    return {
      currentPage:
        Number(pg?.current_page ?? pg?.page ?? currentPage) || currentPage,
      lastPage: Number(pg?.last_page ?? pg?.pages ?? 1) || 1,
      total: Number(pg?.total ?? 0) || 0,
    };
  }, [couponsListRes, currentPage]);

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

  // Note: server-side filtering is used; raw-by-id map is no longer required here.

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
      const locale =
        langBase === "ar"
          ? "ar-SA"
          : langBase === "ur"
            ? "ur-PK"
            : langBase === "hi"
              ? "hi-IN"
              : "en-US";
      return d.toLocaleDateString(locale, {
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
  }, [allCouponsRaw, langBase]);

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

  // Server-side filtering & pagination (WEB):
  // listParams includes category_ids + search + sort_by + page/per_page
  const paginated = apiCouponsAsDisplay;
  const totalPages = Math.max(1, pagination.lastPage);

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
        <>
          {/* Filter Sidebar (WEB Coupons) */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsFilterOpen(false)}
            />
          )}
          <div
            className={`fixed top-0 h-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white z-[9999] transition-all duration-300 ease-in-out shadow-2xl ${
              isFilterOpen
                ? isRTL
                  ? "right-0 translate-x-0"
                  : "left-0 translate-x-0"
                : isRTL
                  ? "-right-full translate-x-full"
                  : "-left-full -translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {t("coupons.filter_sidebar_title")}
              </h2>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-gray-100 rounded-full p-2"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24 h-[calc(100vh-160px)]">
              <div className="space-y-6">
                {/* Sort */}
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    {t("coupons.sort_by")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { key: "newest", label: t("coupons.sort_newest") },
                        {
                          key: "most_used",
                          label: t("coupons.sort_most_used"),
                        },
                        {
                          key: "highest_discount",
                          label: t("coupons.sort_highest_discount"),
                        },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() =>
                          setDraftCouponFilters((p) => ({
                            ...p,
                            sortBy: opt.key,
                          }))
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          draftCouponFilters.sortBy === opt.key
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coupon Types */}
                <div className="border-t border-gray-200 pt-5">
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    {t("coupons.coupon_type")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        {
                          key: "percentage",
                          label: t("coupons.type_percentage"),
                        },
                        { key: "fixed", label: t("coupons.type_fixed") },
                      ] as const
                    ).map((opt) => {
                      const selected = draftCouponFilters.couponTypes.includes(
                        opt.key,
                      );
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            setDraftCouponFilters((p) => ({
                              ...p,
                              couponTypes: selected
                                ? p.couponTypes.filter((x) => x !== opt.key)
                                : [...p.couponTypes, opt.key],
                            }))
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            selected
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Discount min */}
                <div className="border-t border-gray-200 pt-5">
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    {t("coupons.min_discount_pct")}
                  </p>
                  <input
                    type="number"
                    min={0}
                    value={draftCouponFilters.discountMin ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraftCouponFilters((p) => ({
                        ...p,
                        discountMin: v === "" ? undefined : Number(v),
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198]/30"
                    placeholder={t("coupons.min_discount_placeholder")}
                  />
                </div>

                {/* Merchants */}
                {merchantsList.length > 0 && (
                  <div className="border-t border-gray-200 pt-5">
                    <p className="text-sm font-semibold text-gray-800 mb-3">
                      {t("coupons.merchants")}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {merchantsList.map((m) => {
                        const id = m?.id != null ? String(m.id) : undefined;
                        const name = String(m?.name ?? "").trim();
                        if (!id || !name) return null;
                        const selected =
                          draftCouponFilters.merchantIds.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() =>
                              setDraftCouponFilters((p) => ({
                                ...p,
                                merchantIds: selected
                                  ? p.merchantIds.filter((x) => x !== id)
                                  : [...p.merchantIds, id],
                              }))
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              selected
                                ? "bg-purple-100 text-purple-700 border-purple-200"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDraftCouponFilters(defaultCouponFilters);
                    setAppliedCouponFilters(defaultCouponFilters);
                    setSelectedFilter("latest");
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  {t("cardsPage.reset")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedCouponFilters(draftCouponFilters);
                    setCurrentPage(1);
                    setIsFilterOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-[#fd671a] text-white rounded-lg font-medium hover:bg-[#e55a17] transition-colors"
                >
                  {t("cardsPage.apply")}
                </button>
              </div>
            </div>
          </div>

          {/* Categories (>=7 => slider, <7 => centered grid) */}
          {categoriesCarouselItems.length > 0 && (
            <section className="relative container mx-auto px-4 py-8 z-10">
              <div
                className="w-full max-w-6xl px-4 z-10 mx-auto"
                style={{ marginTop: "-80px" }}
              >
                {categoriesCarouselItems.length >= 7 ? (
                  <div
                    className="relative OffersCarousel PropertiesCarousel CategoryCarousel"
                    style={{
                      direction:
                        isRTL && categoriesCarouselItems.length < 4
                          ? "rtl"
                          : "ltr",
                    }}
                  >
                    <OwlCarousel
                      key={`coupons-categories-${categoriesCarouselKey}-${categoriesCarouselItems.length}`}
                      className="owl-theme"
                      {...categoriesOwlCarouselOptions}
                      style={{
                        direction:
                          isRTL && categoriesCarouselItems.length < 4
                            ? "rtl"
                            : "ltr",
                      }}
                    >
                      {/* All categories */}
                      <div key="all" className="item">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategoryId("");
                            setCurrentPage(1);
                          }}
                          className="w-full"
                        >
                          <CategoryCard
                            icon="https://api.iconify.design/mdi:shape-outline.svg?color=%23400198"
                            title={t("coupons.all_categories")}
                            alt={t("coupons.all_categories")}
                            selected={!selectedCategoryId}
                          />
                        </button>
                      </div>

                      {categoriesCarouselItems.map((cat) => (
                        <div key={cat.id} className="item">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCategoryId(cat.id);
                              setCurrentPage(1);
                            }}
                            className="w-full"
                          >
                            <CategoryCard
                              icon={
                                cat.icon ||
                                "https://api.iconify.design/mdi:shape-outline.svg?color=%23400198"
                              }
                              title={cat.name}
                              alt={cat.name}
                              selected={selectedCategoryId === cat.id}
                            />
                          </button>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                ) : (
                  <div
                    className="flex flex-wrap justify-center gap-2"
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategoryId("");
                        setCurrentPage(1);
                      }}
                      className="rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#400198]/30 min-w-[120px]"
                    >
                      <CategoryCard
                        icon="https://api.iconify.design/mdi:shape-outline.svg?color=%23400198"
                        title={t("coupons.all_categories")}
                        alt={t("coupons.all_categories")}
                        selected={!selectedCategoryId}
                      />
                    </button>

                    {categoriesCarouselItems.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategoryId(cat.id);
                          setCurrentPage(1);
                        }}
                        className="rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#400198]/30 min-w-[120px]"
                      >
                        <CategoryCard
                          icon={
                            cat.icon ||
                            "https://api.iconify.design/mdi:shape-outline.svg?color=%23400198"
                          }
                          title={cat.name}
                          alt={cat.name}
                          selected={selectedCategoryId === cat.id}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

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
                  {t("coupons.latest")}
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
                {/* Filter button */}
                <button
                  type="button"
                  onClick={() => {
                    setDraftCouponFilters(appliedCouponFilters);
                    setIsFilterOpen(true);
                  }}
                  className="px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 inline-flex items-center gap-2"
                >
                  <FiFilter size={18} />
                  {t("coupons.filter")}
                </button>
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

            {/* Results Count + Applied Filters Tags (like Offers page) */}
            <div className="text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2 mb-0">
                <h2 className="text-[#400198] text-3xl font-bold">
                  {pagination.total || paginated.length}
                </h2>
                {t("coupons.coupons_suffix")}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {(() => {
                  const effectiveSort =
                    appliedCouponFilters.sortBy ??
                    (selectedFilter === "top_used" ? "most_used" : "newest");
                  const hasAny =
                    effectiveSort !== "newest" ||
                    appliedCouponFilters.merchantIds.length > 0 ||
                    appliedCouponFilters.couponTypes.length > 0 ||
                    appliedCouponFilters.discountMin != null;

                  const sortLabel =
                    effectiveSort === "most_used"
                      ? t("coupons.sort_most_used")
                      : effectiveSort === "highest_discount"
                        ? t("coupons.sort_highest_discount")
                        : t("coupons.sort_newest");

                  return (
                    <>
                      {effectiveSort !== "newest" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {sortLabel}
                          <button
                            type="button"
                            onClick={() => {
                              setAppliedCouponFilters((p) => ({
                                ...p,
                                sortBy: undefined,
                              }));
                              setSelectedFilter("latest");
                              setCurrentPage(1);
                            }}
                            className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                          >
                            ×
                          </button>
                        </span>
                      )}

                      {appliedCouponFilters.couponTypes.map((ct) => (
                        <span
                          key={ct}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                        >
                          {ct === "percentage"
                            ? t("coupons.type_percentage")
                            : t("coupons.type_fixed")}
                          <button
                            type="button"
                            onClick={() => {
                              setAppliedCouponFilters((p) => ({
                                ...p,
                                couponTypes: p.couponTypes.filter(
                                  (x) => x !== ct,
                                ),
                              }));
                              setCurrentPage(1);
                            }}
                            className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}

                      {appliedCouponFilters.merchantIds.map((id) => {
                        const label =
                          merchantsList.find(
                            (m) => String(m?.id) === String(id),
                          )?.name ?? id;
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {String(label)}
                            <button
                              type="button"
                              onClick={() => {
                                setAppliedCouponFilters((p) => ({
                                  ...p,
                                  merchantIds: p.merchantIds.filter(
                                    (x) => x !== id,
                                  ),
                                }));
                                setCurrentPage(1);
                              }}
                              className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}

                      {appliedCouponFilters.discountMin != null && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {t("coupons.discount_min_tag", {
                            min: appliedCouponFilters.discountMin,
                          })}
                          <button
                            type="button"
                            onClick={() => {
                              setAppliedCouponFilters((p) => ({
                                ...p,
                                discountMin: undefined,
                              }));
                              setCurrentPage(1);
                            }}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            ×
                          </button>
                        </span>
                      )}

                      {hasAny && (
                        <button
                          type="button"
                          onClick={() => {
                            setAppliedCouponFilters(defaultCouponFilters);
                            setDraftCouponFilters(defaultCouponFilters);
                            setSelectedFilter("latest");
                            setCurrentPage(1);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
                        >
                          {t("coupons.clear_all")}
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Coupons Display */}
            {isLoadingList ? (
              <div className="container mx-auto md:p-10 p-6 flex justify-center min-h-[200px] items-center">
                <LoadingSpinner />
              </div>
            ) : paginated.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                                onClick={(e) =>
                                  handleFavoriteClick(e, coupon.id)
                                }
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
                                onClick={(e) =>
                                  handleFavoriteClick(e, coupon.id)
                                }
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
                              alt={t("coupons.image_cut_coupon")}
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
        </>
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
