interface QuizzesDevDataItem {
    
    user_id: number;
    created_at: string;
    quiz_name: string;
    file_id: number;
  }
  
  const quizzesDevData: QuizzesDevDataItem[] = [
    {  user_id: 1, created_at: '2025-04-14T11:00:00.000Z', quiz_name: 'Science Basics', file_id: 101 },
    {  user_id: 2, created_at: '2025-04-14T11:15:00.000Z', quiz_name: 'Roman History', file_id: 102 },
    {  user_id: 1, created_at: '2025-04-14T11:30:00.000Z', quiz_name: 'Math Puzzles', file_id: 103 },
    {  user_id: 3, created_at: '2025-04-14T11:45:00.000Z', quiz_name: 'Intro to Literature', file_id: 104 },
     {  user_id: 4, created_at: '2025-04-15T10:00:00.000Z', quiz_name: 'Advanced Coding', file_id: 105 },
  {  user_id: 4, created_at: '2025-04-15T10:10:00.000Z', quiz_name: 'Database Design', file_id: 106 },
  {  user_id: 5, created_at: '2025-04-15T10:20:00.000Z', quiz_name: 'Frontend Frameworks', file_id: 107 },
  {  user_id: 5, created_at: '2025-04-15T10:30:00.000Z', quiz_name: 'Algorithms and Data Structures', file_id: 108 }
  ];
    
  export default  quizzesDevData;