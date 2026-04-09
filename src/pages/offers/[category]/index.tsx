import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { offerCategories, type Offer } from "@data/offers";
import { AboutPattern } from "@assets";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import FilterSidebar, { type FilterState } from "../components/FilterSidebar";
import OfferCard from "../components/OfferCard";
import CategoryCard from "@components/CategoryCard";
import {
  useWebHome,
  useFilters,
  useWebOffers,
} from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";
import { API_BASE_URL } from "@config/api";
import { buildWebOffersParams } from "@utils/webFilters";

function buildCategoryIconUrl(
  icon: string | undefined,
  fallback: string,
): string {
  if (!icon || typeof icon !== "string") return fallback;
  let url = icon.trim();
  if (url.includes("/storage/https://")) {
    const i = url.indexOf("/storage/https://");
    url =
      url.substring(0, i + "/storage".length) +
      url.substring(i + "/storage/https://".length);
  }
  if (url && !url.startsWith("http")) {
    url = url.startsWith("/")
      ? `${API_BASE_URL}${url}`
      : `${API_BASE_URL}/storage/${url}`;
  }
  return url || fallback;
}

const CategoryOffersPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(
    null,
  );
  const perPage = 9;

  const { data: webHomeResponse, isLoading: isWebHomeLoading } = useWebHome();

  const SkeletonBlock = ({ className }: { className: string }) => (
    <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
  );

  const CategoryPageSkeleton = () => (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10 w-full">
          <div className="flex items-center justify-center gap-4 mb-4">
            <SkeletonBlock className="w-10 h-10" />
            <SkeletonBlock className="h-9 w-56" />
          </div>
          <SkeletonBlock className="h-5 w-80 mx-auto" />
        </div>
        <div className="absolute -bottom-10 transform z-9">
          <img
            src={AboutPattern}
            alt="Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section>

      <section className="container mx-auto md:py-10 py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <SkeletonBlock className="h-10 w-24 mb-2" />
            <SkeletonBlock className="h-4 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-12 w-64 rounded-full" />
            <SkeletonBlock className="h-12 w-28 rounded-full" />
            <SkeletonBlock className="h-12 w-24 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <SkeletonBlock className="h-[185px] w-full" />
              <div className="p-4">
                <SkeletonBlock className="h-5 w-3/4 mb-3" />
                <SkeletonBlock className="h-4 w-full mb-2" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // استخراج categoryId من API قبل أي استخدام (مطلوب لـ useFilters)
  const categoryId = useMemo(() => {
    if (!category || !webHomeResponse) return null;
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cats = data?.categories as Array<Record<string, unknown>> | undefined;
    const apiCat = Array.isArray(cats)
      ? cats.find((c) => String(c?.slug ?? "") === category)
      : undefined;
    return typeof apiCat?.id === "number" ? apiCat.id : null;
  }, [category, webHomeResponse]);

  const { data: filtersResponse } = useFilters(categoryId);
  const filterOptions = useMemo(() => {
    if (!filtersResponse)
      return { sortOptions: [], subcategories: [], offerTypes: [], brands: [] };
    const res = filtersResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const inner = data?.data as Record<string, unknown> | undefined;
    if (!inner)
      return { sortOptions: [], subcategories: [], offerTypes: [], brands: [] };
    return {
      sortOptions:
        (inner.sort_options as Array<{ key: string; name: string }>) ?? [],
      subcategories:
        (inner.subcategories as Array<{ id: number; name: string }>) ?? [],
      offerTypes:
        (inner.offer_types as Array<{ id: number; name: string }>) ?? [],
      brands: (inner.brands as Array<{ id: number; name: string }>) ?? [],
    };
  }, [filtersResponse]);

  // Category info: from API categories or fallback to offerCategories
  // العرض في الـ breadcrumb والهيدر يكون دائماً الـ name وليس الـ slug
  const categoryInfo = useMemo(() => {
    const fallback = offerCategories.find((cat) => cat.key === category);
    if (!webHomeResponse) return fallback ?? null;
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cats = data?.categories as Array<Record<string, unknown>> | undefined;
    const apiCat = Array.isArray(cats)
      ? cats.find((c) => String(c?.slug ?? "") === category)
      : undefined;
    if (!apiCat) return fallback ?? null;
    const nameAr = String(
      apiCat.name_ar ?? apiCat.name ?? apiCat.title ?? "",
    ).trim();
    const nameEn = String(
      apiCat.name_en ?? apiCat.name ?? apiCat.title ?? "",
    ).trim();
    const ar = nameAr || (fallback?.ar as string) || "";
    const en = nameEn || (fallback?.en as string) || "";
    const iconRaw = apiCat.image ?? apiCat.image_url;
    const icon = buildCategoryIconUrl(
      typeof iconRaw === "string" ? iconRaw : undefined,
      fallback?.icon ?? "",
    );
    return {
      key: category!,
      id: typeof apiCat.id === "number" ? apiCat.id : undefined,
      ar,
      en,
      icon,
      color: fallback?.color ?? "#400198",
    };
  }, [category, webHomeResponse]);

  // التصنيفات الفرعية للتصنيف الحالي من API (data.categories[].subcategories)
  const apiSubcategories = useMemo(() => {
    if (!category || !webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cats = data?.categories as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(cats)) return [];
    const mainCat = cats.find((c) => String(c?.slug ?? "") === category);
    const sub = mainCat?.subcategories as
      | Array<{
          id?: number;
          name?: string;
          slug?: string;
          image?: string | null;
        }>
      | undefined;
    if (!Array.isArray(sub) || sub.length === 0) return [];
    const fallbackIcon = (categoryInfo?.icon as string) ?? "";
    return sub
      .map((s) => {
        const icon = buildCategoryIconUrl(
          typeof s.image === "string" ? s.image : undefined,
          fallbackIcon,
        );
        return {
          id: s.id ?? 0,
          name: String(s.name ?? ""),
          slug: String(s.slug ?? ""),
          icon,
        };
      })
      .filter((s) => s.name && s.slug);
  }, [category, webHomeResponse, categoryInfo?.icon]);

  // Restaurants from API (offers grouped by merchant) or fallback to static data
  // Note: This page now uses server-side filtering via /api/web/offers.

  // قائمة العروض المسطحة للتصنيف (عروض فقط بدون تجميع حسب متجر)
  const webOffersParams = useMemo(
    () =>
      buildWebOffersParams({
        categoryIds: categoryId != null ? [categoryId] : undefined,
        search,
        sortBy:
          appliedFilters?.sortBy && appliedFilters.sortBy !== "nearest"
            ? appliedFilters.sortBy
            : undefined,
        subcategoryIds: appliedFilters?.subcategoryIds,
        brandIds: appliedFilters?.brandIds,
        offerTypeIds: appliedFilters?.offerTypeIds,
        priceMin: appliedFilters?.priceRange?.min,
        priceMax: appliedFilters?.priceRange?.max,
        perPage,
        page: currentPage,
      }),
    [categoryId, search, appliedFilters, perPage, currentPage],
  );

  const { data: webOffersRes, isLoading: isOffersLoading } = useWebOffers(
    webOffersParams,
    { enabled: categoryId != null },
  );

  function extractOffersArray(res: unknown): Array<Record<string, unknown>> {
    const root = (res as Record<string, unknown>) ?? {};
    const data =
      (root.data as Record<string, unknown>) ??
      (root as Record<string, unknown>);
    const offers = (data.offers ?? data.data ?? data) as unknown;
    return Array.isArray(offers)
      ? (offers as Array<Record<string, unknown>>)
      : [];
  }

  function extractPagination(res: unknown): {
    currentPage: number;
    lastPage: number;
    total: number;
  } {
    const root = (res as Record<string, unknown>) ?? {};
    const data =
      (root.data as Record<string, unknown>) ??
      (root as Record<string, unknown>);
    const pg =
      (data.pagination as Record<string, unknown> | undefined) ??
      (data.meta as Record<string, unknown> | undefined) ??
      (data as Record<string, unknown>);
    const currentPage = Number(pg?.current_page ?? pg?.page ?? 1) || 1;
    const lastPage = Number(pg?.last_page ?? pg?.pages ?? 1) || 1;
    const total = Number(pg?.total ?? 0) || 0;
    return { currentPage, lastPage, total };
  }

  const filteredOffers = useMemo(
    () => mapApiOffersToModels(extractOffersArray(webOffersRes)),
    [webOffersRes],
  );

  const pagination = useMemo(
    () => extractPagination(webOffersRes),
    [webOffersRes],
  );

  const handleApplyFilters = (filters: FilterState) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  if (!categoryInfo) {
    // أثناء التنقل بين التصنيفات قد تتأخر بيانات web/home أو categoryInfo لحظياً
    if (isWebHomeLoading || !webHomeResponse) {
      return <CategoryPageSkeleton />;
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "الفئة غير موجودة" : "Category not found"}
          </h2>
          <button
            onClick={() => navigate("/offers")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isRTL ? "العودة للعروض" : "Back to Offers"}
          </button>
        </div>
      </div>
    );
  }

  const totalPages = pagination.lastPage || 1;
  const paginatedOffers = filteredOffers;

  const handleOfferClick = (offer: Offer) => {
    navigate(`/offers/${category}/${offer.companyId}/offer/${offer.id}`);
  };

  return (
    <>
      <Helmet>
        <title>
          {categoryInfo
            ? isRTL
              ? categoryInfo.ar
              : categoryInfo.en
            : isRTL
              ? "تصنيف"
              : "Category"}{" "}
          - {isRTL ? "العروض" : "Offers"}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/offers/${category}`}
        />
      </Helmet>

      {/* Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate("/offers")}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Category Icon and Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `#f8f1ff` }}
            >
              <img
                src={categoryInfo?.icon}
                alt={
                  categoryInfo
                    ? isRTL
                      ? categoryInfo.ar
                      : categoryInfo.en
                    : isRTL
                      ? "تصنيف"
                      : "Category"
                }
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {categoryInfo
                ? isRTL
                  ? categoryInfo.ar
                  : categoryInfo.en
                : isRTL
                  ? "تصنيف"
                  : "Category"}
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/80 text-lg mb-4">
            {categoryInfo
              ? isRTL
                ? `اكتشف أفضل العروض في فئة ${categoryInfo.ar}`
                : `Discover the best offers in ${categoryInfo.en} category`
              : isRTL
                ? "اكتشف أفضل العروض"
                : "Discover the best offers"}
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-sm md:text-base">
            <Link
              to="/"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to="/offers"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "العروض" : "Offers"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <span className="text-[#fd671a] font-medium text-xs">
              {categoryInfo
                ? isRTL
                  ? categoryInfo.ar
                  : categoryInfo.en
                : isRTL
                  ? "تصنيف"
                  : "Category"}
            </span>
          </div>
        </div>

        {/* Pattern Background */}
        <div className="absolute -bottom-10 transform z-9">
          <img
            src={AboutPattern}
            alt="Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section>

      <section className="container mx-auto md:py-10 py-6 px-4">
        {/* التصنيفات الفرعية من API - فوق شريط البحث والفلتر */}
        {apiSubcategories.length > 0 && (
          <div
            className="mb-6"
            style={{
              marginTop: "-55px",
              zIndex: 1,
              position: "relative",
            }}
          >
            {/* <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {isRTL ? "فئات فرعية" : "Subcategories"}
            </h3> */}
            <div className="flex flex-wrap justify-center gap-2">
              {apiSubcategories.map((sub) => {
                const isSelected = appliedFilters?.subcategoryIds?.includes(
                  sub.id,
                );
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setAppliedFilters((prev) => {
                        const next = prev ?? {
                          sortBy: "nearest",
                          subcategoryIds: [],
                          offerTypeIds: [],
                          brandIds: [],
                          priceRange: {},
                        };
                        const has = next.subcategoryIds.includes(sub.id);
                        const subcategoryIds = has
                          ? next.subcategoryIds.filter((s) => s !== sub.id)
                          : [...next.subcategoryIds, sub.id];
                        return { ...next, subcategoryIds };
                      });
                      setCurrentPage(1);
                    }}
                    className={`rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#400198]/30 min-w-[120px] ${
                      isSelected ? "" : "hover:bg-gray-50/80"
                    }`}
                  >
                    <CategoryCard
                      icon={sub.icon}
                      title={sub.name}
                      alt={sub.name}
                      selected={isSelected}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          {/* Results Count */}
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-0">
              <h2 className="text-[#400198] text-3xl font-bold">
                {filteredOffers.length}
              </h2>

              {isRTL ? ` عرض في هذه الفئة` : ` offers in this category`}
            </div>

            {/* Applied Filters Tags */}
            {appliedFilters && (
              <div className="flex flex-wrap gap-2">
                {appliedFilters.sortBy !== "nearest" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {filterOptions.sortOptions.find(
                      (s) => s.key === appliedFilters.sortBy,
                    )?.name ?? appliedFilters.sortBy}
                    <button
                      onClick={() => {
                        const next = {
                          ...appliedFilters,
                          sortBy: "nearest" as const,
                        };
                        setAppliedFilters(next);
                        handleApplyFilters(next);
                      }}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {appliedFilters.subcategoryIds.map((id) => {
                  const sub =
                    apiSubcategories.find((s) => s.id === id) ??
                    filterOptions.subcategories.find((s) => s.id === id);
                  const label = sub?.name ?? String(id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                    >
                      {label}
                      <button
                        onClick={() => {
                          const next = {
                            ...appliedFilters,
                            subcategoryIds:
                              appliedFilters.subcategoryIds.filter(
                                (s) => s !== id,
                              ),
                          };
                          setAppliedFilters(next);
                          handleApplyFilters(next);
                        }}
                        className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {appliedFilters.offerTypeIds.map((id) => {
                  const ot = filterOptions.offerTypes.find((o) => o.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                    >
                      {ot?.name ?? String(id)}
                      <button
                        onClick={() => {
                          const next = {
                            ...appliedFilters,
                            offerTypeIds: appliedFilters.offerTypeIds.filter(
                              (o) => o !== id,
                            ),
                          };
                          setAppliedFilters(next);
                          handleApplyFilters(next);
                        }}
                        className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {appliedFilters.brandIds.map((id) => {
                  const brand = filterOptions.brands.find((b) => b.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {brand?.name ?? String(id)}
                      <button
                        onClick={() => {
                          const next = {
                            ...appliedFilters,
                            brandIds: appliedFilters.brandIds.filter(
                              (b) => b !== id,
                            ),
                          };
                          setAppliedFilters(next);
                          handleApplyFilters(next);
                        }}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {(appliedFilters.priceRange.min != null ||
                  appliedFilters.priceRange.max != null) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {appliedFilters.priceRange.min != null &&
                    appliedFilters.priceRange.max != null
                      ? `${appliedFilters.priceRange.min} - ${appliedFilters.priceRange.max}`
                      : appliedFilters.priceRange.min != null
                        ? `من ${appliedFilters.priceRange.min}`
                        : `إلى ${appliedFilters.priceRange.max}`}
                    <button
                      onClick={() => {
                        const next = { ...appliedFilters, priceRange: {} };
                        setAppliedFilters(next);
                        handleApplyFilters(next);
                      }}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(appliedFilters.sortBy !== "nearest" ||
                  appliedFilters.subcategoryIds.length > 0 ||
                  appliedFilters.offerTypeIds.length > 0 ||
                  appliedFilters.brandIds.length > 0 ||
                  appliedFilters.priceRange.min != null ||
                  appliedFilters.priceRange.max != null) && (
                  <button
                    onClick={() => {
                      const reset: FilterState = {
                        sortBy: "nearest",
                        subcategoryIds: [],
                        offerTypeIds: [],
                        brandIds: [],
                        priceRange: {},
                      };
                      setAppliedFilters(reset);
                      handleApplyFilters(reset);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
                  >
                    {isRTL ? "مسح الكل" : "Clear All"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Filter and View Buttons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={
                  isRTL
                    ? `البحث في ${categoryInfo.ar}...`
                    : `Search in ${categoryInfo.en}...`
                }
                className="w-full px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
              />
            </div>
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
            >
              <FiFilter className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {isRTL ? "فلترة" : "Filter"}
              </span>
            </button>

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

        {/* عرض جميع العروض في التصنيف */}
        {isOffersLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 border-2 border-[#400198] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : paginatedOffers.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-4 gap-6 grid-view"
                : "grid grid-cols-1 gap-6 list-view"
            }
          >
            {paginatedOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onOfferClick={handleOfferClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              {search
                ? isRTL
                  ? `لم يتم العثور على عروض لـ "${search}"`
                  : `No offers found for "${search}"`
                : isRTL
                  ? "لا توجد عروض متاحة"
                  : "No offers available"}
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
                      ? "bg-[#C13899] text-white"
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

      {/* Filter Sidebar */}
      <FilterSidebar
        categoryId={categoryId}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        appliedFilters={appliedFilters}
      />
    </>
  );
};

export default CategoryOffersPage;
