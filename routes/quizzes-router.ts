import { postQuizzes, getQuizByUserId } from "../controllers/quizzes_controller";
import { Router } from "express";

const quizzesRouter = Router();
  
  quizzesRouter
    .post("/", postQuizzes);
  
  quizzesRouter
    .get("/:question_id", getQuizByUserId)

  

  

  export default quizzesRouter