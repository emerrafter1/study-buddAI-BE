import db from "../db/connection";

type AttemptAnswer = {
  attempt_answer_id: number;
  question_options_id: number;
  question_id: number;
  attempt_id: number;
};

type AttemptAnswers = {
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

export const fetchAttemptAnswerByQuestionId = async (question_id: number) => {

 
  const [rows] = await db.query(
    `SELECT * FROM attemptAnswer WHERE question_id = ?`,
    [question_id]
  );

  const attemptAnswers = rows as AttemptAnswers[];



  if (attemptAnswers.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }

  const attemptAnswer = rows[0] as AttemptAnswer;
  return attemptAnswer;
};
