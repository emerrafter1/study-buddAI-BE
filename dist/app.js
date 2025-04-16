"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const { handleServerErrors, handlePsqlErrors, handleCustomErrors, } = require("./controllers/errors.controller");
const users_controller_1 = __importDefault(require("./controllers/users_controller"));
const questions_controller_1 = __importDefault(require("./controllers/questions_controller"));
// const { getEndpoints } = require("./controllers/endpoints_controller")
// const { uploadFiles } = require("../controllers/files_controller")
// const { postQuizzes, getQuizByUserId, updateQuizById, deleteQuizById } = require("../controllers/quizzes_controller")
// const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
// const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
// const { postQuizAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")
// //MIDDLEWARE
// app.use(express.json())
// app.use("/api", apiRouter);
// app.use('/api/files', apiRouter);
// //Users
app.post("/users", users_controller_1.default);
// //PDF files
// app.post("/upload", uploadFiles)
// //Quizzes
// app.post("/quizzes", postQuizzes) 
// app.get("/quizzes/:user_id", getQuizByUserId)
// app.patch("/quizzes/:quiz_id", updateQuizById) //quizzes/:quiz_id/scores ??git 
// app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later
// //Quiz Questions
// app.post("questions", postQuestions )
app.get("/questions/:quiz_id", questions_controller_1.default);
// //Question Options
// app.post("question_options", postOptions)
// app.get("/question_options/:question_id", getOptionsByQuestionId)
// //Attempted answers
// app.get("/answer_attempt/:answer_options_id", getAnswerAttemptByOptionId)
// app.post("answer_attempt/:answer_options_id", postAnswerAttemptByOptionId) //poat answer
// //Quiz attempt
// app.post("/attempt", postQuizAttempt) //posts to db
// app.patch("/attempt/:attempt_id"), updateQuizAttemptById //update score
// // *******************************************************************************
// //ERROR HANDLING
// app.all("*", (req:Request, res:Response):any => {
//     res.status(404).send({ msg: "Path not found" });
//   });
// app.use(handlePsqlErrors);
// app.use(handleCustomErrors);
// app.use(handleServerErrors);
exports.default = app;
