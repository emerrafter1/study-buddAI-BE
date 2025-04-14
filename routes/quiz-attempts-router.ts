const { postQuizAttempt, updateQuizAttemptById } = require("../controllers/quiz_attempts_controller")

quizAttemptsRouter
    .route("/attempt")
    .post(postQuizAttempt)

quizAttemptsRouter
    .route("/attempt/:attempt_id")
    .patch(updateQuizAttemptById)

module.exports = quizAttemptsRouter;