import CardsHero from "./components/CardsHero";
import { useIsRTL } from "@hooks";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { FiStar, FiEye, FiDownload } from "react-icons/fi";
import { cardCategories, getCompaniesByCategory } from "@data/cards";
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
  Cards11,
  Cards12,
  Cards13,
  Cards14,
} from "@assets";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { BsHeart, BsShare } from "react-icons/bs";

const CardsPage = () => {
  const isRTL = useIsRTL();

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const perPage = 9;

  // Function to get card image
  const getCardImage = (logoName: string) => {
    // If it's already a URL, return it directly
    if (logoName.startsWith("http")) {
      return logoName;
    }

    // Otherwise, use the local images
    switch (logoName) {
      case "Cards1":
        return Cards1;
      case "Cards2":
        return Cards2;
      case "Cards3":
        return Cards3;
      case "Cards4":
        return Cards4;
      case "Cards5":
        return Cards5;
      case "Cards6":
        return Cards6;
      case "Cards7":
        return Cards7;
      case "Cards8":
        return Cards8;
      case "Cards11":
        return Cards11;
      case "Cards12":
        return Cards12;
      case "Cards13":
        return Cards13;
      case "Cards14":
        return Cards14;
      default:
        return Cards1;
    }
  };

  // Get companies based on selected category
  const filteredCompanies = useMemo(() => {
    let companies = getCompaniesByCategory(selectedCategory);

    if (search) {
      companies = companies.filter(
        (company) =>
          company.name[isRTL ? "ar" : "en"]
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          company.description[isRTL ? "ar" : "en"]
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    return companies;
  }, [selectedCategory, search, isRTL]);

  const totalPages = Math.ceil(filteredCompanies.length / perPage) || 1;
  const startIdx = (currentPage - 1) * perPage;
  const paginated = filteredCompanies.slice(startIdx, startIdx + perPage);

  return (
    <>
      <Helmet>
        <title>{isRTL ? "البطاقات" : "Cards"}</title>
        <link rel="canonical" href="https://mukafaat.com/cards" />
      </Helmet>
      <CardsHero />

      <section className="container mx-auto md:p-10 p-6 portfolio-mobile">
        {/* Filters + Search */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3 style-portfolio-button-mobile-container">
            {cardCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setSelectedCategory(category.key);
                  setCurrentPage(1);
                }}
                className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                  category.key === selectedCategory
                    ? "bg-[#400198] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {isRTL ? category.ar : category.en}
              </button>
            ))}
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={isRTL ? "البحث في البطاقات..." : "Search cards..."}
              className="w-full px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paginated.map((company) => (
              <div
                key={company.id}
                className="relative overflow-hidden rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-700 ease-out cursor-pointer"
                onClick={() => (window.location.href = `/cards/${company.id}`)}
              >
                {/* Company Card Background */}
                <div className="w-full h-64 relative overflow-hidden">
                  {/* Card Image */}
                  <img
                    src={getCardImage(company.logo)}
                    alt={company.name[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                </div>

                {/* Card Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-4 flex items-end h-full">
                  <div className="p-0 text-white w-full">
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200">
                        <BsShare className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200">
                        <BsHeart className="text-sm" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">
                      {company.name[isRTL ? "ar" : "en"]}
                    </h3>
                    <div className="text-sm opacity-90 mt-1">
                      {company.description[isRTL ? "ar" : "en"]}
                    </div>

                    {/* Stats and Offers Count */}
                    <div className="flex items-center justify-between mt-1 text-xs text-white/80">
                      <div className="flex items-center gap-2 text-white/90 text-sm mt-2">
                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                          {isRTL ? company.category.ar : company.category.en}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400" />
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye />
                          <span>
                            {company.offers.reduce(
                              (sum, offer) => sum + offer.views,
                              0
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiDownload />
                          <span>
                            {company.offers.reduce(
                              (sum, offer) => sum + offer.downloads,
                              0
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-white/70">
                        {isRTL
                          ? `${company.offers.length} عروض`
                          : `${company.offers.length} offers`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                ? "لا توجد بطاقات متاحة"
                : "No cards available"}
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

      <GetStartedSection className="mt-16 mb-28 " />
    </>
  );
};

export default CardsPage;
