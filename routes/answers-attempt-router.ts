import { Router } from "express";
import { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } from "../controllers/answers_attempt_controller";

export const answersAttemptRouter = Router();

answersAttemptRouter
    .route("/attempt_answer/:question_options_id")
    .get(getAnswerAttemptByOptionId)
    .post(postAnswerAttemptByOptionId);

