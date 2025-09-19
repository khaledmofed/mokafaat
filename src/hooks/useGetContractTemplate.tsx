import { useEffect, useState } from "react";
import useGetQuery from "./api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";

const useGetContractTemplate = () => {
  const [templateUint8Array, setTemplateUint8Array] =
    useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getContractTemplate,
  });

  useEffect(() => {
    if (isSuccess && data?.status && data?.data?.template) {
      const template = data.data.template;

      try {
        const byteCharacters = atob(template);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const newTemplateUint8Array = new Uint8Array(byteNumbers);
        setTemplateUint8Array(newTemplateUint8Array);
      } catch (error) {
        setError("Error decoding template");
      }
    }
  }, [isSuccess, data]);

  return { template: templateUint8Array, isLoading, error };
};

export default useGetContractTemplate;
