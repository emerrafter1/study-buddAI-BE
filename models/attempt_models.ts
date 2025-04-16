import db from "../db/connection";

type Attempt = {
  attempt_id: number;
  quiz_id: number;
  score: number;
};

export const insertAttempt = async (quiz_id: number) => {
  const [result] = (await db.query(
    `INSERT INTO attempt (quiz_id, score) VALUES (?, ?)`,
    [quiz_id, 0]
  )) as [{ insertId: number }, any];

  const newAttemptId = result.insertId;

  const [rows] = await db.query(
    `SELECT * FROM attempt WHERE attempt_id = ?`,
    [newAttemptId]
  );

  const attempt = rows[0] as Attempt[];
  return attempt;
};
