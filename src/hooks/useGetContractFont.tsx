import { useEffect, useState } from "react";
import useGetQuery from "./api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";

const useGetContractFont = () => {
  const [fontUint8Array, setFontUint8Array] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getContractFont,
  });

  useEffect(() => {
    if (isSuccess && data?.status && data?.data?.font) {
      const font = data.data.font;

      try {
        const byteCharacters = atob(font);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const newTemplateUint8Array = new Uint8Array(byteNumbers);
        setFontUint8Array(newTemplateUint8Array);
      } catch (error) {
        setError("Error decoding font");
      }
    }
  }, [isSuccess, data]);

  return { templateFont: fontUint8Array, isLoading, error };
};

export default useGetContractFont;
