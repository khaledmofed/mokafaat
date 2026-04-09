import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CardsHero from "./components/CardsHero";
import CardsCategorySection from "./components/CardsCategorySection";
import CardsSliderSection from "./components/CardsSliderSection";
import { useIsRTL } from "@hooks";
import { Helmet } from "react-helmet-async";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { useWebCards } from "@hooks/api/useMokafaatQueries";
import {
  mapApiHomeCardsToOffers,
  type CardOfferWithCompanyId,
} from "@network/mappers/cardsMapper";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { buildWebCardsParams } from "@utils/webFilters";
import { FiFilter } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

interface ApiCategory {
  id: number;
  name: string;
  image?: string;
}

interface ApiMerchant {
  id: number;
  name: string;
  logo: string;
}

const CardsPage = () => {
  const isRTL = useIsRTL();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const createDefaultCardsFilters = useCallback(
    () => ({ merchantIds: [] as Array<string | number>, validityTypes: [] as string[] }),
    [],
  );
  const [draftCardsFilters, setDraftCardsFilters] = useState<{
    merchantIds: Array<string | number>;
    validityTypes: string[];
    isRenewable?: boolean;
    priceMin?: number;
    priceMax?: number;
  }>(createDefaultCardsFilters);
  const [appliedCardsFilters, setAppliedCardsFilters] = useState<{
    merchantIds: Array<string | number>;
    validityTypes: string[];
    isRenewable?: boolean;
    priceMin?: number;
    priceMax?: number;
  }>(createDefaultCardsFilters);

  const categoryIdNum =
    selectedCategoryId !== "all" ? Number(selectedCategoryId) : undefined;

  const baseParams = useMemo(
    () => ({
      categoryIds: categoryIdNum ? [categoryIdNum] : undefined,
      merchantIds:
        appliedCardsFilters.merchantIds.length > 0
          ? appliedCardsFilters.merchantIds
          : undefined,
      validityTypes:
        appliedCardsFilters.validityTypes.length > 0
          ? appliedCardsFilters.validityTypes
          : undefined,
      isRenewable: appliedCardsFilters.isRenewable,
      priceMin: appliedCardsFilters.priceMin,
      priceMax: appliedCardsFilters.priceMax,
      search: search || undefined,
      perPage: 50,
      page: 1,
    }),
    [categoryIdNum, appliedCardsFilters, search],
  );

  const { data: latestRes, isLoading: latestLoading } = useWebCards(
    buildWebCardsParams({
      ...baseParams,
      sortBy: "newest",
    }),
  );
  const { data: topSellingRes, isLoading: topSellingLoading } = useWebCards(
    buildWebCardsParams({
      ...baseParams,
      sortBy: "best_selling",
    }),
  );
  const { data: mostViewedRes, isLoading: mostViewedLoading } = useWebCards(
    buildWebCardsParams({
      ...baseParams,
      sortBy: "most_viewed",
    }),
  );

  const extractCardsPayload = useCallback((res: unknown) => {
    const root = (res as Record<string, unknown>) ?? {};
    return (root.data as Record<string, unknown>) ?? root;
  }, []);

  const latestData = useMemo(
    () => extractCardsPayload(latestRes),
    [latestRes, extractCardsPayload],
  );

  const categories = useMemo((): ApiCategory[] => {
    const arr =
      (latestData?.categories as ApiCategory[] | undefined) ??
      (latestData?.data as ApiCategory[] | undefined);
    return Array.isArray(arr) ? arr : [];
  }, [latestData]);

  const categoryItems = useMemo(
    () =>
      categories.map((c) => ({
        id: c.id,
        name: c.name,
        image: c.image,
      })),
    [categories],
  );

  const merchants = useMemo((): ApiMerchant[] => {
    const arr = latestData?.merchants as ApiMerchant[] | undefined;
    return Array.isArray(arr) ? arr : [];
  }, [latestData]);

  const latestCards = useMemo((): CardOfferWithCompanyId[] => {
    const payload = extractCardsPayload(latestRes);
    const arr = payload?.cards as Array<Record<string, unknown>> | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [latestRes, extractCardsPayload]);

  const topSellingCards = useMemo((): CardOfferWithCompanyId[] => {
    const payload = extractCardsPayload(topSellingRes);
    const arr = payload?.cards as Array<Record<string, unknown>> | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [topSellingRes, extractCardsPayload]);

  const mostViewedCards = useMemo((): CardOfferWithCompanyId[] => {
    const payload = extractCardsPayload(mostViewedRes);
    const arr = payload?.cards as Array<Record<string, unknown>> | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [mostViewedRes, extractCardsPayload]);

  const isLoading = latestLoading || topSellingLoading || mostViewedLoading;

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{isRTL ? "البطاقات" : "Cards"}</title>
          <link rel="canonical" href="https://mukafaat.com/cards" />
        </Helmet>
        <CardsHero />
        <div className="min-h-[40vh] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isRTL ? "البطاقات" : "Cards"}</title>
        <link rel="canonical" href="https://mukafaat.com/cards" />
      </Helmet>

      <CardsHero />

      <CardsCategorySection
        categories={categoryItems}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        isLoading={isLoading}
      />

      {/* Cards filters trigger (Sidebar) */}
      <section className="container mx-auto px-4 -mt-2 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? "بحث في البطاقات..." : "Search cards..."}
              className="w-full px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setDraftCardsFilters(appliedCardsFilters);
              setIsFilterOpen(true);
            }}
            className="px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 inline-flex items-center gap-2"
          >
            <FiFilter size={18} />
            {isRTL ? "فلترة" : "Filter"}
          </button>
        </div>

        {/* Applied Filters Tags (like Offers page) */}
        <div className="text-sm text-gray-600 mt-4">
          <div className="flex flex-wrap gap-2">
            {appliedCardsFilters.merchantIds.map((id) => {
              const label =
                merchants.find((m) => String(m?.id) === String(id))?.name ?? String(id);
              return (
                <span
                  key={`m-${id}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() =>
                      setAppliedCardsFilters((p) => ({
                        ...p,
                        merchantIds: p.merchantIds.filter(
                          (x) => String(x) !== String(id),
                        ),
                      }))
                    }
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              );
            })}

            {appliedCardsFilters.validityTypes.map((v) => (
              <span
                key={`v-${v}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
              >
                {v}
                <button
                  type="button"
                  onClick={() =>
                    setAppliedCardsFilters((p) => ({
                      ...p,
                      validityTypes: p.validityTypes.filter((x) => x !== v),
                    }))
                  }
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            ))}

            {appliedCardsFilters.isRenewable && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {isRTL ? "قابلة للتجديد" : "Renewable"}
                <button
                  type="button"
                  onClick={() =>
                    setAppliedCardsFilters((p) => ({ ...p, isRenewable: undefined }))
                  }
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {(appliedCardsFilters.priceMin != null ||
              appliedCardsFilters.priceMax != null) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {appliedCardsFilters.priceMin != null &&
                appliedCardsFilters.priceMax != null
                  ? `${appliedCardsFilters.priceMin} - ${appliedCardsFilters.priceMax}`
                  : appliedCardsFilters.priceMin != null
                    ? isRTL
                      ? `من ${appliedCardsFilters.priceMin}`
                      : `Min ${appliedCardsFilters.priceMin}`
                    : isRTL
                      ? `إلى ${appliedCardsFilters.priceMax}`
                      : `Max ${appliedCardsFilters.priceMax}`}
                <button
                  type="button"
                  onClick={() =>
                    setAppliedCardsFilters((p) => ({
                      ...p,
                      priceMin: undefined,
                      priceMax: undefined,
                    }))
                  }
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {(appliedCardsFilters.merchantIds.length > 0 ||
              appliedCardsFilters.validityTypes.length > 0 ||
              appliedCardsFilters.isRenewable ||
              appliedCardsFilters.priceMin != null ||
              appliedCardsFilters.priceMax != null) && (
              <button
                type="button"
                onClick={() => {
                  // Reset everything back to "no filtering"
                  const reset = createDefaultCardsFilters();
                  setAppliedCardsFilters(reset);
                  setDraftCardsFilters(reset);
                  setSearch("");
                  setSelectedCategoryId("all");
                }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
              >
                {isRTL ? "مسح الكل" : "Clear All"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Sidebar (WEB Cards) */}
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
            {isRTL ? "فلترة البطاقات" : "Filter Cards"}
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
            {/* Merchants */}
            {merchants.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  {isRTL ? "التجار" : "Merchants"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {merchants.map((m) => {
                    const id = m?.id;
                    const name = String(m?.name ?? "").trim();
                    if (!id || !name) return null;
                    const selected = draftCardsFilters.merchantIds.some(
                      (x) => String(x) === String(id),
                    );
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() =>
                          setDraftCardsFilters((p) => ({
                            ...p,
                            merchantIds: selected
                              ? p.merchantIds.filter((x) => String(x) !== String(id))
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

            {/* Validity types */}
            <div className="border-t border-gray-200 pt-5">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                {isRTL ? "نوع الصلاحية" : "Validity type"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "daily",
                    "weekly",
                    "monthly",
                    "quarterly",
                    "semi_annual",
                    "annual",
                    "unlimited",
                  ] as const
                ).map((v) => {
                  const selected = draftCardsFilters.validityTypes.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() =>
                        setDraftCardsFilters((p) => ({
                          ...p,
                          validityTypes: selected
                            ? p.validityTypes.filter((x) => x !== v)
                            : [...p.validityTypes, v],
                        }))
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        selected
                          ? "bg-purple-100 text-purple-700 border-purple-200"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Renewable */}
            <div className="border-t border-gray-200 pt-5">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={Boolean(draftCardsFilters.isRenewable)}
                  onChange={(e) =>
                    setDraftCardsFilters((p) => ({
                      ...p,
                      isRenewable: e.target.checked ? true : undefined,
                    }))
                  }
                />
                {isRTL ? "قابلة للتجديد" : "Renewable"}
              </label>
            </div>

            {/* Price range */}
            <div className="border-t border-gray-200 pt-5">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                {isRTL ? "نطاق السعر" : "Price range"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min={0}
                  value={draftCardsFilters.priceMin ?? ""}
                  onChange={(e) =>
                    setDraftCardsFilters((p) => ({
                      ...p,
                      priceMin: e.target.value === "" ? undefined : Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198]/30"
                  placeholder={isRTL ? "من" : "Min"}
                />
                <input
                  type="number"
                  min={0}
                  value={draftCardsFilters.priceMax ?? ""}
                  onChange={(e) =>
                    setDraftCardsFilters((p) => ({
                      ...p,
                      priceMax: e.target.value === "" ? undefined : Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198]/30"
                  placeholder={isRTL ? "إلى" : "Max"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                (() => {
                  const reset = createDefaultCardsFilters();
                  setDraftCardsFilters(reset);
                  setAppliedCardsFilters(reset);
                  setSearch("");
                  setSelectedCategoryId("all");
                })()
              }
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {isRTL ? "إعادة تعيين" : "Reset"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAppliedCardsFilters(draftCardsFilters);
                setIsFilterOpen(false);
              }}
              className="flex-1 px-4 py-2 bg-[#fd671a] text-white rounded-lg font-medium hover:bg-[#e55a17] transition-colors"
            >
              {isRTL ? "تطبيق" : "Apply"}
            </button>
          </div>
        </div>
      </div>

      {merchants.length > 0 && (
        <section className="container mx-auto px-4 pb-10">
          <div className="text-start mb-4">
            <h2 className="text-[#400198] text-3xl font-bold">
              {isRTL ? "التجار" : "Merchants"}
            </h2>
            <p className="text-md text-gray-700 leading-relaxed">
              {isRTL ? "تصفح البطاقات حسب التاجر" : "Browse cards by merchant"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {merchants.map((merchant) => (
              <Link
                key={merchant.id}
                to={`/cards/${merchant.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col items-center p-4 no-underline text-inherit"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mb-3">
                  <img
                    src={merchant.logo}
                    alt={merchant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 text-center line-clamp-2">
                  {merchant.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CardsSliderSection
        title={isRTL ? "أحدث البطاقات" : "Latest Cards"}
        subtitle={
          isRTL
            ? "اكتشف أحدث البطاقات والخصومات المتاحة"
            : "Discover the latest cards and discounts available"
        }
        cards={latestCards}
        isLoading={isLoading}
        categories={categoryItems}
      />

      <CardsSliderSection
        title={isRTL ? "الأكثر مبيعاً" : "Top Selling"}
        subtitle={
          isRTL
            ? "البطاقات الأكثر طلباً من قبل العملاء"
            : "Most requested cards by customers"
        }
        cards={topSellingCards}
        isLoading={isLoading}
        categories={categoryItems}
      />

      <CardsSliderSection
        title={isRTL ? "الأكثر مشاهدة" : "Most Viewed"}
        subtitle={
          isRTL
            ? "البطاقات الأكثر مشاهدة وتصفحاً"
            : "Most viewed and browsed cards"
        }
        cards={mostViewedCards}
        isLoading={isLoading}
        categories={categoryItems}
      />

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default CardsPage;
