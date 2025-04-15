import db from "../db/connection";

type Quizzes = {
  quiz_id: number;
  user_id: number;
  created_at: string;
  quiz_name: string;
  file_id: number;
};

export const fetchUserQuizzes = async (user_id: number): Promise<Quizzes[]> => {

    
  const [rows] = await db.query(`SELECT * FROM quizzes WHERE user_id = ?`, [
    user_id,
  ]);

  const quizzes = rows as Quizzes[];

  console.log(quizzes.length)

  if (quizzes.length === 0) {
    console.log("404")
    return Promise.reject({ status: 404, msg: "Not found" });
  }

  return quizzes;
};
