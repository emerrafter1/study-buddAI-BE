
import { postAttempt } from "../controllers/attempt_controller";
import { Router } from "express";

 const quizAttemptsRouter = Router();

quizAttemptsRouter
    .post("/", postAttempt)



export default quizAttemptsRouter;