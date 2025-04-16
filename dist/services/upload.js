"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
//MEMORY STORAGE
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            console.log(file, "<<<<<<file in Multer");
            cb(null, true);
        }
        else {
            console.log("not a pdf");
            cb(new Error('Not a valid PDF file'));
        }
    }
});
exports.default = upload;
