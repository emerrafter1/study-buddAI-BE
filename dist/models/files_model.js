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
const insertFileData = (doc) => __awaiter(void 0, void 0, void 0, function* () {
    let dbConnection = yield connection_1.default.getConnection();
    try {
        if (!dbConnection) {
            throw new Error('Database connection failed');
        }
        yield dbConnection.execute(`INSERT INTO files 
       (file_text)
       VALUES (?, ?)`, [doc.file_text]);
    }
    catch (error) {
        console.error('Database insertion error:', error);
        throw new Error('Failed to insert PDF data');
    }
    finally {
        if (dbConnection) {
            if ('release' in dbConnection) {
                if (typeof dbConnection.release === 'function') {
                    dbConnection.release();
                }
            }
        }
    }
});
exports.default = insertFileData;
