import { useQuery } from "@tanstack/react-query";
import { APIGetMidellware } from "@network/middleware";
import { ResponseModel } from "@entities";

const useGetQuery = (props: { endpoint: string }) => {
  const { endpoint } = props;

  const { data, isLoading, error, isError, isSuccess, refetch } = useQuery<
    ResponseModel,
    unknown,
    ResponseModel
  >({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await APIGetMidellware(endpoint, {});
      return response;
    },
  });

  return { data, isLoading, error, isError, isSuccess, refetch };
};

export default useGetQuery;
