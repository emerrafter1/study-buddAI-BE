require("dotenv").config()
import express from "express";
import cors from "cors";
import apiRouter = require("./routes/api-router")
const app = express()
app.use(cors())
const routes =require( "../routes")
const { getEndpoints } = require("./controllers/endpoints_controller")
const { postUsers } = require("../controllers/users_controller")
const { uploadFiles } = require("../controllers/files_controller")
const { postQuizzes, getQuizByUserId, updateQuizById, deleteQuizById } = require("../controllers/quizzes_controller")
const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")
const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")
const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")
const { postQuizAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")

app.use(express.json())
app.use("/api", apiRouter);
app.use('/api/files', routes);

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
app.get("/questions/:quiz_id", getQuestionsById)
app.post("questions", postQuestions )

//Question Options
app.get("/question_options/:question_id", getOptionsByQuestionId)
app.post("question_opitons", postOptions)


//Attempted answers
app.get("/attempt_answer/:question_options_id", getAnswerAttemptByOptionId)
app.post("attempt_answer/:question_options_id", postAnswerAttemptByOptionId)


//Quiz attempt
app.post("/attempt", postQuizAttempt)
app.patch("/attempt/:attempt_id"), updateQuizAttemptById

const { handleServerErrors, 
    handlePsqlErrors, 
    handleCustomErrors,
} = require("./controllers/errors.controller")



//ERROR HANDLING
app.all("*", (req, res) => {
    res.status(404).send({ msg: "Path not found" });
  });

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;