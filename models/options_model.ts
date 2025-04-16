import db from "../db/connection";

type QuestionOption = {
  question_id: number;
  option_body: string;
  is_correct: boolean;
  label: string;
};

type QuestionOptions = {
  question_id: number;
  option_body: string;
  is_correct: boolean;
  label: string;
};

export const fetchQuestionOptions = async (
  question_id: number
): Promise<QuestionOptions[]> => {
  const [rows] = await db.query(
    `SELECT * FROM questionOptions WHERE question_id = ?`,
    [question_id]
  );

  const questionOptions = rows as QuestionOptions[];

  if (questionOptions.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }

  return questionOptions;
};

export const insertQuestionOption = async (
  question_id: number,
  option_body: string,
  is_correct: boolean,
  label: string
) => {
  const [result] = (await db.query(
    `INSERT INTO questionOptions (question_id, option_body, is_correct, label) VALUES (?, ?, ?, ?)`,
    [question_id, option_body, is_correct, label]
  )) as [{ insertId: number }, any];

  const newQuestionOptionId = result.insertId;

  const [rows] = await db.query(
    `SELECT * FROM questionOptions WHERE question_options_id = ?`,
    [newQuestionOptionId]
  );

  const question_option = rows[0] as QuestionOption[];
  return question_option;
};
