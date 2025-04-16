"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answersAttemptRouter = void 0;
const express_1 = require("express");
const answers_attempt_controller_1 = require("../controllers/answers_attempt_controller");
exports.answersAttemptRouter = (0, express_1.Router)();
exports.answersAttemptRouter
    .route("/attempt_answer/:answer_options_id")
    .get(answers_attempt_controller_1.getAnswerAttemptByOptionId)
    .post(answers_attempt_controller_1.postAnswerAttemptByOptionId);
