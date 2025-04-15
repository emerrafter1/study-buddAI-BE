import { Request, Response, NextFunction } from "express";
import { insertUser } from "../models/users_model";

const postUsers = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  try {
    const user = await insertUser(newUser);
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

export default postUsers;
