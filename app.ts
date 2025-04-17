require("dotenv").config();
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const {
  handleServerErrors,
  handleMySqlErrors,
  handleCustomErrors,
} = require("./controllers/errors.controller");

import { apiRouter } from "./routes/api-router";
import postUsers from "./controllers/users_controller";
import { getQuizByUserId, postQuizzes } from "./controllers/quizzes_controller";
import {
  postOptions,
  getOptionsByQuestionId,
} from "./controllers/options_controller";
import filesRouter from "./routes/files-router";

import {
  postAnswerAttempt,
  getAttemptAnswerByQuestionId,
} from "./controllers/answers_attempt_controller";
import {
  getQuestionsById,
  postQuestions,
} from "./controllers/questions_controller";
import { postAttempt } from "./controllers/attempt_controller";
import { generateQuiz } from "./generateQuiz";

// const { getEndpoints } = require("./controllers/endpoints_controller")
// const { uploadFiles } = require("../controllers/files_controller")

// const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")
// const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
// const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
// const { postAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")

//MIDDLEWARE
app.use(cors());
app.use(express.json());
// app.use("/api", apiRouter);
app.use("/files", filesRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});

// //Users
app.post("/api/users", postUsers);

// //PDF files
// app.post("/upload", uploadFiles)

// //Quizzes
app.post("/api/quizzes", postQuizzes);
app.get("/api/quizzes/:user_id", getQuizByUserId);
// app.patch("/quizzes/:quiz_id", updateQuizById) //quizzes/:quiz_id/scores ??git
// app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later

// //Quiz Questions
app.post("/api/questions", postQuestions);
app.get("/api/questions/:quiz_id", getQuestionsById);

// //Question Options
app.post("/api/question_options", postOptions);
app.get("/api/question_options/:question_id", getOptionsByQuestionId);

// //Attempted answers
app.get("/api/attempt_answer/:question_id", getAttemptAnswerByQuestionId);
app.post("/api/attempt_answer", postAnswerAttempt); //poat answer

// //Quiz attempt
app.post("/api/attempt", postAttempt); //posts to db
// app.patch("/attempt/:attempt_id"), updateQuizAttemptById //update score

app.post("/generate_quiz", generateQuiz);

// // *******************************************************************************

// //ERROR HANDLING
// app.all("*", (req:Request, res:Response):any => {
//     res.status(404).send({ msg: "Path not found" });
//   });

app.use(handleMySqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
