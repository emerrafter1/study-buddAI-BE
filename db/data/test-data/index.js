"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attempts_answers_1 = require("./attempts_answers"); // singular
var attempts_data_1 = require("./attempts-data"); // singular
var files_data_1 = require("./files-data");
var question_options_1 = require("./question-options");
var questions_data_1 = require("./questions-data");
var quizzes_data_1 = require("./quizzes-data");
var user_data_1 = require("./user-data");
var devData = {
    attemptAnswerData: attempts_answers_1.default,
    attemptData: attempts_data_1.default,
    filesData: files_data_1.default,
    questionOptionsData: question_options_1.default,
    questionsData: questions_data_1.default,
    quizzesData: quizzes_data_1.default,
    usersData: user_data_1.default,
};
exports.default = devData;
