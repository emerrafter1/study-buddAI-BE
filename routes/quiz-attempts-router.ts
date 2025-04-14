import { postQuizAttempt, updateQuizAttemptById } from "../controllers/quiz_attempts_controller";
import { Router } from "express";

export const quizAttemptsRouter = Router();

quizAttemptsRouter
    .route("/attempt")
    .post(postQuizAttempt)

quizAttemptsRouter
    .route("/attempt/:attempt_id")
    .patch(updateQuizAttemptById)

module.exports = quizAttemptsRouter;