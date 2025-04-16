"use strict";
// export const apiRouter = require("express").Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
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
const express_1 = require("express");
const users_router_1 = __importDefault(require("./users-router"));
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.use("/users", users_router_1.default);
