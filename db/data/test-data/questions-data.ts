interface QuestionsTestDataItem {
    question_id: number;
    quiz_id: number;
    question_text: string;
  }
  const questionsTestData: QuestionsTestDataItem[] = [
    { question_id: 1, quiz_id: 1, question_text: 'What is the chemical symbol for water?' },
    { question_id: 2, quiz_id: 1, question_text: 'How many planets are in our solar system?' },
    { question_id: 3, quiz_id: 2, question_text: 'Who was the first Roman Emperor?' },
    { question_id: 4, quiz_id: 3, question_text: 'What is 2 + 2?' }
  ];
    module.exports = questionsTestData;