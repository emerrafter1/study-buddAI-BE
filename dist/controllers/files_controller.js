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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const pdfParse_1 = require("../services/pdfParse");
const files_model_1 = __importDefault(require("../models/files_model"));
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ error: 'No PDF uploaded' });
        return;
    }
    let dbConnection = yield connection_1.default.getConnection();
    try {
        const result = yield (0, pdfParse_1.extractTextFromPdf)(req.file.buffer);
        const text = result.text;
        const doc = {
            file_text: text,
        };
        yield (0, files_model_1.default)(doc);
        res.status(201).json({
            success: true,
            message: 'PDF processed and saved successfully',
        })
            .end();
    }
    catch (error) {
        console.error('Processing error:', error);
        res.status(500).json({ error: 'PDF processing failed' });
    }
    finally {
        if (dbConnection && typeof dbConnection.release === 'function') {
            dbConnection.release();
        }
    }
});
exports.default = uploadFiles;
