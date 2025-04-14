const { postQuizzes, getQuizByUserId, updateQuizById, deleteQuizById } = require("../controllers/quizzes_controller")
  
  quizzesRouter
    .route("/quizzes")
    .post(postQuizzes);
  
  quizzesRouter
    .route("/:user_id")
    .get(getQuizByUserId)

  
  quizzesRouter
    .route("/:quiz_id")
    .patch(updateQuizById)
    .delete(deleteQuizById);
  
  module.exports = quizzesRouter;
  