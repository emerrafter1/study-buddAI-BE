const { getQuestionsById, postQuestions } = require("../controllers/questions_controller")

questionsRouter
    .route("/questions/")
    .get(getQuestionsById)

questionsRouter
    .route("/:quiz_id")
    .post(postQuestions)

module.exports = questionsRouter;