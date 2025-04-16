interface QuestionsTestDataItem {
  quiz_id: number;
  question_text: string;
}
const questionsTestData: QuestionsTestDataItem[] = [
  { quiz_id: 1, question_text: "What is the chemical symbol for water?" },
  { quiz_id: 1, question_text: "How many planets are in our solar system?" },
  { quiz_id: 2, question_text: "Who was the first Roman Emperor?" },
  { quiz_id: 3, question_text: "What is 2 + 2?" },
];
export default questionsTestData;
