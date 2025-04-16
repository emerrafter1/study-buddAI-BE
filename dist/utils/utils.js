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
/**
 * Validates if user exists and returns their ID
 * @param userId Either string or number user ID
 * @returns Promise<number> Validated user ID
 * @throws Error if user doesn't exist
 */
const validateAndGetUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(userId);
    if (isNaN(user_id)) {
        throw new Error('Invalid user ID format');
    }
    const [rows] = yield connection_1.default.execute('SELECT user_id FROM users WHERE user_id = ?', [user_id]);
    if (!rows.length) {
        throw new Error('User not found');
    }
    return rows[0].user_id;
});
exports.default = validateAndGetUserId;
