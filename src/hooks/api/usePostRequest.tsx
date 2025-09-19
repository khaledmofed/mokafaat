import { useMutation } from "@tanstack/react-query";
import { APIPostMidellware } from "@network/middleware";
import { ResponseModel } from "@entities";

const usePostRequest = <TPayload = unknown, TResult = ResponseModel>(props: {
  endpoint: string;
  hasHeaders?: boolean;
}) => {
  const { endpoint, hasHeaders } = props;

  const mutation = useMutation<TResult, unknown, TPayload>({
    mutationKey: [endpoint],
    mutationFn: async (data: TPayload) => {
      const response = await APIPostMidellware(endpoint, data, {
        headers: hasHeaders ? { "Content-Type": "multipart/form-data" } : {},
      });
      return response.data as TResult;
    },
  });

  const { mutate, data, isPending, error, isError, isSuccess } = mutation;

  return { mutate, data, isPending, error, isError, isSuccess };
};

export default usePostRequest;
