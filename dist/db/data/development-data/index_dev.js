"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attempts_answers_dev_data_1 = __importDefault(require("./attempts_answers_dev_data"));
const attempts_dev_data_1 = __importDefault(require("./attempts_dev_data"));
const files_dev_data_1 = __importDefault(require("./files_dev_data"));
const question_options_dev_data_1 = __importDefault(require("./question_options_dev_data"));
const questions_dev_data_1 = __importDefault(require("./questions_dev_data"));
const quizzes_dev_data_1 = __importDefault(require("./quizzes_dev_data"));
const users_dev_data_1 = __importDefault(require("./users_dev_data"));
const devData = {
    attemptAnswersDevData: attempts_answers_dev_data_1.default,
    attemptsDevData: attempts_dev_data_1.default,
    filesDevData: files_dev_data_1.default,
    questionOptionsDevData: question_options_dev_data_1.default,
    questionsDevData: questions_dev_data_1.default,
    quizzesDevData: quizzes_dev_data_1.default,
    usersDevData: users_dev_data_1.default,
};
exports.default = devData;
