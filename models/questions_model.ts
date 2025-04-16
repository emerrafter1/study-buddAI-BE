
import db from "../db/connection"

interface Question {
    question_id: number;
    quiz_id: number;
    question_body: string;
  }

export const fetchQuestionsByQuizId = async (quiz_id: string) : Promise<Question[]> => {

        const rows = await db.query(`SELECT * FROM questions WHERE questions.quiz_id = ?`, [quiz_id])
        if((rows[0]as Question[]).length === 0){
            return Promise.reject({ status: 400, msg: "bad request" }) 
        }
        return rows[0] as Question[];

}

export const insertQuestion = async (newQuestion) => {

        if (!newQuestion.quiz_id || !newQuestion.question_body) {
            return Promise.reject({ status: 400, msg: "Missing required fields" });
          }
          const [existingRows]: [any[], any] = await db.query(
            `SELECT * FROM questions WHERE question_body = ?`,
            [newQuestion.question_body]
          );
      
          if (existingRows.length > 0) {
            return Promise.reject({ status: 409, msg: "Username or email already exists" });
          }
     await db.query(`INSERT INTO questions (quiz_id, question_body)
           VALUES (?, ?)`, [newQuestion.quiz_id, newQuestion.question_body]) 
     const [rows]: [any[], any] = await db.query(
            `SELECT question_id, quiz_id, question_body FROM questions WHERE question_body = ?`,
            [newQuestion.question_body]
          );
    
          return rows[0];

}
