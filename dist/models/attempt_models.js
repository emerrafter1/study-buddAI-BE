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
exports.insertAttempt = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const insertAttempt = (quiz_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = (yield connection_1.default.query(`INSERT INTO attempt (quiz_id, score) VALUES (?, ?)`, [quiz_id, 0]));
    const newAttemptId = result.insertId;
    const [rows] = yield connection_1.default.query(`SELECT * FROM attempt WHERE attempt_id = ?`, [newAttemptId]);
    const attempt = rows[0];
    return attempt;
});
exports.insertAttempt = insertAttempt;
