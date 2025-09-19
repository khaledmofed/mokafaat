import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { useGetProjects } from "@hooks";
import { APP_ROUTES } from "@constants";

// Import portfolio images for fallback
import PortfolioEv1 from "@assets/portfolio/ev1.png";
import PortfolioEv2 from "@assets/portfolio/ev2.png";
import PortfolioEv3 from "@assets/portfolio/ev3.png";
import { ProjectsPattern } from "@assets";

interface ProjectCardProps {
  date: string;
  day: string;
  year: string;
  image: string;
  category: string;
  title: string;
  location: string;
  time: string;
  slug: string;
  tags?: Array<{ arTitle: string; enTitle: string }>;
  isRTL: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  date,
  day,
  year,
  image,
  category,
  title,
  location,
  time,
  slug,
  tags,
  isRTL,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className="group rounded-lg p-4 flex flex-col lg:flex-row items-start gap-4 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#342155f5] rounded-lg transition-all duration-300 group-hover:bg-[#34215594]">
        {/* Purple light spots */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-400/30 rounded-full blur-lg group-hover:bg-purple-300/40 transition-all duration-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-purple-300/25 rounded-full blur-md group-hover:bg-purple-200/35 transition-all duration-300"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-purple-500/20 rounded-full blur-sm group-hover:bg-purple-400/30 transition-all duration-300"></div>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center gap-4 w-full">
        {/* Image and Date Row for Mobile */}
        <div className="flex lg:hidden items-center gap-4 w-full center-mobile-justify">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-16 h-16 rounded-md object-cover animate-pulse-slow"
            />
          </div>
          {/* Date Column */}
          <div className="flex flex-col items-center text-white min-w-[50px]">
            <span className="text-xl font-bold text-purple-300">{date}</span>
            <span className="text-xs font-medium">{day}</span>
            <span className="text-xs font-medium">{year}</span>
          </div>
        </div>

        {/* Desktop Layout - Image and Date */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-20 h-20 rounded-md object-cover animate-pulse-slow"
            />
          </div>
          {/* Date Column */}
          <div className="flex flex-col items-center text-white min-w-[60px]">
            <span className="text-2xl font-bold text-purple-300">{date}</span>
            <span className="text-xs font-medium">{day}</span>
            <span className="text-xs font-medium">{year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full lg:w-auto">
          <div className="text-center lg:text-left">
            {tags && tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-[#1D0843] text-white text-xs px-3 py-1 rounded-full group-hover:bg-[#fd671a] transition-all duration-300"
                  >
                    {isRTL ? tag.arTitle : tag.enTitle}
                  </span>
                ))}
              </div>
            ) : (
              <span className="inline-block bg-[#1D0843] text-white text-xs px-3 py-1 rounded-full mb-2 group-hover:bg-[#fd671a] transition-all duration-300">
                {category}
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row justify-start items-center lg:items-center text-white/80 text-sm gap-2 lg:gap-10 text-center lg:text-left">
            <h3 className="text-white font-bold text-base lg:text-lg mb-0">
              {title}
            </h3>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs lg:text-sm">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs lg:text-sm">{time}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(`${APP_ROUTES.portfolio}/${slug}`)}
          className="w-full lg:w-auto border border-white text-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-purple-900 transition-all duration-300 opacity-70 group-hover:opacity-100 text-center"
        >
          {t("common.moreDetails")}
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  // Fetch projects from API - get last 3 projects
  const { projects } = useGetProjects({
    currentPage: 1,
    perPage: 3,
  });

  // Format projects data for display
  const formattedProjects =
    projects?.slice(0, 3).map((project) => {
      // Parse date from project.startDate or use current date as fallback
      const projectDate = project.startDate
        ? new Date(project.startDate)
        : new Date();
      const day = projectDate.getDate().toString();
      const month = projectDate.toLocaleDateString("en-US", { month: "long" });
      const year = projectDate.getFullYear().toString();

      // Get category from project tags or use default
      const category =
        project.tags && project.tags.length > 0
          ? project.tags
              .map((tag) => (isRTL ? tag.arTitle : tag.enTitle))
              .join(", ")
          : isRTL
          ? t("portfolio.tabs.events", { defaultValue: "Events" })
          : "Events";

      // Get location from project city and country
      const location =
        project.city && project.country
          ? `${isRTL ? project.city.arName : project.city.enName}, ${
              isRTL ? project.country.arName : project.country.enName
            }`
          : isRTL
          ? t("locations.jaddahRiwais", { defaultValue: "جدة. شارع الرويس" })
          : "Jaddah. Alriwais St";

      // Use project image or fallback
      const image = project.image || PortfolioEv1;

      // Use project title or fallback
      const title =
        project.title ||
        (isRTL
          ? t("projectHelpers.sampleTitle", {
              defaultValue: "عرض ترويجي مباشر",
            })
          : "Project Title");

      // Generate slug from project ID
      const slug = project.id?.toString() || "project";

      return {
        date: day,
        day: isRTL ? t(`months.${month}`, { defaultValue: month }) : month,
        year: year,
        image: image,
        category: category,
        title: title,
        location: location,
        time: "09:30 AM-02:00 PM", // Default time since API doesn't provide it
        slug: slug,
        tags: project.tags,
        isRTL: isRTL,
      };
    }) || [];

  // Fallback to static data if no projects from API
  const displayProjects =
    formattedProjects.length > 0
      ? formattedProjects
      : [
          {
            date: "18",
            day: isRTL ? t("months.July", { defaultValue: "July" }) : "July",
            year: "2025",
            image: PortfolioEv1,
            category: isRTL
              ? t("portfolio.tabs.promotion", { defaultValue: "Promotion" })
              : "Promotion",
            title: isRTL
              ? t("projectHelpers.sampleTitle", {
                  defaultValue: "عرض ترويجي مباشر",
                })
              : "Five Nights at Freddy's",
            location: isRTL
              ? t("locations.jaddahRiwais", {
                  defaultValue: "جدة. شارع الرويس",
                })
              : "Jaddah. Alriwais St",
            time: "09:30 AM-02:00 PM",
            slug: "brand-awareness-drive",
            tags: [
              { arTitle: "ترويج", enTitle: "Promotion" },
              { arTitle: "مباشر", enTitle: "Direct" },
            ],
            isRTL: isRTL,
          },
          {
            date: "23",
            day: isRTL ? t("months.July", { defaultValue: "July" }) : "July",
            year: "2025",
            image: PortfolioEv2,
            category: isRTL
              ? t("portfolio.tabs.events", { defaultValue: "Events" })
              : "Event",
            title: isRTL
              ? t("projectHelpers.sampleTitle", {
                  defaultValue: "عرض ترويجي مباشر",
                })
              : "Five Nights at Freddy's",
            location: isRTL
              ? t("locations.jaddahRiwais", {
                  defaultValue: "جدة. شارع الرويس",
                })
              : "Jaddah. Alriwais St",
            time: "09:30 AM-02:00 PM",
            slug: "ceremonial-opening-night",
            tags: [
              { arTitle: "مناسبة", enTitle: "Ceremony" },
              { arTitle: "فتح", enTitle: "Opening" },
            ],
            isRTL: isRTL,
          },
          {
            date: "30",
            day: isRTL ? t("months.July", { defaultValue: "July" }) : "July",
            year: "2025",
            image: PortfolioEv3,
            category: isRTL
              ? t("portfolio.tabs.logistic", { defaultValue: "Logistic" })
              : "Logistic",
            title: isRTL
              ? t("projectHelpers.sampleTitle", {
                  defaultValue: "عرض ترويجي مباشر",
                })
              : "Five Nights at Freddy's",
            location: isRTL
              ? t("locations.jaddahRiwais", {
                  defaultValue: "جدة. شارع الرويس",
                })
              : "Jaddah. Alriwais St",
            time: "09:30 AM-02:00 PM",
            slug: "festival-logistics-ops",
            tags: [
              { arTitle: "توزيع", enTitle: "Distribution" },
              { arTitle: "مناولة", enTitle: "Handling" },
            ],
            isRTL: isRTL,
          },
        ];

  return (
    <section className="bg-[#1D0843] pt-12 pb-20 relative overflow-hidden projects-mobile">
      <div className={`absolute top-0  transform  z-0`}>
        <img
          src={ProjectsPattern}
          alt="App Pattern"
          className="w-3/5 h-auto animate-float"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-center lg:justify-between mt-8 mb-16`}
        >
          <div className="mb-6 lg:mb-0 ">
            <p className="text-purple-300 text-sm font-medium mb-2">
              {t("home.projects.subtitle")}
            </p>
            <h2 className="font-size-mobile-heading text-white text-4xl lg:text-4xl font-bold mb-0">
              {t("home.projects.title")}
            </h2>
          </div>
          <p
            className={`text-white/80 text-md max-w-2xl leading-relaxed ${
              isRTL ? "text-right" : "text-start"
            }`}
          >
            {t("home.projects.description")}
          </p>
          <div className="lg:text-right">
            <a
              href="/portfolio"
              className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              {t("common.viewAll")} →
            </a>
          </div>
        </div>
        {/* Projects Grid */}
        <div className="space-y-4">
          {displayProjects.map((project) => (
            <ProjectCard key={`${project.slug}-${project.date}`} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;
