"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuestions = exports.getQuestionsById = void 0;
const questions_model_1 = require("../models/questions_model");
const getQuestionsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quiz_id } = req.params;
    const questions = yield (0, questions_model_1.fetchQuestionsByQuizId)(quiz_id);
    res.status(200).send({ questions });
});
exports.getQuestionsById = getQuestionsById;
const postQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuestion = req.body;
    const question = yield (0, questions_model_1.insertQuestion)(newQuestion);
    res.status(201).send({ question });
});
exports.postQuestions = postQuestions;
