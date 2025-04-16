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
exports.insertQuestion = exports.fetchQuestionsByQuizId = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchQuestionsByQuizId = (quiz_id) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield connection_1.default.query(`SELECT * FROM questions WHERE questions.quiz_id = ?`, [quiz_id]);
    if (rows[0].length === 0) {
        return Promise.reject({ status: 400, msg: "bad request" });
    }
    return rows[0];
});
exports.fetchQuestionsByQuizId = fetchQuestionsByQuizId;
const insertQuestion = (newQuestion) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newQuestion.quiz_id || !newQuestion.question_body) {
        return Promise.reject({ status: 400, msg: "Missing required fields" });
    }
    const [existingRows] = yield connection_1.default.query(`SELECT * FROM questions WHERE question_body = ?`, [newQuestion.question_body]);
    if (existingRows.length > 0) {
        return Promise.reject({ status: 409, msg: "Username or email already exists" });
    }
    yield connection_1.default.query(`INSERT INTO questions (quiz_id, question_body)
           VALUES (?, ?)`, [newQuestion.quiz_id, newQuestion.question_body]);
    const [rows] = yield connection_1.default.query(`SELECT question_id, quiz_id, question_body FROM questions WHERE question_body = ?`, [newQuestion.question_body]);
    return rows[0];
});
exports.insertQuestion = insertQuestion;
