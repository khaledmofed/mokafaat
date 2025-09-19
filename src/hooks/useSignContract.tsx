import { API_ENDPOINTS } from "@network/apiEndpoints";
import usePostRequest from "./api/usePostRequest";
import { useEffect, useState } from "react";

interface UseSignContractProps {
  contractFile: File | null;
  contractId: string | undefined;
}

export const useSignContract = ({
  contractFile,
  contractId,
}: UseSignContractProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setIsError] = useState<string | null>(null);

  const { mutate, data: response } = usePostRequest({
    endpoint: API_ENDPOINTS.signContract,
  });

  useEffect(() => {
    if (contractFile && contractId) {
      const data = {
        contract: contractFile,
        contractId,
      };
      mutate(data);
    }
  }, [contractFile, contractId, mutate]);

  useEffect(() => {
    if (response?.status) {
      setIsSuccess(!isSuccess);
    } else if (response?.status === false && response.message) {
      setIsError(response.message);
    }
  }, [response, error, isSuccess, error]);

  return { isSuccess, error };
};

export default useSignContract;
