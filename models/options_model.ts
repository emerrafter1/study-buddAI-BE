import db from "../db/connection";

type QuestionOption = {
    question_id :number,
    option_body : string,
    is_correct: boolean,
    label: string
}

export const insertQuestionOption = async (question_id :number,
    option_body : string,
    is_correct: boolean,
    label: string) => {


      console.log(question_id, option_body, is_correct, label)

        const [result] = (await db.query(
            `INSERT INTO questionOptions (question_id, option_body, is_correct, label) VALUES (?, ?, ?, ?)`,
            [question_id, option_body, is_correct, label]
          )) as [{ insertId: number }, any];

          

          const newQuestionOptionId = result.insertId;

          const [rows] = await db.query(`SELECT * FROM questionOptions WHERE question_options_id = ?`, [
            newQuestionOptionId,
          ]);

          const question_option = rows[0] as QuestionOption[];
          return question_option;

    };

