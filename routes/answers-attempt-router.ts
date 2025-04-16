import { Router } from "express";
import { postAnswerAttempt,getAttemptAnswerByQuestionId } from "../controllers/answers_attempt_controller";

 const answersAttemptRouter = Router();

answersAttemptRouter.post("/:question_id", getAttemptAnswerByQuestionId);
answersAttemptRouter.get("/", postAnswerAttempt);

export default answersAttemptRouter