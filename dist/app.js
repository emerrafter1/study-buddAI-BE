"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_router_1 = __importDefault(require("./routes/api-router"));
const app = (0, express_1.default)();
// const { getEndpoints } = require("./controllers/endpoints_controller")
// const { postUsers } = require("../controllers/users_controller")
// const { uploadFiles } = require("../controllers/files_controller")
// const { postQuizzes, getQuizByUserId, updateQuizById, deleteQuizById } = require("../controllers/quizzes_controller")
// const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")
// const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
// const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
// const { postQuizAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")
//MIDDLEWARE
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", api_router_1.default);
// //Users
// app.post("/users", postUsers)
// //PDF files
// app.post("/upload", uploadFiles.single("file"),uploadFiles)
// //Quizzes
// app.post("/quizzes", postQuizzes) 
// app.get("/quizzes/:user_id", getQuizByUserId)
// app.patch("/quizzes/:quiz_id", updateQuizById) //quizzes/:quiz_id/scores ??git 
// app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later
// //Quiz Questions
// app.post("/questions", postQuestions )
// app.get("/questions/:quiz_id", getQuestionsById)
// //Question Options
// app.post("/question_options", postOptions)
// app.get("/question_options/:question_id", getOptionsByQuestionId)
// //Attempted answers
// app.get("/answer_attempt/:answer_options_id", getAnswerAttemptByOptionId)
// app.post("/answer_attempt/:answer_options_id", postAnswerAttemptByOptionId) //post answer
// //Quiz attempt
// app.post("/attempt", postQuizAttempt) //posts to db
// app.patch("/attempt/:attempt_id"), updateQuizAttemptById //update score
// *******************************************************************************
//ERROR HANDLING
app.all("*", (req, res) => {
    res.status(404).send({ msg: "Path not found" });
});
// app.use(handlePsqlErrors);
// app.use(handleCustomErrors);
// app.use(handleServerErrors);
app.listen(8080, () => {
    // console.log('Server running on http://localhost:8080');
});
exports.default = app;
