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
exports.getAttemptAnswerByQuestionId = exports.postAnswerAttempt = void 0;
const attempt_answers_model_1 = require("../models/attempt_answers_model");
const attempt_answers_model_2 = require("../models/attempt_answers_model");
const postAnswerAttempt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question_options_id, question_id, attempt_id } = req.body;
    try {
        const attemptAnswer = yield (0, attempt_answers_model_1.insertAttemptAnswer)(question_options_id, question_id, attempt_id);
        res.status(201).send({ attemptAnswer });
    }
    catch (err) {
        next(err);
    }
});
exports.postAnswerAttempt = postAnswerAttempt;
const getAttemptAnswerByQuestionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question_id } = req.params;
    const questionId = Number(question_id);
    try {
        const attemptAnswer = yield (0, attempt_answers_model_2.fetchAttemptAnswerByQuestionId)(questionId);
        res.status(200).send({ attemptAnswer });
    }
    catch (err) {
        next(err);
    }
});
exports.getAttemptAnswerByQuestionId = getAttemptAnswerByQuestionId;
