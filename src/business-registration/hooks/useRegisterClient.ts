import usePostRequestWithData from "@hooks/api/usePostRequestWithData";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { useEffect, useState } from "react";

const useRegisterClient = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequestWithData({
    endpoint: API_ENDPOINTS.businessRegistration,
  });

  const register = (data: any) => mutate(data);

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

  return {
    register,
    isPending,
    success,
    error,
    setError,
    setSuccess,
  };
};

export default useRegisterClient;
