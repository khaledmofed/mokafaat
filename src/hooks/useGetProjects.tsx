import { ProjectDto } from "@entities";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { useEffect, useMemo, useState } from "react";
import useGetPaginationQuery from "./api/useGetPaginationQuery";

interface UseGetProjectsProps {
  currentPage: number;
  perPage: number;
}

const useGetProjects = ({ currentPage, perPage }: UseGetProjectsProps) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const projectsEndpoint = useMemo(() => {
    return API_ENDPOINTS.getProjects;
  }, []);

  const { data, isSuccess, isFetching, hasNextPage, refetch, fetchNextPage } =
    useGetPaginationQuery({
      endpoint: projectsEndpoint,
      query: "getProjects",
      page: currentPage,
      perPage: perPage,
    });

  useEffect(() => {
    if (isSuccess && data?.pages && data?.pages?.length > 0) {
      const firstPage = data.pages[0];
      const allProjects = data.pages.flatMap((pageData) => pageData.projects);
      setProjects(allProjects);
      if (firstPage && firstPage.projects) {
        setTotalRecords(firstPage.totalItems);
      }
    }
  }, [data, isSuccess]);

  return {
    projects,
    totalRecords,
    isFetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  };
};

export default useGetProjects;
