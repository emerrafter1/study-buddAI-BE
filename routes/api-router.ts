// export const apiRouter = require("express").Router();

// import usersRouter from "./users-router";

// import {quizzesRouter} from "./quizzes-router";
// // import {filesRouter} from "./files-router";
// // import {questionsRouter} from "./questions-router";
// // import {optionsRouter} from "./options-router";
// // import {quizAttemptsRouter} from "./quiz-attempts-router";
// // import {answersAttemptRouter} from "./answers-attempt-router";

// apiRouter.use("/users", usersRouter);
// // apiRouter.use("/quizzes", quizzesRouter);
// // apiRouter.use("/upload", filesRouter);
// // apiRouter.use("/questions", questionsRouter);
// // apiRouter.use("/question_options", optionsRouter)
// // apiRouter.use("/attempt", quizAttemptsRouter)
// // apiRouter.use("/attempt_answer/", answersAttemptRouter)

import { Router } from "express";
import usersRouter from "./users-router";
import questionsRouter from "./questions-router";
// import { quizzesRouter } from "./quizzes-router";
import  filesRouter  from "./files-router";
const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/questions", questionsRouter);
apiRouter.use("/questions/:quiz_id", questionsRouter);

export { apiRouter };


