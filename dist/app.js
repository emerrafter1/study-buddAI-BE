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
const { handleServerErrors, handleMySqlErrors, handleCustomErrors, } = require("./controllers/errors.controller");
const users_controller_1 = __importDefault(require("./controllers/users_controller"));
const quizzes_controller_1 = require("./controllers/quizzes_controller");
const options_controller_1 = require("./controllers/options_controller");
const files_router_1 = __importDefault(require("./routes/files-router"));
const answers_attempt_controller_1 = require("./controllers/answers_attempt_controller");
const questions_controller_1 = require("./controllers/questions_controller");
const attempt_controller_1 = require("./controllers/attempt_controller");
const generateQuiz_1 = require("./generateQuiz");
// const { getEndpoints } = require("./controllers/endpoints_controller")
// const { uploadFiles } = require("../controllers/files_controller")
// const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")
// const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
// const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
// const { postAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")
//MIDDLEWARE
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use("/api", apiRouter);
app.use("/files", files_router_1.default);
app.get("/", (req, res) => {
    res.send("Server running");
});
// //Users
app.post("/users", users_controller_1.default);
// //PDF files
// app.post("/upload", uploadFiles)
// //Quizzes
app.post("/quizzes", quizzes_controller_1.postQuizzes);
app.get("/quizzes/:user_id", quizzes_controller_1.getQuizByUserId);
// app.patch("/quizzes/:quiz_id", updateQuizById) //quizzes/:quiz_id/scores ??git
// app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later
// //Quiz Questions
app.post("/questions", questions_controller_1.postQuestions);
app.get("/questions/:quiz_id", questions_controller_1.getQuestionsById);
// //Question Options
app.post("/question_options", options_controller_1.postOptions);
app.get("/question_options/:question_id", options_controller_1.getOptionsByQuestionId);
// //Attempted answers
app.get("/attempt_answer/:question_id", answers_attempt_controller_1.getAttemptAnswerByQuestionId);
app.post("/attempt_answer", answers_attempt_controller_1.postAnswerAttempt); //poat answer
// //Quiz attempt
app.post("/attempt", attempt_controller_1.postAttempt); //posts to db
// app.patch("/attempt/:attempt_id"), updateQuizAttemptById //update score
app.post("/generate_quiz", generateQuiz_1.generateQuiz);
// // *******************************************************************************
// //ERROR HANDLING
// app.all("*", (req:Request, res:Response):any => {
//     res.status(404).send({ msg: "Path not found" });
//   });
app.use(handleMySqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);
// app.listen(8080, (err?: Error) => {
//   if (err) {
//       console.error(err);
//   } else {
//       console.log("Listening on 8080");
//   }
// });
exports.default = app;
