import { t } from "i18next";
import { useEffect, useState } from "react";
import usePostRequestWithData from "./api/usePostRequestWithData";
import { API_ENDPOINTS } from "@network/apiEndpoints";

interface RatingData {
  userId: number;
  questions?: string;
  note?: string;
  fullName: string;
  mobileNumber: string;
}

const useRating = (userId: string | undefined) => {
  const [ratings, setRatings] = useState<{ [questionId: number]: number }>({});
  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(
    null
  );
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isRatingSuccess, setIsRatingSuccess] = useState(false);

  const handleRatingChange = (questionId: number, value: number | null) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionId]: value ?? 0,
    }));
  };

  const {
    mutate,
    data: response,
    isSuccess,
    isPending,
  } = usePostRequestWithData({
    endpoint: API_ENDPOINTS.submitRating,
  });

  const handleSubmit = () => {
    if (!userId || !Object.keys(ratings).length) {
      setError(t("rating.validation"));
      return;
    }

    if (fullName.trim().length == 0) {
      setFullNameError(t("validations.fullNameRequired"));
      return;
    } else {
      setFullNameError(null);
    }

    if (mobileNumber.trim().length == 0) {
      setMobileNumberError(t("validations.mobileNumberRequired"));
      return;
    } else {
      setMobileNumberError(null);
    }

    const ratingData: RatingData = {
      userId: Number(userId),
      fullName: fullName,
      mobileNumber: mobileNumber,
    };

    if (ratings) {
      const ratingsData = Object.keys(ratings).map((questionId) => ({
        questionId: Number(questionId),
        rating: ratings[Number(questionId)],
      }));
      ratingData.questions = JSON.stringify(ratingsData);
    }

    if (note) {
      ratingData.note = note.trim();
    }

    mutate({
      userId: ratingData.userId,
      questions: ratingData.questions,
      note: ratingData.note,
      fullName: ratingData.fullName,
      mobileNumber: ratingData.mobileNumber,
    });
  };

  useEffect(() => {
    if (response?.status) {
      setError(null);
      setIsRatingSuccess(!isRatingSuccess);
    } else if (response?.status === false && response.message) {
      setIsRatingSuccess(false);
      setError(response.message);
    }
  }, [response, error, isSuccess, error]);

  return {
    ratings,
    note,
    error,
    isRatingSuccess,
    isPending,
    fullName,
    mobileNumber,
    fullNameError,
    mobileNumberError,
    setMobileNumber,
    setFullName,
    setNote,
    handleRatingChange,
    handleSubmit,
  };
};

export default useRating;
