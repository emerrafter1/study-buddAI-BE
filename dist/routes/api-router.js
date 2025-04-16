"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import usersRouter from "./users-router";
// import  quizzesRouter from "./quizzes-router";
const files_router_1 = __importDefault(require("./files-router"));
// import  questionsRouter  from "./questions-router";
// import  optionsRouter  from "./options-router";
// import  quizAttemptsRouter  from "./quiz-attempts-router";
// import  answersAttemptRouter from "./answers-attempt-router";
const apiRouter = express_1.default.Router();
apiRouter.use("/files", files_router_1.default); //POST: api/files/upload
// apiRouter.use("/users", usersRouter);
// apiRouter.use("/quizzes", quizzesRouter);
// apiRouter.use("/questions", questionsRouter);
// apiRouter.use("/question_options", optionsRouter)
// apiRouter.use("/attempt", quizAttemptsRouter)
// apiRouter.use("/attempt_answer", answersAttemptRouter)
exports.default = apiRouter;
