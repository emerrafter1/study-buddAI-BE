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
exports.postQuizzes = exports.getQuizByUserId = void 0;
const quizzes_model_1 = require("../models/quizzes_model");
// export const postQuizzes = async () => {}
const getQuizByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const userId = Number(user_id);
    try {
        const quizzes = yield (0, quizzes_model_1.fetchUserQuizzes)(userId);
        res.status(200).send({ quizzes });
    }
    catch (err) {
        next(err);
    }
});
exports.getQuizByUserId = getQuizByUserId;
const postQuizzes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, quiz_name, file_id } = req.body;
    try {
        const quiz = yield (0, quizzes_model_1.insertQuiz)(user_id, quiz_name, file_id);
        res.status(201).send({ quiz });
    }
    catch (err) {
        next(err);
    }
});
exports.postQuizzes = postQuizzes;
// export const updateQuizById = async () => {}
// export const deleteQuizById = async () => {}
