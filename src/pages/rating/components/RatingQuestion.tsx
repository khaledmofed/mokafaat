import { Rating } from "primereact/rating";

export const RatingQuestion = ({
  questionId,
  questionText,
  value,
  onRatingChange,
}: any) => (
  <div
    className="question-item flex flex-col gap-3 break-words w-full wow fadeInUp mb-4"
    data-wow-delay="0.2s"
  >
    <h3 className="font-semibold capitalize text-xs">{questionText}</h3>
    <Rating
      value={value}
      cancel={false}
      onChange={(e) => onRatingChange(questionId, e.value ?? null)}
    />
  </div>
);
