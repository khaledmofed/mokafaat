import { useParams, Link } from "react-router-dom";
import { useIsRTL } from "@hooks";
import useGetQuery from "@hooks/api/useGetQuery";
import { AboutPattern } from "@assets";
import { FiMapPin } from "react-icons/fi";
import { GetStarted } from "@pages/home/components";
import { PeopleIcon, BriefcaseIcon, SliderIcon } from "@assets";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { t } from "i18next";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { LoadingSpinner } from "@components";

// Interface for Project data from API
interface Project {
  id: number;
  title: string;
  image: string;
  description?: string;
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

const PortfolioDetailsHero = ({ title }: { title: string }) => {
  // const isRTL = useIsRTL();
  return (
    <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[140px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30" />
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1 className="font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl mb-2 text-white">
          {title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-xs">
          <Link to="/" className="text-white hover:text-purple-300">
            {t("home.navbar.home")}
          </Link>
          <span className="text-white">|</span>
          <Link to="/portfolio" className="text-white hover:text-purple-300">
            {t("home.navbar.portfolio")}
          </Link>
          <span className="text-white">|</span>
          <span className="text-purple-300">{title}</span>
        </div>
      </div>
      <div className="absolute -bottom-10 transform z-9">
        <img
          src={AboutPattern}
          alt="Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

const PortfolioDetailsPage = () => {
  const { slug } = useParams();
  const isRTL = useIsRTL();

  // Get project data from API using the slug as projectId
  const {
    data: projectResponse,
    isSuccess: isProjectSuccess,
    isLoading: isProjectLoading,
  } = useGetQuery({
    endpoint: API_ENDPOINTS.getProject(slug || ""),
  });

  // Console log to see the API response structure
  console.log("Project Details API Response:", projectResponse);
  console.log("Project Details Data:", projectResponse?.data?.project);
  console.log("Project Details Success:", isProjectSuccess);

  const project: Project | null = projectResponse?.data?.project || null;

  if (isProjectLoading) {
    return (
      <>
        <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[140px] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary opacity-30" />
          <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
            <h1 className="font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl mb-2 text-white">
              Loading project details...
            </h1>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <Link to="/" className="text-white hover:text-purple-300">
                {t("home.navbar.home")}
              </Link>
              <span className="text-white">|</span>
              <Link
                to="/portfolio"
                className="text-white hover:text-purple-300"
              >
                {t("home.navbar.portfolio")}
              </Link>
              <span className="text-white">|</span>
              <span className="text-purple-300">
                Loading project details...
              </span>
            </div>
          </div>
          <div className="absolute -bottom-10 transform z-9">
            <img
              src={AboutPattern}
              alt="Pattern"
              className="w-full h-96 animate-float"
            />
          </div>
        </section>

        <div className="container mx-auto p-10">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Loading project details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto p-10">
        <p className="text-center text-red-600">
          {t("portfolio.details.notFound") || "Project not found"}
        </p>
      </div>
    );
  }

  return (
    <>
      {(() => {
        const heroTitle = project.title;
        return <PortfolioDetailsHero title={heroTitle} />;
      })()}

      <section className="container mx-auto md:p-10 p-6">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative w-full h-1/2 aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-md">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="flex items-center gap-3 mt-16 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-6 text-sm">
            <FiMapPin />
            <span>
              {isRTL
                ? `${project.city.arName}, ${project.country.arName}`
                : `${project.city.enName}, ${project.country.enName}`}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-16">
            {project.description ||
              t("portfolio.details.noDescription") ||
              "No description available"}
          </p>
          {/* <p className="text-gray-700 leading-relaxed mb-16">
            {t("portfolio.details.generalDescription")}
          </p> */}
          {/* Everything is special */}
          <h4 className="text-[#fd671a] font-semibold text-sm mb-2">
            {t("portfolio.details.everythingSpecial")}
          </h4>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t("portfolio.details.whatWeDid")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { icon: PeopleIcon, title: t("portfolio.details.freelancer") },
              {
                icon: BriefcaseIcon,
                title: t("portfolio.details.eventManagement"),
              },
              {
                icon: SliderIcon,
                title: t("portfolio.details.eventSystemSolutions"),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-md bg-[#F5F5F5] px-6 py-4 flex flex-col items-start gap-10 shadow-sm hover:shadow transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center ">
                  <img src={card.icon} alt={card.title} className="w-7 h-7" />
                </div>
                <div className="text-gray-900 font-semibold leading-tight">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
          {/* Share and Tags */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-900 font-semibold">
                {t("portfolio.details.shareProject")}
              </span>
              <div className="flex items-center gap-3 text-gray-600">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-900 font-semibold">
                {t("portfolio.details.tags")}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map((tag: Tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 rounded-md bg-[#F5F5F5] text-gray-700 text-xs font-medium"
                    >
                      {isRTL ? tag.arTitle : tag.enTitle}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 rounded-md bg-gray-200 text-gray-500 text-xs font-medium">
                    {t("portfolio.details.noTags") || "No tags available"}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-14">
            <div>
              <div className="text-md font-semibold mb-2">
                {t("portfolio.details.titleOfNextProject") || "Next Project"}
              </div>
              <button className="px-5 py-2 rounded-md bg-gray-200 text-gray-500 text-sm cursor-not-allowed">
                {t("common.next") || "Next"}
              </button>
            </div>
            <div className="text-right">
              <div className="text-md font-semibold mb-2">
                {t("portfolio.details.titleOfProject") || "Previous Project"}
              </div>
              <button className="px-5 py-2 rounded-md bg-gray-200 text-gray-500 text-sm cursor-not-allowed">
                {t("common.previous") || "Previous"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <GetStarted />
    </>
  );
};

export default PortfolioDetailsPage;
