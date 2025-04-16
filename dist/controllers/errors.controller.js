"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    }
    next(err);
};
const handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    next(err);
};
const handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Something went wrong!" });
};
exports.default = { handleCustomErrors, handlePsqlErrors, handleServerErrors };
