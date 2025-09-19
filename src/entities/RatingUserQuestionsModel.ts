export interface RatingUserQuestionsModel {
  user: {
    id: number;
    fullName: string;
    photo?: string;
  };
  questions: RatingQuestionModel[];
}

interface RatingQuestionModel {
  id: number;
  question: string;
}
