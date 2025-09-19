import { PageHeader } from "@components";
import { useIsRTL, useGetUpcomingProjects } from "@hooks";
import { GetStarted } from "@pages/home/components";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiMapPin } from "react-icons/fi";

// Interface for Project data from API
interface Project {
  id: number;
  title: string;
  image: string;
  city: {
    id: number;
    arName: string;
    enName: string;
  };
  country: {
    id: number;
    arName: string;
    enName: string;
  };
  tags?: Tag[];
}

// Interface for Tag data from API
interface Tag {
  id: number;
  arTitle: string;
  enTitle: string;
}

const ProjectsPage = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  const categories = useMemo(
    () => [
      { key: "All", label: t("portfolio.tabs.all") },
      { key: "Events", label: t("portfolio.tabs.events") },
      { key: "Promotion", label: t("portfolio.tabs.promotion") },
      { key: "Logistic", label: t("portfolio.tabs.logistic") },
    ],
    [t]
  );

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 9;

  // Get Upcoming Projects from API
  const { projects, isFetching, hasNextPage, fetchNextPage } =
    useGetUpcomingProjects({
      currentPage: currentPage,
      perPage: perPage,
    });

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    if (!search) return projects;

    return projects.filter((project: Project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  return (
    <>
      <Helmet>
        <title>{t("projects.upcoming_projects")}</title>
        <link rel="canonical" href="https://mukafaat.com/projects" />
        <meta
          name="description"
          content="Explore exciting opportunities at Mukafaat."
        />
        <meta property="og:title" content={t("projects.upcoming_projects")} />
        <meta
          property="og:description"
          content="Explore exciting opportunities at Mukafaat."
        />
      </Helmet>
      <PageHeader
        title="projects.upcoming_projects"
        description="projects.upcoming_projects_description"
      />
      <section className="container mx-auto md:p-10 p-6 portfolio-mobile">
        {/* Filters + Search */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3 style-portfolio-button-mobile-container">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setCurrentPage(1);
                }}
                className={`style-portfolio-button-mobile px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 border-2 ${
                  activeCategory === cat.key
                    ? "bg-white text-[#fd671a] border-purple-600 shadow-sm"
                    : "bg-white/60 text-gray-700 border-gray-200 hover:bg-white"
                }`}
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
              placeholder={t("portfolio.searchPlaceholder")}
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
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProjects.map((project: Project) => (
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
                        {project.tags.slice(0, 3).map((tag: Tag) => (
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
                ? t("projects.noProjectsFound", { search: search })
                : t("projects.empty")}
            </p>
          </div>
        )}

        {/* Load More Button */}
        {!isFetching && hasNextPage && (
          <div className="text-center mt-10">
            <button
              onClick={() => fetchNextPage()}
              className="px-8 py-3 bg-gradient-to-r from-[#fd671a] to-[#C13899] text-white font-semibold rounded-md hover:opacity-90 transition-all duration-300"
            >
              {t("home.portfolio.see-more") || "See More"}
            </button>
          </div>
        )}

        {/* Loading More Indicator */}
        {isFetching && currentPage > 1 && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-500 mt-4">Loading more projects...</p>
          </div>
        )}
      </section>

      <GetStarted />
    </>
  );
};

export default ProjectsPage;
