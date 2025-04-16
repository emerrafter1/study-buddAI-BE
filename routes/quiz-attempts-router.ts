
import { postAttempt, postResults } from "../controllers/attempt_controller";
import { Router } from "express";


 const quizAttemptsRouter = Router();

quizAttemptsRouter
    .post("/", postAttempt)

    quizAttemptsRouter
    .post("/:attempt_id/submit", postResults)




export default quizAttemptsRouter;