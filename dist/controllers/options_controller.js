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
exports.postOptions = exports.getOptionsByQuestionId = void 0;
const options_model_1 = require("../models/options_model");
const getOptionsByQuestionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question_id } = req.params;
    const questionId = Number(question_id);
    try {
        const questionOptions = yield (0, options_model_1.fetchQuestionOptions)(questionId);
        res.status(200).send({ questionOptions });
    }
    catch (err) {
        next(err);
    }
});
exports.getOptionsByQuestionId = getOptionsByQuestionId;
const postOptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question_id, option_body, is_correct, label } = req.body;
    try {
        const questionOption = yield (0, options_model_1.insertQuestionOption)(question_id, option_body, is_correct, label);
        res.status(201).send({ questionOption });
    }
    catch (err) {
        next(err);
    }
});
exports.postOptions = postOptions;
