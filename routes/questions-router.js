"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var questions_controller_1 = require("../controllers/questions_controller");
var express_1 = require("express");
var questionsRouter = (0, express_1.Router)();
questionsRouter.get("/:quiz_id", questions_controller_1.getQuestionsById);
questionsRouter.post("/", questions_controller_1.postQuestions);
exports.default = questionsRouter;
