import { getOptionsByQuestionId, postOptions } from "../controllers/options_controller";
import { Router } from "express";

export const optionsRouter = Router();

optionsRouter
    .route("question_options/")
    .post(postOptions)

optionsRouter
    .route("/:question_id")
    .get(getOptionsByQuestionId)

