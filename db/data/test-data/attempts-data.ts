interface AttemptsTestDataItem {
    attempt_id: number;
    user_id: number;
    quiz_id: number;
    score: number;
  }
  const attemptsTestData: AttemptsTestDataItem[] = [
    { attempt_id: 1, user_id: 1, quiz_id: 1, score: 3 },
    { attempt_id: 2, user_id: 2, quiz_id: 2,  score: 2 },
    { attempt_id: 3, user_id: 1, quiz_id: 3,  score: 4 },
    { attempt_id: 4, user_id: 3, quiz_id: 4,  score: 1 }
  ];
   export default attemptsTestData;
