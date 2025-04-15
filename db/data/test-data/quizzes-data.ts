interface QuizzesTestDataItem {
  user_id: number;
  created_at: string;
  quiz_name: string;
  file_id: number;
}

const quizzesTestData: QuizzesTestDataItem[] = [
  {
    user_id: 1,
    created_at: "2025-04-14T11:00:00.000Z",
    quiz_name: "Science Basics",
    file_id: 101,
  },
  {
    user_id: 2,
    created_at: "2025-04-14T11:15:00.000Z",
    quiz_name: "Roman History",
    file_id: 102,
  },
  {
    user_id: 1,
    created_at: "2025-04-14T11:30:00.000Z",
    quiz_name: "Math Puzzles",
    file_id: 103,
  },
  {
    user_id: 3,
    created_at: "2025-04-14T11:45:00.000Z",
    quiz_name: "Intro to Literature",
    file_id: 104,
  },
];

export default quizzesTestData;
