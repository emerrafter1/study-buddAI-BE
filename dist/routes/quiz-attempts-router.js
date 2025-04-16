"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptsRouter = void 0;
const quiz_attempts_controller_1 = require("../controllers/quiz_attempts_controller");
const express_1 = require("express");
exports.quizAttemptsRouter = (0, express_1.Router)();
exports.quizAttemptsRouter
    .route("/attempt")
    .post(quiz_attempts_controller_1.postQuizAttempt);
exports.quizAttemptsRouter
    .route("/attempt/:attempt_id")
    .patch(quiz_attempts_controller_1.updateQuizAttemptById);
module.exports = exports.quizAttemptsRouter;
