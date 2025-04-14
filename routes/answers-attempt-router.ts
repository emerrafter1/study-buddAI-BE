const { getAnswerAttemptByOptionId, postAnswerAttemptByOptionId } = require("../controllers/answers_attempt_controller")

answersAttemptRouter
    .route("/attempt_answer/:question_options_id")
    .get(getAnswerAttemptByOptionId)
    .post(postAnswerAttemptByOptionId)


module.exports = answersAttemptRouter;