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
const pdfParse_1 = __importDefault(require("../services/pdfParse"));
const files_model_1 = __importDefault(require("../models/files_model"));
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log("DEBUG - File received:", {
        originalname: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
        mimetype: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
        size: (_c = req.file) === null || _c === void 0 ? void 0 : _c.size,
    });
    try {
        if (!req.file) {
            res.status(400).json({ error: "No PDF uploaded" });
            return;
        }
        const { mimetype, buffer } = req.file;
        const isMimePdf = mimetype === "application/pdf";
        const fileStart = buffer.toString("utf8", 0, 8);
        const isHeaderPdf = fileStart.includes("%PDF");
        if (!isMimePdf || !isHeaderPdf) {
            ;
            res.status(400).json({ error: "Not a valid PDF file" });
            return;
        }
        // Process PDF
        const { text } = yield (0, pdfParse_1.default)(req.file.buffer);
        yield files_model_1.default.insertFileData(text);
        res.status(201).json({
            success: true,
            message: "PDF text saved to database",
        });
    }
    catch (err) {
        console.error("PDF extraction failed:", err);
        res.status(500).json({
            error: "PDF processing failed."
        });
    }
});
exports.default = uploadFiles;
