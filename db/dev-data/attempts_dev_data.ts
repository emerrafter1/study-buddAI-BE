interface AttemptsDevDataItem {
    attempt_id: number;
    user_id: number;
    quiz_id: number;
    score: number;
  }
  const attemptsDevData: AttemptsDevDataItem[] = [
    { attempt_id: 1, user_id: 1, quiz_id: 1, score: 0.3 },
    { attempt_id: 2, user_id: 2, quiz_id: 2,  score: 0.2 },
    { attempt_id: 3, user_id: 1, quiz_id: 3,  score: 0.4 },
    { attempt_id: 4, user_id: 3, quiz_id: 4,  score: 0.1 },
    { attempt_id: 5, user_id: 1, quiz_id: 5, score: 0.2 }, 
    { attempt_id: 6, user_id: 4, quiz_id: 5, score: 0.1 }, 
    { attempt_id: 7, user_id: 2, quiz_id: 6, score: 0.3 }, 
    { attempt_id: 8, user_id: 5, quiz_id: 6, score: 0.0 }
  ];
   export default attemptsDevData;
