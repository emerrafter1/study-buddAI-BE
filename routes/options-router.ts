const { getOptionsByQuestionId, postOptions } = require("../controllers/options_controller")

optionsRouter
    .route("question_options/")
    .post(postOptions)

optionsRouter
    .route("/:question_id")
    .get(getOptionsByQuestionId)

module.exports = optionsRouter;