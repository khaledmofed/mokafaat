import {
  LoadingSpinner,
  PrimaryGradientButton,
  SuccessDangerToast,
} from "@components";
import { APP_ROUTES } from "@constants";
import { JobModel } from "@entities";
import useGetPaginationQuery from "@hooks/api/useGetPaginationQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import DetailsGroup from "@pages/careers/components/DetailsGroup";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  JobLocation,
  JobDate,
  JobPaymentAmoutn,
  JobType,
  JobDepartment,
} from "@assets";
import moment from "moment";

const HomeJobs = (props: { isRTL: boolean }) => {
  const { isRTL } = props;
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const titleFontType = isRTL
    ? "readex-pro text-3xl"
    : "font-nenu-condensed-bold text-7xl";

  const { data, isSuccess, isLoading, hasNextPage } = useGetPaginationQuery({
    endpoint: `${API_ENDPOINTS.getJobs}?cityId=&departmentId=&workTypeId=&`,
    query: "getHomeJobs",
    perPage: 3,
  });

  useEffect(() => {
    if (isSuccess && data?.pages) {
      const allJobs = data.pages.flatMap((pageData) => pageData.jobs);
      setJobs(allJobs);
    } else {
      setJobs([]);
    }
  }, [data, isSuccess]);

  return (
    <section
      id="jobs"
      className="jobs max-w-screen-xl mx-auto 
      md:py-10 md:px-4 px-6 py-6 flex flex-col gap-4"
    >
      <div className="top-info text-center w-full">
        <h1
          className={`mb-4 text-title ${titleFontType} font-bold uppercase wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("home.navbar.careers")}
        </h1>
      </div>

      {jobs.length == 0 || jobs[0] == null ? (
        <SuccessDangerToast
          Icon={BsInfoCircle}
          text={t("careers.no-jobs")}
          color="danger"
        />
      ) : (
        jobs.length > 0 && (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg wow fadeInUp"
              >
                <div className="job-content w-full md:w-5/6 mb-4 md:mb-0">
                  <h1 className="font-bold md:text-2xl text-xl mb-5 capitalize">
                    <Link to={`${APP_ROUTES.careers}/${job.id}`}>
                      {job.title}
                    </Link>
                  </h1>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <DetailsGroup
                      icon={JobLocation}
                      text={
                        isRTL && job?.city.arName
                          ? job?.city.arName
                          : job?.city.enName
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
                    <span
                      className={`${
                        job.status
                          ? "bg-success text-success"
                          : "bg-danger text-danger"
                      } bg-opacity-15 p-2 rounded-lg text-sm text-center font-bold`}
                    >
                      {job.status ? t("job.open") : t("job.close")}
                    </span>
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <PrimaryGradientButton
                    to={`${APP_ROUTES.careers}/${job.id}`}
                    className="w-full text-center"
                    visibility="flex"
                  >
                    {t("careers.ad.apply")}
                  </PrimaryGradientButton>
                </div>
              </div>
            ))}
            {hasNextPage && (
              <div className="col-span-full">
                <Link
                  to={APP_ROUTES.careers}
                  className="text-center block capitalize font-bold underline wow fadeInUp cursor-pointer my-10"
                  data-wow-delay="0.3s"
                >
                  {t("home.portfolio.see-more")}
                </Link>
              </div>
            )}
          </div>
        )
      )}

      {isLoading && <LoadingSpinner />}
    </section>
  );
};

export default HomeJobs;
