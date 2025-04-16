
import { postOptions,getOptionsByQuestionId } from "../controllers/options_controller";
import { Router } from "express";

const questionOptionsRouter = Router();

questionOptionsRouter.get("/:question_id", getOptionsByQuestionId)

questionOptionsRouter.post("/", postOptions)

export default questionOptionsRouter;