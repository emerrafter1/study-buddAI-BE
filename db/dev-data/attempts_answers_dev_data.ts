interface AttemptAnswersDevDataItem {
    attempt_answer_id: number;
    attempt_id: number;
    question_id: number;
    question_options_id: number;
    is_correct: boolean;
  }
  
  const attemptAnswersDevData: AttemptAnswersDevDataItem[] = [
    { attempt_answer_id: 1, attempt_id: 1, question_id: 1, question_options_id: 1, is_correct: true },
    { attempt_answer_id: 2, attempt_id: 1, question_id: 2, question_options_id: 6, is_correct: false },
    { attempt_answer_id: 3, attempt_id: 2, question_id: 3, question_options_id: 10, is_correct: true },
    { attempt_answer_id: 4, attempt_id: 3, question_id: 4, question_options_id: 14, is_correct: true },
    { attempt_answer_id: 5, attempt_id: 5, question_id: 5, question_options_id: 17, is_correct: true }, 
    { attempt_answer_id: 6, attempt_id: 5, question_id: 6, question_options_id: 22, is_correct: true }, 
    { attempt_answer_id: 7, attempt_id: 6, question_id: 5, question_options_id: 18, is_correct: false }, 
    { attempt_answer_id: 8, attempt_id: 6, question_id: 6, question_options_id: 21, is_correct: false }, 
    { attempt_answer_id: 9, attempt_id: 7, question_id: 5, question_options_id: 17, is_correct: true }, 
    { attempt_answer_id: 10, attempt_id: 7, question_id: 6, question_options_id: 23, is_correct: false }, 
    { attempt_answer_id: 11, attempt_id: 8, question_id: 5, question_options_id: 20, is_correct: false }, 
    { attempt_answer_id: 12, attempt_id: 8, question_id: 6, question_options_id: 22, is_correct: true }
  ];
    
  export default attemptAnswersDevData;