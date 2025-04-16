"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizzesRouter = void 0;
var quizzes_controller_1 = require("../controllers/quizzes_controller");
var express_1 = require("express");
exports.quizzesRouter = (0, express_1.Router)();
exports.quizzesRouter
    .route("/quizzes")
    .post(quizzes_controller_1.postQuizzes);
exports.quizzesRouter
    .route("/:user_id")
    .get(quizzes_controller_1.getQuizByUserId);
exports.quizzesRouter
    .route("/:quiz_id")
    .patch(quizzes_controller_1.updateQuizById)
    .delete(quizzes_controller_1.deleteQuizById);
