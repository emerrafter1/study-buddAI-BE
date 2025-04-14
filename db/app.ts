require("dotenv").config()
import express from "express";
import cors from "cors";
const app = express()
app.use(cors())
import { Router } from "express";
const router = Router();
import {Request, Response, } from 'express'
const { handleServerErrors, 
    handlePsqlErrors, 
    handleCustomErrors,
} = require("./controllers/errors.controller")
import { apiRouter } from '../routes/api-router'


export default router;
const { getEndpoints } = require("./controllers/endpoints_controller")
const { postUsers } = require("../controllers/users_controller")
const { uploadFiles } = require("../controllers/files_controller")
const { postQuizzes, getQuizByUserId, updateQuizById, deleteQuizById } = require("../controllers/quizzes_controller")
const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")
const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
const { postQuizAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")

//MIDDLEWARE
app.use(express.json())
app.use("/api", apiRouter);
app.use('/api/files', apiRouter);

//Users
app.post("/users", postUsers)

//PDF files
app.post("/upload", uploadFiles)

//Quizzes
app.post("/quizzes", postQuizzes) 
app.get("/quizzes/:user_id", getQuizByUserId)
app.patch("/quizzes/:quiz_id", updateQuizById)
app.delete("/quizzes/:quid_id", deleteQuizById) // to be added later

//Quiz Questions
app.post("questions", postQuestions )
app.get("/questions/:quiz_id", getQuestionsById)

//Question Options
app.post("answer_options", postOptions)
app.get("/answer_options/:question_id", getOptionsByQuestionId)



//Attempted answers
app.get("/answer_attempt/:answer_options_id", getAnswerAttemptByOptionId)
app.post("answer_attempt/:answer_options_id", postAnswerAttemptByOptionId)


//Quiz attempt
app.post("/attempt", postQuizAttempt)
app.patch("/attempt/:attempt_id"), updateQuizAttemptById

// *******************************************************************************

//ERROR HANDLING
app.all("*", (req:Request, res:Response):any => {
    res.status(404).send({ msg: "Path not found" });
  });

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;