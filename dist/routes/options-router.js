"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsRouter = void 0;
const options_controller_1 = require("../controllers/options_controller");
const express_1 = require("express");
exports.optionsRouter = (0, express_1.Router)();
exports.optionsRouter
    .route("question_options/")
    .post(options_controller_1.postOptions);
exports.optionsRouter
    .route("/:question_id")
    .get(options_controller_1.getOptionsByQuestionId);
