import db from "../db/connection";

type Quizzes =  {
    quiz_id: number; 
    user_id: number;
    created_at: string;
    quiz_name: string;
    file_id: number;
  }
  export const fetchUserQuizzes = async (user_id: number): Promise<Quizzes[]> => {
    const [rows] = await db.query(
      `SELECT * FROM quizzes WHERE user_id = ?`,
      [user_id]
    );
  
    return rows as Quizzes[];
  };