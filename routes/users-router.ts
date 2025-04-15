import { Router } from "express";
import { postUsers } from "../controllers/users_controller";

const usersRouter = Router();

// POST /users - create a new user
usersRouter.post("/", postUsers);

export default usersRouter;
