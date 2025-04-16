"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const connection_1 = __importDefault(require("../connection"));
const bcrypt = __importStar(require("bcrypt"));
const seed = (_a) => __awaiter(void 0, [_a], void 0, function* ({ usersData, filesData, quizzesData, questionsData, questionOptionsData, attemptAnswerData, attemptData, }) {
    const connection = yield connection_1.default.getConnection();
    yield connection.beginTransaction();
    yield connection.query(`DROP TABLE IF EXISTS attemptAnswer`);
    yield connection.query(`DROP TABLE IF EXISTS attempt`);
    yield connection.query(`DROP TABLE IF EXISTS questionOptions`);
    yield connection.query(`DROP TABLE IF EXISTS questions`);
    yield connection.query(`DROP TABLE IF EXISTS quizzes;`);
    yield connection.query(`DROP TABLE IF EXISTS files;`);
    yield connection.query(`DROP TABLE IF EXISTS users;`);
    yield connection.query(`CREATE TABLE users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        email_address VARCHAR(255) UNIQUE
      );
    `);
    yield connection.query(`CREATE TABLE files (
        file_id INT AUTO_INCREMENT PRIMARY KEY,
        file_text LONGTEXT NOT NULL,
        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    yield connection.query(`CREATE TABLE quizzes (
        quiz_id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(3),
        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id),
        quiz_name VARCHAR(255) NOT NULL, 
        file_id INT NOT NULL, FOREIGN KEY (file_id) REFERENCES files(file_id)
      );
    `);
    yield connection.query(`CREATE TABLE questions (
        question_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        question_body LONGTEXT
      );
    `);
    yield connection.query(`CREATE TABLE questionOptions (
        question_options_id INT AUTO_INCREMENT PRIMARY KEY,
        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),
        option_body LONGTEXT NOT NULL,
        is_correct BOOLEAN NOT NULL,
        label VARCHAR(255) NOT NULL
      );
    `);
    yield connection.query(`CREATE TABLE attempt (
        attempt_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        score DECIMAL(2,2) DEFAULT 0 
      );
    `);
    //0 total digits can’t hold 2 decimal digits.
    yield connection.query(`CREATE TABLE attemptAnswer (
        attempt_answer_id INT AUTO_INCREMENT PRIMARY KEY,
        question_options_id INT NOT NULL, FOREIGN KEY (question_options_id) REFERENCES questionOptions(question_options_id),
        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),
        attempt_id INT NOT NULL, FOREIGN KEY (attempt_id) REFERENCES attempt(attempt_id)
      );
    `);
    for (const user of usersData) {
        const hashedPassword = yield bcrypt.hash(user.password, 10);
        yield connection.execute(`INSERT INTO users (username, password, email_address) VALUES (?, ?, ?)`, [user.username, hashedPassword, user.email]);
    }
    for (const file of filesData) {
        yield connection.execute(`INSERT INTO files (file_text, user_id) VALUES (?, ?)`, [file.file_path, file.user_id]);
    }
    for (const quiz of quizzesData) {
        const date = new Date(quiz.created_at);
        yield connection.execute(`INSERT INTO quizzes (created_at, user_id , quiz_name, file_id) VALUES (?, ?, ?, ?)`, [date, quiz.user_id, quiz.quiz_name, quiz.file_id]);
    }
    for (const questions of questionsData) {
        yield connection.execute(`INSERT INTO questions (quiz_id, question_body) VALUES (?, ?)`, [questions.quiz_id, questions.question_text]);
    }
    for (const questionOption of questionOptionsData) {
        yield connection.execute(`INSERT INTO questionOptions (question_id, option_body, is_correct, label) VALUES (?, ?, ?, ?)`, [questionOption.question_id, questionOption.option_body, questionOption.is_correct, questionOption.label]);
    }
    for (const attempt of attemptData) {
        yield connection.execute(`INSERT INTO attempt (quiz_id, score) VALUES (?, ?)`, [attempt.quiz_id, attempt.score]);
    }
    for (const attemptAnswer of attemptAnswerData) {
        yield connection.execute(`INSERT INTO attemptAnswer (question_options_id, question_id, attempt_id) VALUES (?, ?, ?)`, [attemptAnswer.question_options_id, attemptAnswer.question_id, attemptAnswer.attempt_id]);
    }
});
exports.default = seed;
