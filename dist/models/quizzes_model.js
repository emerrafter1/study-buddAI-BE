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
exports.insertQuiz = exports.fetchUserQuizzes = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchUserQuizzes = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query(`SELECT * FROM quizzes WHERE user_id = ?`, [
        user_id,
    ]);
    const quizzes = rows;
    if (quizzes.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
    }
    return quizzes;
});
exports.fetchUserQuizzes = fetchUserQuizzes;
const insertQuiz = (user_id, quiz_name, file_id) => __awaiter(void 0, void 0, void 0, function* () {
    const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const [result] = (yield connection_1.default.query(`INSERT INTO quizzes (created_at, user_id, quiz_name, file_id) VALUES (?, ?, ?, ?)`, [created_at, user_id, quiz_name, file_id]));
    const newQuizId = result.insertId;
    const [rows] = yield connection_1.default.query(`SELECT * FROM quizzes WHERE quiz_id = ?`, [
        newQuizId,
    ]);
    const quiz = rows[0];
    return quiz;
});
exports.insertQuiz = insertQuiz;
