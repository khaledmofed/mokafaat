import { LoadingSpinner, PageHeader } from "@components";
import { Filter, Jobs, LookingForJobAd } from "./components";
import { t } from "i18next";
import { DepartmentModel, DropdownModel, JobModel } from "@entities";
import { useEffect, useMemo, useState } from "react";
import { useIsRTL } from "@hooks";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import useGetPaginationQuery from "@hooks/api/useGetPaginationQuery";
import { Helmet } from "react-helmet-async";

function CareersPage() {
  const isRTL = useIsRTL();
  const [city, setCity] = useState<DropdownModel | null>(null);
  const [department, setDepartment] = useState<DepartmentModel | null>(null);
  const [workType, setWorkType] = useState<DropdownModel | null>(null);
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const jobsEndpoint = useMemo(() => {
    const cityId = city?.id || "";
    const departmentId = department?.id || "";
    const workTypeId = workType?.id || "";
    return `${API_ENDPOINTS.getJobs}?cityId=${cityId}&departmentId=${departmentId}&workTypeId=${workTypeId}&`;
  }, [city, department, workType]);

  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetPaginationQuery({
    endpoint: jobsEndpoint,
    query: "getJobs",
    perPage: 9,
  });

  useEffect(() => {
    if (isSuccess && data?.pages) {
      const allJobs = data.pages.flatMap((pageData) => pageData.jobs);
      setJobs(allJobs);
    } else {
      setJobs([]);
    }
  }, [data, isSuccess]);

  const handleOnSearchButtonSubmit = async () => await refetch();

  return (
    <>
      <Helmet>
        <title>{t("home.navbar.apply-for-job")}</title>
        <link rel="canonical" href="https://mukafaat.com/careers" />
        <meta
          name="description"
          content="Explore exciting career opportunities at Mukafaat."
        />
        <meta property="og:title" content={t("home.navbar.apply-for-job")} />
        <meta
          property="og:description"
          content="Explore exciting career opportunities at Mukafaat."
        />
      </Helmet>
      <PageHeader
        title="home.navbar.apply-for-job"
        description="careers.header-description"
      />
      <div className="careers container md:p-10 p-6 mx-auto w-full">
        <Filter
          isRTL={isRTL}
          city={city}
          department={department}
          workType={workType}
          isLoading={isLoading}
          onCityChange={(city) => setCity(city)}
          onDepartmentChange={(department) => setDepartment(department)}
          onWorkTypeChange={(workType) => setWorkType(workType)}
          onSearchSubmit={handleOnSearchButtonSubmit}
        />
        <Jobs jobs={jobs} isLoading={isLoading} hasNextData={hasNextPage} />

        {hasNextPage && (
          <h6
            onClick={() => fetchNextPage()}
            className="text-center capitalize font-bold underline wow fadeInUp cursor-pointer my-10"
            data-wow-delay="0.3s"
          >
            {isFetching ? <LoadingSpinner /> : t("home.portfolio.see-more")}
          </h6>
        )}
      </div>
      <LookingForJobAd />
    </>
  );
}

export default CareersPage;
