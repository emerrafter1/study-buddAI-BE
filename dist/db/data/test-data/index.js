"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attempts_answers_1 = __importDefault(require("./attempts_answers")); // singular
const attempts_data_1 = __importDefault(require("./attempts-data")); // singular
const files_data_1 = __importDefault(require("./files-data"));
const question_options_1 = __importDefault(require("./question-options"));
const questions_data_1 = __importDefault(require("./questions-data"));
const quizzes_data_1 = __importDefault(require("./quizzes-data"));
const user_data_1 = __importDefault(require("./user-data"));
const testData = {
    attemptAnswerData: attempts_answers_1.default,
    attemptData: attempts_data_1.default,
    filesData: files_data_1.default,
    questionOptionsData: question_options_1.default,
    questionsData: questions_data_1.default,
    quizzesData: quizzes_data_1.default,
    usersData: user_data_1.default,
};
exports.default = testData;
