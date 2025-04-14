interface AttemptAnswersTestDataItem {
    attempt_answer_id: number;
    attempt_id: number;
    question_id: number;
    question_options_id: number;
    is_correct: boolean;
  }
  
  const attemptAnswersTestData: AttemptAnswersTestDataItem[] = [
    { attempt_answer_id: 1, attempt_id: 1, question_id: 1, question_options_id: 1, is_correct: true },
    { attempt_answer_id: 2, attempt_id: 1, question_id: 2, question_options_id: 6, is_correct: false },
    { attempt_answer_id: 3, attempt_id: 2, question_id: 3, question_options_id: 10, is_correct: true },
    { attempt_answer_id: 4, attempt_id: 3, question_id: 4, question_options_id: 14, is_correct: true }
  ];
    
    module.exports = attemptAnswersTestData;