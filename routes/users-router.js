"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../controllers/users_controller");
var usersRouter = (0, express_1.Router)();
// POST /api/users - create a new user
usersRouter.post("/", users_controller_1.default);
exports.default = usersRouter;
