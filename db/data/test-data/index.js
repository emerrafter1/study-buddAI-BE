"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attempts_answers_1 = require("./attempts_answers");
var attempts_data_1 = require("./attempts-data");
var files_data_1 = require("./files-data");
var question_options_1 = require("./question-options");
var questions_data_1 = require("./questions-data");
var quizzes_data_1 = require("./quizzes-data");
var user_data_1 = require("./user-data");
var devData = {
    attemptAnswersTestData: attempts_answers_1.default,
    attemptsTestData: attempts_data_1.default,
    filesTestData: files_data_1.default,
    questionOptionsTestData: question_options_1.default,
    questionsTestData: questions_data_1.default,
    quizzesTestData: quizzes_data_1.default,
    usersTestData: user_data_1.default,
};
exports.default = devData;
