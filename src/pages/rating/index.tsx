import {
  ChangePageTitle,
  LoadingSpinner,
  SuccessDangerToast,
} from "@components";
import { useGetUserRatingQuestions, useRating } from "@hooks";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  RatingInput,
  RatingNote,
  RatingQuestion,
  SubmitButton,
  UserProfile,
} from "./components";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { useEffect } from "react";
import { APP_ROUTES } from "@constants";

const RatingPage = () => {
  ChangePageTitle({
    pageTitle: t("rating.title"),
  });

  const { userId } = useParams<{ userId: string }>();
  const { ratingQuestions, isLoading, hasError } =
    useGetUserRatingQuestions(userId);
  const navigate = useNavigate();

  const {
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
  } = useRating(userId);

  useEffect(() => {
    if (hasError) {
      navigate(APP_ROUTES.home);
    }
  }, [hasError]);

  return (
    <div className="rating-questions max-w-lg w-full mx-auto m-5 flex flex-col justify-center items-center border border-gray-100 rounded-lg">
      {isLoading && <LoadingSpinner />}
      {!isLoading && ratingQuestions && (
        <div className="w-full flex flex-col">
          <UserProfile
            photo={ratingQuestions.user.photo}
            fullName={ratingQuestions.user.fullName}
          />

          <div className="questions flex flex-col gap-2 items-center w-full p-4">
            {!isRatingSuccess && (
              <>
                {ratingQuestions.questions.map((question) => (
                  <RatingQuestion
                    key={question.id}
                    questionId={question.id}
                    questionText={question.question}
                    value={ratings[question.id] || 0}
                    onRatingChange={handleRatingChange}
                  />
                ))}

                <RatingInput
                  id="fullName"
                  value={fullName}
                  placeholder={t("rating.fullName")}
                  onValueChange={setFullName}
                  error={fullNameError}
                />

                <RatingInput
                  id="mobileNumber"
                  value={mobileNumber}
                  placeholder={t("rating.mobileNumber")}
                  onValueChange={setMobileNumber}
                  error={mobileNumberError}
                />

                <RatingNote note={note} setNote={setNote} />

                <SubmitButton
                  isLoading={isPending}
                  handleSubmit={handleSubmit}
                />
              </>
            )}

            {error && (
              <SuccessDangerToast
                Icon={MdErrorOutline}
                text={error}
                color="danger"
              />
            )}

            {isRatingSuccess && (
              <SuccessDangerToast
                Icon={FaRegCircleCheck}
                text={t("rating.thanks")}
                color="success"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingPage;
