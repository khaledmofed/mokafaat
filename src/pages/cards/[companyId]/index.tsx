import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiGrid, FiList } from "react-icons/fi";
import { AboutPattern } from "@assets";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import OfferCard from "./components/OfferCard";
import { useCardsByMerchant, useCardsHome } from "@hooks/api/useMokafaatQueries";
import { mapApiHomeCardsToOffers, type CardOfferWithCompanyId } from "@network/mappers/cardsMapper";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface ApiCategory {
  id: number;
  name: string;
  image?: string;
}

const MerchantCardsPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: merchantResponse, isLoading } = useCardsByMerchant(companyId ?? "", {
    page: currentPage,
  });
  const { data: cardsHomeResponse } = useCardsHome();

  const categories = useMemo((): ApiCategory[] => {
    const res = cardsHomeResponse as Record<string, unknown> | undefined;
    const data = (res?.data as Record<string, unknown>) ?? null;
    const arr = (data?.categories as ApiCategory[]) ?? [];
    return Array.isArray(arr) ? arr : [];
  }, [cardsHomeResponse]);

  const categoryItems = useMemo(
    () => categories.map((c) => ({ id: c.id, name: c.name, image: c.image })),
    [categories],
  );

  const data = useMemo(() => {
    const res = merchantResponse as Record<string, unknown> | undefined;
    return (res?.data as Record<string, unknown>) ?? null;
  }, [merchantResponse]);

  const merchant = useMemo(() => {
    const m = data?.merchant as Record<string, unknown> | undefined;
    return m ?? null;
  }, [data]);

  const featuredCards = useMemo((): CardOfferWithCompanyId[] => {
    const arr = data?.featured_cards as Array<Record<string, unknown>> | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [data]);

  const apiCards = useMemo((): CardOfferWithCompanyId[] => {
    const arr = data?.cards as Array<Record<string, unknown>> | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [data]);

  const totalFromApi = useMemo(() => Number(data?.total ?? 0), [data]);
  const lastPage = useMemo(() => Number(data?.last_page ?? 1), [data]);
  const apiCurrentPage = useMemo(() => Number(data?.current_page ?? 1), [data]);

  const filteredCards = useMemo(() => {
    if (!search.trim()) return apiCards;
    const q = search.toLowerCase();
    return apiCards.filter(
      (o) =>
        (o.title?.ar ?? "").toLowerCase().includes(q) ||
        (o.title?.en ?? "").toLowerCase().includes(q) ||
        (o.description?.ar ?? "").toLowerCase().includes(q) ||
        (o.description?.en ?? "").toLowerCase().includes(q),
    );
  }, [apiCards, search]);

  const merchantName = merchant ? String(merchant.name ?? "") : "";
  const merchantLogo = merchant ? String(merchant.logo ?? "") : "";
  const coverImage = merchant ? String(merchant.cover_image ?? "") : "";
  const followersCount = merchant != null ? Number(merchant.followers_count ?? 0) : 0;
  const avgRating = merchant != null ? (merchant.avg_rating != null ? Number(merchant.avg_rating) : null) : null;

  if (isLoading && !merchant) {
    return (
      <>
        <Helmet>
          <title>{isRTL ? "التاجر" : "Merchant"} - {isRTL ? "البطاقات" : "Cards"}</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (!companyId || (!isLoading && !merchant)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "التاجر غير موجود" : "Merchant not found"}
          </h2>
          <button
            onClick={() => navigate("/cards")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isRTL ? "العودة للبطاقات" : "Back to Cards"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {merchantName} - {isRTL ? "البطاقات" : "Cards"}
        </title>
        <link rel="canonical" href={`https://mukafaat.com/cards/${companyId}`} />
      </Helmet>

      {/* Header - مثل صفحة تصنيف العروض */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        {coverImage ? (
          <div className="absolute inset-0">
            <img
              src={coverImage}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-[#1D0843]/80" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-primary opacity-30" />
        )}
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          <button
            onClick={() => navigate("/cards")}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex-shrink-0 ring-2 ring-white/30">
              <img
                src={merchantLogo}
                alt={merchantName}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {merchantName}
            </h1>
          </div>

          <p className="text-white/80 text-lg mb-4">
            {isRTL
              ? `تصفح بطاقات ${merchantName}`
              : `Browse ${merchantName} cards`}
          </p>

          <div className="flex items-center justify-center gap-4 text-white/70 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {followersCount} {isRTL ? "متابع" : "followers"}
            </span>
            {avgRating != null && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                ★ {avgRating}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center text-sm md:text-base">
            <Link to="/" className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs">
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link to="/cards" className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs">
              {isRTL ? "البطاقات" : "Cards"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <span className="text-[#fd671a] font-medium text-xs">{merchantName}</span>
          </div>
        </div>

        <div className="absolute -bottom-10 transform z-9">
          <img src={AboutPattern} alt="" className="w-full h-96 animate-float" />
        </div>
      </section>

      <section className="container mx-auto md:py-10 py-6 px-4">
        {/* Toolbar: عدد النتائج + بحث + عرض شبكة/قائمة */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="text-sm text-gray-600">
            <h2 className="text-[#400198] text-3xl font-bold">
              {search ? filteredCards.length : totalFromApi}
            </h2>
            <span className={isRTL ? "" : "ml-1"}>
              {isRTL ? "بطاقة" : "cards"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={
                isRTL ? `البحث في بطاقات ${merchantName}...` : `Search ${merchantName} cards...`
              }
              className="flex-1 min-w-[200px] max-w-md px-5 py-3 rounded-full font-medium text-sm shadow-md bg-white text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
            />
            <div className="flex bg-white border border-gray-200 rounded-full shadow-md p-1">
              <button
                type="button"
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
                type="button"
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

        {/* البطاقات المميزة */}
        {featuredCards.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#400198] mb-4">
              {isRTL ? "بطاقات مميزة" : "Featured Cards"}
            </h3>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid grid-cols-1 gap-6"
              }
            >
              {featuredCards.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  companyId={offer.companyId}
                  categories={categoryItems}
                />
              ))}
            </div>
          </div>
        )}

        {/* قائمة البطاقات */}
        {filteredCards.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid grid-cols-1 gap-6"
            }
          >
            {filteredCards.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                companyId={offer.companyId}
                categories={categoryItems}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              {search
                ? isRTL
                  ? `لم يتم العثور على بطاقات لـ "${search}"`
                  : `No cards found for "${search}"`
                : isRTL
                  ? "لا توجد بطاقات لهذا التاجر"
                  : "No cards for this merchant"}
            </p>
          </div>
        )}

        {/* Pagination - من الـ API */}
        {lastPage > 1 && !search && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={apiCurrentPage <= 1}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRTL ? "السابق" : "Previous"}
            </button>
            <span className="px-4 py-2 text-gray-700">
              {apiCurrentPage} / {lastPage}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
              disabled={apiCurrentPage >= lastPage}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRTL ? "التالي" : "Next"}
            </button>
          </div>
        )}
      </section>

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default MerchantCardsPage;
