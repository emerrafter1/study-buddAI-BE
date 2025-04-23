import { Request, Response, NextFunction } from "express";
import { insertAttempt } from "../models/attempt_models";
import { generateResults } from "../generateResults";

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

export const postResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attemptId = Number(req.params.attempt_id);
    const result = await generateResults(attemptId);
    res.status(200).send({result});
  } catch (err) {
    // console.log(err)
    next(err);
  }
};