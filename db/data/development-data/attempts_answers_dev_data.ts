interface AttemptAnswersDevDataItem {
  attempt_id: number;
  question_id: number;
  question_options_id: number;
}

const attemptAnswersDevData: AttemptAnswersDevDataItem[] = [
  { attempt_id: 1, question_id: 1, question_options_id: 1 },
  { attempt_id: 1, question_id: 2, question_options_id: 6 },
  { attempt_id: 2, question_id: 3, question_options_id: 10 },
  { attempt_id: 3, question_id: 4, question_options_id: 14 },
  { attempt_id: 5, question_id: 5, question_options_id: 17 },
  { attempt_id: 5, question_id: 6, question_options_id: 22 },
  { attempt_id: 6, question_id: 5, question_options_id: 18 },
  { attempt_id: 6, question_id: 6, question_options_id: 21 },
  { attempt_id: 7, question_id: 5, question_options_id: 17 },
  { attempt_id: 7, question_id: 6, question_options_id: 23 },
  { attempt_id: 8, question_id: 5, question_options_id: 20 },
  { attempt_id: 8, question_id: 6, question_options_id: 22 },
];

export default attemptAnswersDevData;
