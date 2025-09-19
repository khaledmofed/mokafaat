import { t } from "i18next";

const ExperienceFormButtoon = (props: { handleSubmit: () => void }) => {
  return (
    <button
      onClick={props.handleSubmit}
      className="border border-title p-3.5 rounded-md h-auto text-sm"
      type="button"
    >
      {t("job-application.add")}
    </button>
  );
};

export default ExperienceFormButtoon;
