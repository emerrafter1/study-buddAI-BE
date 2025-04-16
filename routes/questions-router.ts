import { getQuestionsById, postQuestions } from "../controllers/questions_controller";
import { Router } from "express";

const questionsRouter = Router();

questionsRouter.get("/:quiz_id", getQuestionsById)

questionsRouter.post("/", postQuestions)

export default questionsRouter;