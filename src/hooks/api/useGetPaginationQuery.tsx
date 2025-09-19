import { useInfiniteQuery } from "@tanstack/react-query";
import { APIGetPaginationMidellware } from "@network/middleware";
import { PaginationQueryProps } from "@interfaces";

const useGetPaginationQuery = ({
  endpoint,
  query,
  page,
  perPage,
}: PaginationQueryProps) => {
  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [query],
    queryFn: async ({ pageParam = page }) => {
      const response = await APIGetPaginationMidellware(endpoint, {
        page: pageParam,
        perPage: perPage,
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
  };
};

export default useGetPaginationQuery;
