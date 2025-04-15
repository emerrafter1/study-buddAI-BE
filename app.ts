require("dotenv").config();
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
import { Request, Response, NextFunction } from 'express';

const {
  handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors,
} = require("./controllers/errors.controller");

import { apiRouter } from "./routes/api-router";
import postUsers from "./controllers/users_controller";
import { getQuizByUserId } from "./controllers/quizzes_controller";

// const { getEndpoints } = require("./controllers/endpoints_controller")
// const { uploadFiles } = require("../controllers/files_controller")

// const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")
// const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
// const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
// const { postQuizAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")

//MIDDLEWARE
app.use(express.json());
app.use("/api", apiRouter);
// app.use('/api/files', apiRouter);

// //Users
app.post("/users", postUsers);

// //PDF files
// app.post("/upload", uploadFiles)

// //Quizzes
// app.post("/quizzes", postQuizzes)
app.get("/quizzes/:user_id", getQuizByUserId);
// app.patch("/quizzes/:quiz_id", updateQuizById) //quizzes/:quiz_id/scores ??git
// app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later

// //Quiz Questions
// app.post("questions", postQuestions )
// app.get("/questions/:quiz_id", getQuestionsById)

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

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

export default app;
