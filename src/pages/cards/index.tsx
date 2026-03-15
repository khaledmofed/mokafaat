import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CardsHero from "./components/CardsHero";
import CardsCategorySection from "./components/CardsCategorySection";
import CardsSliderSection from "./components/CardsSliderSection";
import { useIsRTL } from "@hooks";
import { Helmet } from "react-helmet-async";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { useCardsHome } from "@hooks/api/useMokafaatQueries";
import {
  mapApiHomeCardsToOffers,
  type CardOfferWithCompanyId,
} from "@network/mappers/cardsMapper";
import { LoadingSpinner } from "@components/LoadingSpinner";

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

  const { data: cardsHomeResponse, isLoading } = useCardsHome();

  const data = useMemo(() => {
    const res = cardsHomeResponse as Record<string, unknown> | undefined;
    return (res?.data as Record<string, unknown>) ?? null;
  }, [cardsHomeResponse]);

  const categories = useMemo((): ApiCategory[] => {
    const arr = data?.categories as ApiCategory[] | undefined;
    return Array.isArray(arr) ? arr : [];
  }, [data]);

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
    const arr = data?.merchants as ApiMerchant[] | undefined;
    return Array.isArray(arr) ? arr : [];
  }, [data]);

  const latestCards = useMemo((): CardOfferWithCompanyId[] => {
    const arr = data?.latest_cards as
      | Array<Record<string, unknown>>
      | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [data]);

  const topSellingCards = useMemo((): CardOfferWithCompanyId[] => {
    const arr = data?.top_selling_cards as
      | Array<Record<string, unknown>>
      | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [data]);

  const mostViewedCards = useMemo((): CardOfferWithCompanyId[] => {
    const arr = data?.most_viewed_cards as
      | Array<Record<string, unknown>>
      | undefined;
    return mapApiHomeCardsToOffers(Array.isArray(arr) ? arr : []);
  }, [data]);

  const filterByCategory = useCallback(
    (list: CardOfferWithCompanyId[]) => {
      if (selectedCategoryId === "all") return list;
      const catId = Number(selectedCategoryId);
      if (!catId) return list;
      return list.filter((item) => item.categoryId === catId);
    },
    [selectedCategoryId],
  );

  const filteredLatest = useMemo(
    () => filterByCategory(latestCards),
    [filterByCategory, latestCards],
  );
  const filteredTopSelling = useMemo(
    () => filterByCategory(topSellingCards),
    [filterByCategory, topSellingCards],
  );
  const filteredMostViewed = useMemo(
    () => filterByCategory(mostViewedCards),
    [filterByCategory, mostViewedCards],
  );

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
        cards={filteredLatest}
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
        cards={filteredTopSelling}
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
        cards={filteredMostViewed}
        isLoading={isLoading}
        categories={categoryItems}
      />

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default CardsPage;
