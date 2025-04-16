interface QuestionOptionsTestDataItem {
  question_id: number;
  option_body: string;
  is_correct: boolean;
  label: string;
}
const questionOptionsTestData: QuestionOptionsTestDataItem[] = [
  { question_id: 1, option_body: "H2O", is_correct: true, label: "A" },
  { question_id: 1, option_body: "CO2", is_correct: false, label: "B" },
  { question_id: 1, option_body: "NaCl", is_correct: false, label: "C" },
  {
    question_id: 1,
    option_body: "O2",
    is_correct: false,
    label: "D",
  },
  { question_id: 2, option_body: "Eight", is_correct: true, label: "A" },
  { question_id: 2, option_body: "Nine", is_correct: false, label: "B" },
  { question_id: 2, option_body: "Seven", is_correct: false, label: "C" },
  { question_id: 2, option_body: "Ten", is_correct: false, label: "D" },
  {
    question_id: 3,
    option_body: "Julius Caesar",
    is_correct: false,
    label: "A",
  },
  { question_id: 3, option_body: "Augustus", is_correct: true, label: "B" },
  { question_id: 3, option_body: "Nero", is_correct: false, label: "C" },
  { question_id: 3, option_body: "Constantine", is_correct: false, label: "D" },
  { question_id: 4, option_body: "3", is_correct: false, label: "A" },
  { question_id: 4, option_body: "4", is_correct: true, label: "B" },
  { question_id: 4, option_body: "5", is_correct: false, label: "C" },
  { question_id: 4, option_body: "6", is_correct: false, label: "D" },
];

export default questionOptionsTestData;
