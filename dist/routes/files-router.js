"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../services/upload"));
const files_controller_1 = __importDefault(require("../controllers/files_controller"));
const filesRouter = express_1.default.Router();
const multerErrorHandler_1 = __importDefault(require("../middleware/multerErrorHandler"));
filesRouter.get('/test', (req, res) => {
    res.json({ message: "Router is working!" });
});
filesRouter.post('/upload', upload_1.default.single('file'), files_controller_1.default, multerErrorHandler_1.default);
exports.default = filesRouter;
