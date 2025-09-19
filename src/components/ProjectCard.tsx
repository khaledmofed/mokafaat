import { ProjectDto } from "@entities";
import moment from "moment";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import PrimaryGradientButton from "./PrimaryGradientButton";
import { APP_ROUTES } from "@constants";
import { t } from "i18next";

interface ProjectCardProps {
  isRTL: boolean;
  project: ProjectDto;
}

const ProjectCard = ({ isRTL, project }: ProjectCardProps) => {
  return (
    <div className="border border-gray-300 rounded-lg wow fadeInUp">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="rounded-tr-lg rounded-tl-lg h-[150px] w-full object-cover object-center"
      />

      <div className="content flex flex-col gap-3 p-4">
        <h1 className="font-bold capitalize break-all">{project.title}</h1>

        <div className="flex items-center gap-23">
          <IoLocationOutline />
          <span className="text-sub-title text-xs">
            {isRTL && project?.city.arName
              ? project?.city.arName
              : project?.city.enName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineCalendarMonth />
          <span className="text-sub-title text-xs break-all">
            {`From ${moment(project.startDate).format(
              "YYYY-MM-DD"
            )} To ${moment(project.endDate).format("YYYY-MM-DD")}`}
          </span>
        </div>

        <PrimaryGradientButton
          to={APP_ROUTES.downloadApp}
          className="w-full text-center"
          visibility="flex"
        >
          {t("careers.ad.apply")}
        </PrimaryGradientButton>
      </div>
    </div>
  );
};

export default ProjectCard;
