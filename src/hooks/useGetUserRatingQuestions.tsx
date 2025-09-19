import { RatingUserQuestionsModel } from "@entities";
import { useEffect, useState } from "react";
import useGetQuery from "./api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";

export const useGetUserRatingQuestions = (userId: string | undefined) => {
  const [ratingQuestions, setRatingQuestions] =
    useState<RatingUserQuestionsModel | null>(null);
  const [hasError, setHasError] = useState(false);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getRatingQuestions(parseInt(userId || "")),
  });

  useEffect(() => {
    if (isSuccess && data?.status && data?.data) {
      setHasError(false);
      setRatingQuestions(data.data);
    } else if (data && data.status === false && data.message) {
      setRatingQuestions(null);
      setHasError(!hasError);
    }
  }, [isSuccess, data]);

  return { ratingQuestions, isLoading, hasError };
};
