import { useMutation } from "@tanstack/react-query";
import { APIPostWithDataMidellware } from "@network/middleware";
import { ResponseModel } from "@entities";

const usePostRequestWithData = <
  TPayload = unknown,
  TResult = ResponseModel
>(props: {
  endpoint: string;
}) => {
  const { endpoint } = props;

  const mutation = useMutation<TResult, unknown, TPayload>({
    mutationKey: [endpoint],
    mutationFn: async (data: TPayload) => {
      const response = await APIPostWithDataMidellware(endpoint, data);
      return response as TResult;
    },
  });

  const { mutate, data, isPending, error, isError, isSuccess } = mutation;

  return { mutate, data, isPending, error, isError, isSuccess };
};

export default usePostRequestWithData;
