import db from "./db/connection";

type AnswerCount = { total_correct: number };
type TotalQuestions = { total_questions: number };

export const generateResults = async (attempt_id: number) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total_correct
FROM attemptAnswer aa
JOIN questionOptions qo 
  ON aa.question_options_id = qo.question_options_id
WHERE aa.attempt_id = ?
  AND qo.is_correct = TRUE;`,
    [attempt_id]
  );

  const correctAnswersCount = rows[0] as AnswerCount;
  const totalCorrect = correctAnswersCount.total_correct;

  const [rows2] = await db.query(
    `SELECT COUNT(*) AS total_questions
FROM attemptAnswer
WHERE attempt_id = ?;`,

    [attempt_id]
  );

  const totalAnswersCount = rows2[0] as TotalQuestions;
  const totalAnswers = totalAnswersCount.total_questions;

  let score = totalCorrect / totalAnswers;

  const [questionResults] = await db.query(
    `SELECT
    q.question_body,
    attempted.option_body AS attempted_answer,
    correct.option_body AS correct_answer
  FROM attemptAnswer aa
  JOIN questions q
    ON aa.question_id = q.question_id
  JOIN questionOptions attempted
    ON aa.question_options_id = attempted.question_options_id
  JOIN questionOptions correct
    ON correct.question_id = q.question_id AND correct.is_correct = TRUE
  WHERE aa.attempt_id = ?;
`,
    [attempt_id]
  );

  if (score === 1) {
    score = Number(score.toFixed(2));
  }
  await db.query(`UPDATE attempt SET score = ? where attempt_id = ? `, [
    score,
    attempt_id,
  ]);

  const overallResult = {
    questions: questionResults,
    score: score,
  };

  return overallResult;
};
