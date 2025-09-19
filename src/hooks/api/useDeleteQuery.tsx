import { useMutation } from "@tanstack/react-query";
import { APIDeleteMidellware } from "@network/middleware";
import { ResponseModel } from "@entities";

const useDeleteQuery = (props: { endpoint: string }) => {
  const { endpoint } = props;

  const mutation = useMutation<ResponseModel, unknown, { id?: number }>({
    mutationKey: [endpoint],
    mutationFn: async ({ id }) => {
      const result = await APIDeleteMidellware(endpoint, { id });
      return result.data;
    },
  });

  const { mutate, data, isPending, error, isError, isSuccess } = mutation;

  return { mutate, data, isPending, error, isError, isSuccess };
};

export default useDeleteQuery;
