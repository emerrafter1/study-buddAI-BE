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
exports.fetchAttemptAnswerByQuestionId = exports.insertAttemptAnswer = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const insertAttemptAnswer = (question_options_id, question_id, attempt_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = (yield connection_1.default.query(`INSERT INTO attemptAnswer (question_options_id, question_id, attempt_id) VALUES (?, ?, ?)`, [question_options_id, question_id, attempt_id]));
    const newAttemptAnswerId = result.insertId;
    const [rows] = yield connection_1.default.query(`SELECT * FROM attemptAnswer WHERE attempt_answer_id = ?`, [newAttemptAnswerId]);
    const attemptAnswer = rows[0];
    return attemptAnswer;
});
exports.insertAttemptAnswer = insertAttemptAnswer;
const fetchAttemptAnswerByQuestionId = (question_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query(`SELECT * FROM attemptAnswer WHERE question_id = ?`, [question_id]);
    const attemptAnswers = rows;
    if (attemptAnswers.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
    }
    const attemptAnswer = rows[0];
    return attemptAnswer;
});
exports.fetchAttemptAnswerByQuestionId = fetchAttemptAnswerByQuestionId;
