import {
  ChangePageTitle,
  LoadingSpinner,
  PrimaryGradientButton,
  SuccessDangerToast,
} from "@components";
import { JobContent, JobHeader } from "./components";
import { useParams } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { JobModel } from "@entities";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { BsInfoCircle } from "react-icons/bs";
import { APP_ROUTES } from "@constants";

function JobDetailsPage() {
  ChangePageTitle({ pageTitle: "Job Title" });
  const { id } = useParams();
  const isRTL = useIsRTL();

  // Get AboutUs data directly in this component
  const { data: aboutUsData } = useGetQuery({
    endpoint: API_ENDPOINTS.getAboutUs,
  });

  const [job, setJob] = useState<JobModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: id ? `${API_ENDPOINTS.getJobs}/${id}` : "",
  });

  useEffect(() => {
    if (isSuccess) {
      if (data?.status) {
        if (data?.data?.job) {
          setJob(data.data.job);
          setError(null);
        } else {
          setError(data?.message ?? null);
        }
      } else {
        setError(data?.message ?? "An unknown error occurred.");
      }
    }
    console.log(data);
  }, [isSuccess, data]);

  return (
    <div
      className="job-details md:p-10 p-6 my-10 lg:mx-32 mx-6
     border border-gray-300 rounded-lg"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        job && (
          <div className="flex flex-col gap-10">
            <JobHeader isRTL={isRTL} job={job} />
            <JobContent
              className="about-company"
              title={t("job.aboutMukafaat")}
              text={
                isRTL && aboutUsData?.data?.aboutUs?.arWhoAreWe
                  ? aboutUsData.data.aboutUs.arWhoAreWe
                  : aboutUsData?.data?.aboutUs?.enWhoAreWe || "About Mukafaat"
              }
            />
            {job.description && (
              <JobContent
                className="job-description"
                title={t("job.description")}
                text={job.description}
              />
            )}

            {job.requirements && (
              <JobContent
                className="job-requirements"
                title={t("job.requirements")}
                text={job.requirements}
              />
            )}

            {job.status && (
              <div className="flex justify-center">
                <PrimaryGradientButton
                  to={`${APP_ROUTES.careers}/${job.id}/application`}
                  textTransform="uppercase"
                  className="font-bold w-full"
                  visibility="flex"
                >
                  {t("job.apply")}
                </PrimaryGradientButton>
              </div>
            )}
          </div>
        )
      )}

      {error && (
        <SuccessDangerToast Icon={BsInfoCircle} text={error} color="danger" />
      )}
    </div>
  );
}

export default JobDetailsPage;
