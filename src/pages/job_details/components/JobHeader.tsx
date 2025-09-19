import DetailsGroup from "../../careers/components/DetailsGroup";
import {
  JobLocation,
  JobDate,
  JobPaymentAmoutn,
  JobType,
  JobDepartment,
} from "@assets";
import { JobModel } from "@entities";
import moment from "moment";
import { t } from "i18next";

const JobHeader = (props: { isRTL: boolean; job: JobModel }) => {
  const { isRTL, job } = props;

  return (
    <div className="job-header">
      <h1
        className="font-bold md:text-2xl text-xl mb-5 wow fadeInUp capitalize flex items-center gap-5"
        data-wow-delay="0.2"
      >
        {job.title}

        <span
          className={`${
            job.status ? "bg-success text-success" : "bg-danger text-danger"
          } bg-opacity-15 p-2 rounded-lg text-sm text-center font-bold`}
        >
          {job.status ? t("job.open") : t("job.close")}
        </span>
      </h1>
      <div
        className="flex md:flex-row flex-col gap-6 wow fadeInUp"
        data-wow-delay="0.3"
      >
        <DetailsGroup
          icon={JobLocation}
          text={isRTL && job?.city.arName ? job?.city.arName : job?.city.enName}
        />
        <DetailsGroup icon={JobDate} text={moment(job.createdAt).fromNow()} />
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
  );
};

export default JobHeader;
