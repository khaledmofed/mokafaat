import PortfolioHero from "./components/PortfolioHero";
import GetStarted from "../home/components/GetStarted";
import { useIsRTL, useGetProjects } from "@hooks";
import { Helmet } from "react-helmet-async";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { FiMapPin } from "react-icons/fi";

const PortfolioPage = () => {
  const isRTL = useIsRTL();

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 9;

  // Get Projects from API
  const { projects, isFetching } = useGetProjects({
    currentPage: currentPage,
    perPage: perPage,
  });

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    if (!search) return projects;

    return projects.filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const totalPages = Math.ceil(filteredProjects.length / perPage) || 1;
  const startIdx = (currentPage - 1) * perPage;
  const paginated = filteredProjects.slice(startIdx, startIdx + perPage);

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? t("home.navbar.portfolio") : t("home.navbar.portfolio")}
        </title>
        <link rel="canonical" href="https://mukafaat.com/portfolio" />
      </Helmet>
      <PortfolioHero />

      <section className="container mx-auto md:p-10 p-6 portfolio-mobile">
        {/* Filters + Search */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3 style-portfolio-button-mobile-container">
            {[
              { key: "All", label: t("portfolio.tabs.all") || "All" },
              { key: "Events", label: t("portfolio.tabs.events") || "Events" },
              {
                key: "Promotion",
                label: t("portfolio.tabs.promotion") || "Promotion",
              },
              {
                key: "Logistic",
                label: t("portfolio.tabs.logistic") || "Logistic",
              },
            ].map((cat) => (
              <button
                key={cat.key}
                className={`style-portfolio-button-mobile px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 border-2 ${
                  cat.key === "All"
                    ? "bg-white text-[#fd671a] border-purple-600 shadow-sm cursor-default"
                    : "bg-white/60 text-gray-700 border-gray-200 cursor-default opacity-50"
                }`}
                disabled
              >
                {cat.label}
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
              placeholder={
                t("portfolio.searchPlaceholder") || "Search projects..."
              }
              className="w-full rounded-md bg-gray-100 px-5 py-3 outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
        </div>

        {/* Grid */}
        {isFetching && currentPage === 1 ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="text-gray-500 mt-4 text-lg">{t("common.loading")}</p>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paginated.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden rounded-md shadow-lg group hover:shadow-2xl transition-all duration-700 ease-out cursor-pointer"
                onClick={() =>
                  (window.location.href = `/portfolio/${project.id}`)
                }
              >
                {/* Hover black overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                  <div className="p-5 text-white w-full">
                    <h3 className="text-lg font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm mt-2">
                      <FiMapPin />
                      <span>
                        {isRTL
                          ? `${project.city.arName}, ${
                              project.country?.arName || ""
                            }`
                          : `${project.city.enName}, ${
                              project.country?.enName || ""
                            }`}
                      </span>
                    </div>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm"
                          >
                            {isRTL ? tag.arTitle : tag.enTitle}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              {search
                ? `No projects found for "${search}"`
                : "No projects available"}
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

      <GetStarted />
    </>
  );
};

export default PortfolioPage;
