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
exports.insertUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const insertUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password, }) {
    if (!username || !email || !password) {
        return Promise.reject({ status: 400, msg: "Missing required fields" });
    }
    // Check for existing user by username or email
    const [existingRows] = yield connection_1.default.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, email]);
    if (existingRows.length > 0) {
        return Promise.reject({ status: 409, msg: "Username or email already exists" });
    }
    // Insert the new user
    yield connection_1.default.query(`INSERT INTO users (username, email, password)
     VALUES (?, ?, ?)`, [username, email, password]);
    // Fetch the newly created user
    const [userRows] = yield connection_1.default.query(`SELECT user_id, username, email FROM users WHERE username = ?`, [username]);
    return userRows[0];
});
exports.insertUser = insertUser;
