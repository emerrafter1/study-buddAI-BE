interface AttemptsTestDataItem {
  user_id: number;
  quiz_id: number;
  score: number;
}
const attemptsTestData: AttemptsTestDataItem[] = [
  { user_id: 1, quiz_id: 1, score: 0.4 },
  { user_id: 2, quiz_id: 1, score: 0.5 },
  { user_id: 1, quiz_id: 3, score: 0.6 },
  { user_id: 3, quiz_id: 4, score: 0.7 },
];
export default attemptsTestData;
