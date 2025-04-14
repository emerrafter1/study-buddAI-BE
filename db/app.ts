require("dotenv").config()
import express from "express";
import cors from "cors";
import apiRouter = require()
const app = express()
app.use(cors())
const { getEndpoints } = require(./controllers/endpoints.controller)
const { postUsers} = require("./controllers/users.controller")



//Users
app.post("/users", postUsers)

//PDF files
app.post("/files")
app.post("/upload")

//Quizzes
app.post("/quizzes") 
app.get("/quizzes/:user_id")
app.patch("/quizzes/:quiz_id")
app.delete("/quizzes/:quid_id") // to be added later




const { handleServerErrors, 
    handlePsqlErrors, 
    handleCustomErrors,
} = require("./controllers/errors.controller")

//ERROR HANDLING
app.all("*", req, res => {
    res.status(404).send({msg: "Path not found"})
})

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;