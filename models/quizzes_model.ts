import db from "../db/connection";

type Quizzes = {
  quiz_id: number;
  user_id: number;
  created_at: string;
  quiz_name: string;
  file_id: number;
};

type Quiz = {
  quiz_id: number;
  user_id: number;
  quiz_name: string;
  file_id: number;
};

export const fetchUserQuizzes = async (user_id: number): Promise<Quizzes[]> => {
  const [rows] = await db.query(`SELECT * FROM quizzes WHERE user_id = ?`, [
    user_id,
  ]);

  const quizzes = rows as Quizzes[];

  if (quizzes.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }

  return quizzes;
};

export const insertQuiz = async (
  user_id: number,
  quiz_name: string,
  file_id: number
) => {



  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

console

  
console.log(created_at, "<<<<<<LINE 39")
  const [result] = (await db.query(
    `INSERT INTO quizzes (created_at, user_id, quiz_name, file_id) VALUES (?, ?, ?, ?)`,
    [created_at, user_id, quiz_name, file_id]
  )) as [{ insertId: number }, any];
console.log(result, "<<<<<<LINE 44")
  const newQuizId = result.insertId;

  const [rows] = await db.query(`SELECT * FROM quizzes WHERE quiz_id = ?`, [
    newQuizId,
  ]);
console.log(rows, "<<<<<LINE 50")
  const quiz = rows[0] as Quiz;
  console.log(quiz)

  return quiz;

  
};
