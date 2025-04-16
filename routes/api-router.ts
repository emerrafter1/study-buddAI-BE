import express from "express"

// import usersRouter from "./users-router";
// import  quizzesRouter from "./quizzes-router";
import  filesRouter  from "./files-router";
// import  questionsRouter  from "./questions-router";
// import  optionsRouter  from "./options-router";
// import  quizAttemptsRouter  from "./quiz-attempts-router";
// import  answersAttemptRouter from "./answers-attempt-router";

const apiRouter = express.Router();

apiRouter.use("/files", filesRouter) //POST: api/files/upload
// apiRouter.use("/users", usersRouter);
// apiRouter.use("/quizzes", quizzesRouter);
// apiRouter.use("/questions", questionsRouter);
// apiRouter.use("/question_options", optionsRouter)
// apiRouter.use("/attempt", quizAttemptsRouter)
// apiRouter.use("/attempt_answer", answersAttemptRouter)

export default apiRouter;