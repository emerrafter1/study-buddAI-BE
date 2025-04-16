"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multerErrorHandler = (err, req, res, next) => {
    if (err.message === "Not a valid PDF file") {
        res.status(400).json({ error: "Not a valid PDF file" });
        return;
    }
    next(err);
};
exports.default = multerErrorHandler;
