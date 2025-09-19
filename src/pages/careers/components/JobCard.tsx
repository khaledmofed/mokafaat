import {
  JobLocation,
  JobDate,
  JobPaymentAmoutn,
  JobType,
  JobDepartment,
} from "@assets";
import DetailsGroup from "./DetailsGroup";
import { APP_ROUTES } from "@constants";
import { Link } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { JobModel } from "@entities";
import moment from "moment";
import { PrimaryGradientButton } from "@components";
import { t } from "i18next";

const JobCard = (props: { job: JobModel }) => {
  const { job } = props;
  const isRTL = useIsRTL();
  return (
    job && (
      <div
        className="job-card border border-gray-300 rounded-lg w-full md:p-8 p-4 flex md:flex-row flex-col items-center justify-start wow fadeInUp"
        data-wow-delay="0.2s"
      >
        <div className="job-content w-full md:w-5/6 mb-4 md:mb-0">
          <h1 className="font-bold md:text-2xl text-xl mb-5 capitalize flex items-center gap-5">
            <Link to={`${APP_ROUTES.careers}/${job.id}`}>{job.title}</Link>
            <span
              className={`${
                job.status ? "bg-success text-success" : "bg-danger text-danger"
              } bg-opacity-15 p-2 rounded-lg text-sm text-center font-bold`}
            >
              {job.status ? t("job.open") : t("job.close")}
            </span>
          </h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
            <DetailsGroup
              icon={JobLocation}
              text={
                isRTL && job?.city.arName ? job?.city.arName : job?.city.enName
              }
            />
            <DetailsGroup
              icon={JobDate}
              text={moment(job.createdAt).fromNow()}
            />
            <DetailsGroup
              icon={JobPaymentAmoutn}
              text={`${job.paymentAmount} SAR`}
            />
            <DetailsGroup
              icon={JobType}
              text={
                isRTL && job?.workType.arName
                  ? job?.workType.arName
                  : job?.workType.enName
              }
            />
            <DetailsGroup
              icon={JobDepartment}
              text={
                isRTL && job?.department.arTitle
                  ? job?.department.arTitle
                  : job?.department.enTitle
              }
            />
          </div>
        </div>
        <div className="hidden md:block md:w-1/6" />
        {job.status && (
          <div className="block md:w-1/6 w-full">
            <PrimaryGradientButton
              to={`${APP_ROUTES.careers}/${job.id}`}
              className="w-full text-center"
              visibility="flex"
            >
              {t("careers.ad.apply")}
            </PrimaryGradientButton>
          </div>
        )}
      </div>
    )
  );
};

export default JobCard;
