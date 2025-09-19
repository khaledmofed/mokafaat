import { LoadingSpinner, SuccessDangerToast } from "@components";
import ProjectCard from "@components/ProjectCard";
import { APP_ROUTES } from "@constants";
import { useGetProjects } from "@hooks";
import { t } from "i18next";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

interface LatestProjectsProps {
  isRTL: boolean;
}

const LatestProjects = ({ isRTL }: LatestProjectsProps) => {
  const titleFontType = isRTL
    ? "readex-pro text-2xl"
    : "font-nenu-condensed-bold text-4xl";

  const { projects, isFetching, hasNextPage } = useGetProjects({
    currentPage: 1,
    perPage: 3,
  });

  return (
    <section
      id="projects"
      className="projects max-w-screen-xl mx-auto 
  md:py-10 md:px-4 px-6 py-6 flex flex-col gap-4"
    >
      <div className="top-info text-center w-full">
        <h1
          className={`mb-4 text-title ${titleFontType} font-bold capitalize wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("projects.upcoming_projects")}
        </h1>
      </div>

      {isFetching && <LoadingSpinner />}

      {!isFetching && projects.length > 0 && (
        <div className="projects-items grid lg:grid-cols-3 grid-cols-1 gap-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} isRTL={isRTL} project={project} />
          ))}
        </div>
      )}

      {!isFetching && projects.length == 0 && (
        <SuccessDangerToast
          color="danger"
          text={t("projects.empty")}
          Icon={MdErrorOutline}
        />
      )}

      {!isFetching && hasNextPage && (
        <div className="col-span-full">
          <Link
            to={APP_ROUTES.projects}
            className="text-center block capitalize font-bold underline wow fadeInUp cursor-pointer my-5"
            data-wow-delay="0.3s"
          >
            {t("home.portfolio.see-more")}
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestProjects;
