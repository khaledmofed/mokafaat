import { useEffect, useState } from "react";
import usePostRequestWithData from "./api/usePostRequestWithData";
import { API_ENDPOINTS } from "@network/apiEndpoints";

const useVerifyOtp = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequestWithData({
    endpoint: API_ENDPOINTS.verifyOtp,
  });

  const verify = (email: string, otpCode: string) => mutate({ email, otpCode });

  useEffect(() => {
    if (response?.status !== undefined && response.message) {
      if (response.status) {
        setError(null);
        setSuccess(true);
      } else {
        setError(response.message);
        setSuccess(false);
      }
    }
  }, [response]);

  return { verify, isPending, error, success, setError, setSuccess };
};

export default useVerifyOtp;
