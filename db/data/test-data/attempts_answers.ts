interface AttemptAnswersTestDataItem {
  attempt_id: number;
  question_id: number;
  question_options_id: number;
}

const attemptAnswersTestData: AttemptAnswersTestDataItem[] = [
  { attempt_id: 1, question_id: 1, question_options_id: 1 },
  { attempt_id: 1, question_id: 2, question_options_id: 6 },
  { attempt_id: 1, question_id: 3, question_options_id: 11},
  { attempt_id: 1, question_id: 4, question_options_id: 13},
  { attempt_id: 2, question_id: 1, question_options_id: 4 },
  { attempt_id: 2, question_id: 2, question_options_id: 7 },
  { attempt_id: 2, question_id: 3, question_options_id: 10},
  { attempt_id: 2, question_id: 4, question_options_id: 14},
];

export default attemptAnswersTestData;
