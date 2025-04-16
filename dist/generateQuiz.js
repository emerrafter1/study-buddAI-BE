"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuiz = void 0;
const genai_1 = require("@google/genai");
const genai_2 = require("@google/genai");
const connection_1 = __importDefault(require("./db/connection"));
const quizzes_model_1 = require("./models/quizzes_model");
const questions_model_1 = require("./models/questions_model");
const options_model_1 = require("./models/options_model");
const questionsAmount = 3;
const quiz_name = "Cheese test quiz"; // get from front end input
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const generateQuiz = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. get the file contents from the db
    var _a;
    const [rows] = yield connection_1.default.query(`SELECT * FROM files WHERE user_id = ?`, [
        user_id,
    ]);
    // send the file text to the gemini api
    const fileText = rows[0].file_text;
    const fileId = rows[0].file_id;
    if (!fileText) {
        throw new Error("File text not found for the given file_id");
    }
    const geminiResult = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: (0, genai_2.createUserContent)([
            fileText,
            "\n\n",
            `Can you make a quiz with ${questionsAmount} multiple questions each with an option A, B, C, D based on the content above with the quiz title of "${quiz_name}"? Each question should have a text body and a corresponding array of options objects. Each option object should have a label (A, B, C, D), and an isCorrect  binary key indicating if the answer is correct or not and an option text body. Return the quiz as a JSON object.`,
        ]),
    });
    // trim the result and get data in the correct format
    const quizString = (_a = geminiResult.text) === null || _a === void 0 ? void 0 : _a.replace("```json", "").replace("```", "").trim();
    if (!quizString) {
        throw new Error("quizString is undefined");
    }
    const quizData = JSON.parse(quizString);
    // insert into Quiz table
    const quizInsert = yield (0, quizzes_model_1.insertQuiz)(user_id, quiz_name, fileId);
    const newQuizId = quizInsert.quiz_id;
    const quizQuestions = quizData.questions;
    for (const question of quizQuestions) {
        const newQuestion = {
            quiz_id: newQuizId,
            question_body: question.text,
        };
        const questionInsert = yield (0, questions_model_1.insertQuestion)(newQuestion);
        const newQuestionId = questionInsert.question_id;
        const questionOptions = question.options;
        for (const option of questionOptions) {
            yield (0, options_model_1.insertQuestionOption)(newQuestionId, option.text, option.isCorrect, option.label);
        }
    }
});
exports.generateQuiz = generateQuiz;
