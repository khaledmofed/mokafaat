import { useEffect, useState } from "react";
import usePostRequest from "./api/usePostRequest";
import { API_ENDPOINTS } from "@network/apiEndpoints";

const useUploadFreelancerIntroVideo = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequest({
    endpoint: API_ENDPOINTS.uploadFreelancerIntroVideo,
  });

  const upload = (email: string, video: File) => mutate({ email, video });

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

  return { upload, isPending, error, success, setError, setSuccess };
};

export default useUploadFreelancerIntroVideo;
