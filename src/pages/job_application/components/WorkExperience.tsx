import ExperienceForm from "./ExperienceForm";
import { Experience } from "@interfaces";
import ExperienceTable from "./ExperienceTable";
import { t } from "i18next";

const WorkExperience = (props: {
  experiences: Experience[];
  onExperiencesChange: (experiences: Experience[]) => void;
}) => {
  const { experiences, onExperiencesChange } = props;

  const handleSubmitAddButton = (experience: Experience) => {
    onExperiencesChange([...experiences, experience]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    onExperiencesChange(updatedExperiences);
  };

  return (
    <div
      className="work-experience border border-gray-200 rounded-lg p-6 flex flex-col gap-4 wow fadeInUp bg-[#f9fafb]"
      data-wow-delay="0.2s"
    >
      <div
        className="application-title font-bold capitalize wow fadeInUp"
        data-wow-delay="0.2s"
      >
        {t("job-application.experience")}
      </div>
      <ExperienceForm
        handleSubmitAddButton={(experience) =>
          handleSubmitAddButton(experience)
        }
      />

      <ExperienceTable
        experiences={experiences}
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
};

export default WorkExperience;
