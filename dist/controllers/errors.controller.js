"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handleCustomErrors = exports.handleMySqlErrors = void 0;
const handleMySqlErrors = (err, req, res, next) => {
    if (err.code === "ER_BAD_FIELD_ERROR" ||
        err.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
        return res.status(400).send({ msg: "Bad request" });
    }
    next(err);
};
exports.handleMySqlErrors = handleMySqlErrors;
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
