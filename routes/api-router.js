"use strict";
// export const apiRouter = require("express").Router();
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
// import usersRouter from "./users-router";
// import {quizzesRouter} from "./quizzes-router";
// // import {filesRouter} from "./files-router";
var questions_router_1 = require("./questions-router");
// // import {optionsRouter} from "./options-router";
// // import {quizAttemptsRouter} from "./quiz-attempts-router";
// // import {answersAttemptRouter} from "./answers-attempt-router";
// apiRouter.use("/users", usersRouter);
// // apiRouter.use("/quizzes", quizzesRouter);
// // apiRouter.use("/upload", filesRouter);
// // apiRouter.use("/question_options", optionsRouter)
// // apiRouter.use("/attempt", quizAttemptsRouter)
// // apiRouter.use("/attempt_answer/", answersAttemptRouter)
var express_1 = require("express");
var users_router_1 = require("./users-router");
var apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.use("/users", users_router_1.default);
apiRouter.use("/questions", questions_router_1.default);
apiRouter.use("/questions/:quiz_id", questions_router_1.default);
