import db from "../db/connection";

type AttemptAnswer = {
  attempt_answer_id: number;
  question_options_id: number;
  question_id: number;
  attempt_id: number;
};

export const insertAttemptAnswer = async (
  question_options_id: number,
  question_id: number,
  attempt_id: number
) => {



 
  const [result] = (await db.query(
    `INSERT INTO attemptAnswer (question_options_id, question_id, attempt_id) VALUES (?, ?, ?)`,
    [question_options_id, question_id, attempt_id]
  )) as [{ insertId: number }, any];

  const newAttemptAnswerId = result.insertId;
  const [rows] = await db.query(
    `SELECT * FROM attemptAnswer WHERE attempt_answer_id = ?`,
    [newAttemptAnswerId]
  );

  const attemptAnswer = rows[0];
  return attemptAnswer;
};
