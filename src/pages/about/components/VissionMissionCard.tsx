import { t } from "i18next";
import { ReactSVG } from "react-svg";

const VissionMissionCard = (props: any) => {
  return (
    <div className={`bg-primary bg-opacity-${props.opacity} p-14`}>
      <ReactSVG
        src={`${props.icon}`}
        className="mb-5 wow fadeInUp"
        data-wow-delay="0.2s"
      />
      <h1
        className="text-primary font-bold text-2xl mb-3 capitalize wow fadeInUp"
        data-wow-delay="0.3s"
      >
        {t(`${props.title}`)}
      </h1>
      <p
        className="text-sub-title font-normal text-sm wow fadeInUp"
        data-wow-delay="0.3s"
      >
        {t(`${props.description}`)}
      </p>
    </div>
  );
};

export default VissionMissionCard;
