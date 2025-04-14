const apiRouter = require("express").Router();


const usersRouter = require("./users-router");
const quizzesRouter = require("./quizzes-router");
const filesRouter= require("./files-router");
const questionsRouter = require("./questions-router");
const optionsRouter = require("./options-router")
const quizAttemptsRouter = require("./quiz-attempts-router")
const answersAttemptRouter = require("./answers-attempt-router")

apiRouter.use("/users", usersRouter);
apiRouter.use("/quizzes", usersRouter);
apiRouter.use("/upload", filesRouter);
apiRouter.use("/questions", questionsRouter);
apiRouter.use("/question_options", optionsRouter)
apiRouter.use("/attempt", quizAttemptsRouter)
apiRouter.use("/attempt_answer/", answersAttemptRouter)

module.exports = apiRouter;

