const { postUsers } = require("../controllers/users_controller")

usersRouter
.route("/users")
.post(postUsers)


module.exports(usersRouter)