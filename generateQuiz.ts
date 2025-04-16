import { GoogleGenAI } from "@google/genai";
import { createUserContent } from "@google/genai";
import db from "./db/connection";
import { insertQuiz } from "./models/quizzes_model";
import { insertQuestion } from "./models/questions_model";
import { insertQuestionOption } from "./models/options_model";

const questionsAmount = 3;
const quiz_name = "Cheese test quiz"; // get from front end input
const file_id = 1; // TBC
const user_id = 1; // get from frontend loggedUser
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const generateQuiz = async (file_id: number) => {
  // 1. get the file contents from the db

  const [rows] = await db.query(
    `SELECT file_text FROM files WHERE file_id = ?`,
    [file_id]
  );

  // send the file text to the gemini api

  const fileText = rows[0].file_text;

  if (!fileText) {
    throw new Error("File text not found for the given file_id");
  }

  const geminiResult = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([
      fileText,
      "\n\n",
      `Can you make a quiz with ${questionsAmount} multiple questions each with an option A, B, C, D based on the content above with the quiz title of "${quiz_name}"? Each question should have a text body and a corresponding array of options objects. Each option object should have a label (A, B, C, D), and an isCorrect  binary key indicating if the answer is correct or not and an option text body. Return the quiz as a JSON object.`,
    ]),
  });

  // trim the result and get data in the correct format

  const quizString = geminiResult.text
    ?.replace("```json", "")
    .replace("```", "")
    .trim();

  if (!quizString) {
    throw new Error("quizString is undefined");
  }
  const quizData = JSON.parse(quizString);

  const quizInsert = await insertQuiz(user_id, quiz_name, file_id);

  const newQuizId = quizInsert.quiz_id;

  const quizQuestions = quizData.questions;

  for (const question of quizQuestions) {
    const newQuestion = {
      quiz_id: newQuizId,
      question_body: question.text,
    };

    const questionInsert = await insertQuestion(newQuestion);
    const newQuestionId = questionInsert.question_id;

    const questionOptions = question.options;

    for (const option of questionOptions) {
      await insertQuestionOption(
        newQuestionId,
        option.text,
        option.isCorrect,
        option.label
      );
    }
  }
};
