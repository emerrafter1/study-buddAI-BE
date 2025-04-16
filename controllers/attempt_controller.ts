import { Request, Response, NextFunction } from "express";
import { insertAttempt } from "../models/attempt_models";

export const postAttempt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quiz_id } = req.body;

  try {
    const attempt = await insertAttempt(quiz_id);
    res.status(201).send({ attempt });
  } catch (err) {
    next(err);
  }
};
