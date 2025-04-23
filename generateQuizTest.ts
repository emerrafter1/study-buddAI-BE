import { GoogleGenAI } from "@google/genai";
import { createUserContent } from "@google/genai";
import db from "./db/connection";
import { RowDataPacket } from "mysql2";
import { insertQuiz } from "./models/quizzes_model";
import { insertQuestion } from "./models/questions_model";
import { insertQuestionOption } from "./models/options_model";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
interface QuizParams {
  user_id: number;
  quiz_name: string;
  file_id: number;
}

export const createQuiz = async (params: QuizParams) => {
  // Add this debug log immediately
  console.log('createQuiz received:', params);
  // Validate all parameters
  if (Object.values(params).some(val => 
    typeof val === 'number' ? isNaN(val) : !val
  )) {
    throw new Error(`Invalid parameters: ${JSON.stringify(params)}`);
  }
  const questionsAmount = 4;
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });


  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT file_text, LENGTH(file_text) as length FROM files WHERE file_id = ?`, 
    [params.file_id]
  );
  // Add type guard
  if (!Array.isArray(rows) || !rows.length) {
    throw new Error("No matching file found");
  }
  console.log(`File contains ${rows[0].length} characters`);
  if (rows[0].length > 100000) { // ~100KB
    throw new Error("File too large for processing");
  }
  const fileText = rows[0].file_text;
  const fileId = rows[0].file_id;

  if (!fileText?.trim()) {
    throw new Error("File text is empty");
  }

  if (!fileText) {
    throw new Error("File text not found for the given file_id");
  }

  const geminiResult = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([
      fileText,
      "\n\n",
      `Can you make a quiz with ${questionsAmount} multiple questions each with an option A, B, C, D based on the content above with the quiz title of "${params.quiz_name}"? Each question should have a text body and a corresponding array of options objects. Each option object should have a label (A, B, C, D), and an isCorrect  binary key indicating if the answer is correct or not and an option text body. Return the quiz as a JSON object.`,
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

  // insert into Quiz table

  const quizInsert = await insertQuiz(params.user_id, params.quiz_name, fileId);

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
  console.log("Insert result:", quizInsert); // Verify the insert worked
  return    {
    quiz_id: quizInsert.quiz_id, // Ensure this is the correct property name
    // Include other relevant data if needed
  };
};;

