"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users_controller"));
const usersRouter = (0, express_1.Router)();
// POST /api/users - create a new user
usersRouter.post("/", users_controller_1.default);
exports.default = usersRouter;
