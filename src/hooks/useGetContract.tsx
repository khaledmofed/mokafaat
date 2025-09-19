import { ContractModel } from "@entities";
import { useEffect, useState } from "react";
import useGetQuery from "./api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";

const useGetContract = (contractId: string) => {
  const [contractData, setContractData] = useState<ContractModel | null>(null);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getContract(contractId || ""),
  });

  useEffect(() => {
    const contract = data?.data?.contract;
    if (isSuccess && data?.status && contract) {
      setContractData(contract);
    }
  }, [isSuccess, data]);

  return { contractData, isLoading, isSuccess };
};

export default useGetContract;
