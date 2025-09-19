import { BsInfoCircle } from "react-icons/bs";
import JobCard from "./JobCard";
import { LoadingSpinner, SuccessDangerToast } from "@components";
import { t } from "i18next";
import { JobModel } from "@entities";

const Jobs = (props: {
  isLoading: boolean;
  jobs: JobModel[];
  hasNextData: boolean;
}) => {
  const { isLoading, jobs, hasNextData } = props;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (jobs.length == 0 || jobs[0] == null) {
    return (
      <SuccessDangerToast
        Icon={BsInfoCircle}
        text={t("careers.no-jobs")}
        color="danger"
      />
    );
  }

  return (
    <div className={`jobs flex flex-col gap-5 ${!hasNextData && "mb-20"}`}>
      {jobs.length > 0 &&
        jobs.map((job, index) => <JobCard key={index} job={job} />)}
    </div>
  );
};

export default Jobs;
