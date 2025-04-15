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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../connection");
var seed = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var connection, _i, usersData_1, user, _c, filesData_1, file, _d, quizzesData_1, quiz, date;
    var usersData = _b.usersData, filesData = _b.filesData, quizzesData = _b.quizzesData, questionsData = _b.questionsData, questionOptionsData = _b.questionOptionsData, attemptAnswerData = _b.attemptAnswerData, attemptData = _b.attemptData;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, connection_1.default.getConnection()];
            case 1:
                connection = _e.sent();
                return [4 /*yield*/, connection.beginTransaction()];
            case 2:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS attemptAnswer")];
            case 3:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS attempt")];
            case 4:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS questionOptions")];
            case 5:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS questions")];
            case 6:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS quizzes;")];
            case 7:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS files;")];
            case 8:
                _e.sent();
                return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS users;")];
            case 9:
                _e.sent();
                return [4 /*yield*/, connection.query("CREATE TABLE users (\n        user_id INT AUTO_INCREMENT PRIMARY KEY,\n        username VARCHAR(255),\n        password VARCHAR(255),\n        email_address VARCHAR(255) UNIQUE\n      );\n    ")];
            case 10:
                _e.sent();
                return [4 /*yield*/, connection.query("CREATE TABLE files (\n        file_id INT AUTO_INCREMENT PRIMARY KEY,\n        file_pdf VARCHAR(255) NOT NULL,\n        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id)\n      );\n    ")];
            case 11:
                _e.sent();
                return [4 /*yield*/, connection.query("CREATE TABLE quizzes (\n        quiz_id INT AUTO_INCREMENT PRIMARY KEY,\n        created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(3),\n        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id),\n        quiz_name VARCHAR(255) NOT NULL, \n        file_id INT NOT NULL, FOREIGN KEY (file_id) REFERENCES files(file_id)\n      );\n    ")];
            case 12:
                _e.sent();
                return [4 /*yield*/, connection.query("CREATE TABLE questions (\n        question_id INT AUTO_INCREMENT PRIMARY KEY,\n        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),\n        question_body VARCHAR(255)\n      );\n    ")];
            case 13:
                _e.sent();
                return [4 /*yield*/, connection.query("CREATE TABLE questionOptions (\n        question_options_id INT AUTO_INCREMENT PRIMARY KEY,\n        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),\n        option_body VARCHAR(255) NOT NULL,\n        is_correct BOOLEAN NOT NULL,\n        label VARCHAR(255) NOT NULL\n      );\n    ")];
            case 14:
                _e.sent();
                return [4 /*yield*/, connection.query("CREATE TABLE attempt (\n        attempt_id INT AUTO_INCREMENT PRIMARY KEY,\n        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),\n        score DECIMAL(2,2) DEFAULT 0 \n      );\n    ")];
            case 15:
                _e.sent();
                //0 total digits can’t hold 2 decimal digits.
                return [4 /*yield*/, connection.query("CREATE TABLE attemptAnswer (\n        attempt_answer_id INT AUTO_INCREMENT PRIMARY KEY,\n        question_options_id INT NOT NULL, FOREIGN KEY (question_options_id) REFERENCES questionOptions(question_options_id),\n        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),\n        attempt_id INT NOT NULL, FOREIGN KEY (attempt_id) REFERENCES attempt(attempt_id)\n      );\n    ")];
            case 16:
                //0 total digits can’t hold 2 decimal digits.
                _e.sent();
                _i = 0, usersData_1 = usersData;
                _e.label = 17;
            case 17:
                if (!(_i < usersData_1.length)) return [3 /*break*/, 20];
                user = usersData_1[_i];
                return [4 /*yield*/, connection.execute("INSERT INTO users (username, password, email_address) VALUES (?, ?, ?)", [user.username, user.password, user.email])];
            case 18:
                _e.sent();
                _e.label = 19;
            case 19:
                _i++;
                return [3 /*break*/, 17];
            case 20:
                _c = 0, filesData_1 = filesData;
                _e.label = 21;
            case 21:
                if (!(_c < filesData_1.length)) return [3 /*break*/, 24];
                file = filesData_1[_c];
                return [4 /*yield*/, connection.execute("INSERT INTO files (file_id, file_pdf, user_id) VALUES (?, ?, ?)", [file.file_id, file.file_path, file.user_id])];
            case 22:
                _e.sent();
                _e.label = 23;
            case 23:
                _c++;
                return [3 /*break*/, 21];
            case 24:
                _d = 0, quizzesData_1 = quizzesData;
                _e.label = 25;
            case 25:
                if (!(_d < quizzesData_1.length)) return [3 /*break*/, 28];
                quiz = quizzesData_1[_d];
                date = new Date(quiz.created_at);
                console.log(date);
                console.log(quiz);
                return [4 /*yield*/, connection.execute("INSERT INTO quizzes (created_at, user_id , quiz_name, file_id) VALUES (?, ?, ?, ?)", [date, quiz.user_id, quiz.quiz_name, quiz.file_id])];
            case 26:
                _e.sent();
                _e.label = 27;
            case 27:
                _d++;
                return [3 /*break*/, 25];
            case 28: return [2 /*return*/];
        }
    });
}); };
exports.default = seed;
