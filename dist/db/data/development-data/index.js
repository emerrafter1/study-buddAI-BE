"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attempts_answers_dev_data_1 = __importDefault(require("./attempts_answers_dev_data")); // singular
const attempts_dev_data_1 = __importDefault(require("./attempts_dev_data")); // singular
const files_dev_data_1 = __importDefault(require("./files_dev_data"));
const question_options_dev_data_1 = __importDefault(require("./question_options_dev_data"));
const questions_dev_data_1 = __importDefault(require("./questions_dev_data"));
const quizzes_dev_data_1 = __importDefault(require("./quizzes_dev_data"));
const users_dev_data_1 = __importDefault(require("./users_dev_data"));
const devData = {
    attemptAnswerData: attempts_answers_dev_data_1.default,
    attemptData: attempts_dev_data_1.default,
    filesData: files_dev_data_1.default,
    questionOptionsData: question_options_dev_data_1.default,
    questionsData: questions_dev_data_1.default,
    quizzesData: quizzes_dev_data_1.default,
    usersData: users_dev_data_1.default,
};
exports.default = devData;
