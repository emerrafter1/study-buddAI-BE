interface AttemptsDevDataItem {
    
    user_id: number;
    quiz_id: number;
    score: number;
  }
  const attemptsDevData: AttemptsDevDataItem[] = [
    {  user_id: 1, quiz_id: 1, score: 0.3 },
    {  user_id: 2, quiz_id: 2,  score: 0.2 },
    {  user_id: 1, quiz_id: 3,  score: 0.4 },
    {  user_id: 3, quiz_id: 4,  score: 0.1 },
    {  user_id: 1, quiz_id: 5, score: 0.2 }, 
    {  user_id: 4, quiz_id: 5, score: 0.1 }, 
    {  user_id: 2, quiz_id: 6, score: 0.3 }, 
    { user_id: 5, quiz_id: 6, score: 0.0 }
  ];
   export default attemptsDevData;
