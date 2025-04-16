"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handleCustomErrors = exports.handlePsqlErrors = void 0;
const handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        return res.status(400).send({ msg: "Bad request" });
    }
    next(err);
};
exports.handlePsqlErrors = handlePsqlErrors;
const handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
};
exports.handleCustomErrors = handleCustomErrors;
const handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Something went wrong!" });
};
exports.handleServerErrors = handleServerErrors;
