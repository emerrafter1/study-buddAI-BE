import { Request, Response, NextFunction } from "express";
import { insertAttemptAnswer } from "../models/attempt_answers_model";

export const postAnswerAttempt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question_options_id, question_id, attempt_id } = req.body;


  try {
    const attemptAnswer = await insertAttemptAnswer(
      question_options_id,
      question_id,
      attempt_id
    );
    res.status(201).send({ attemptAnswer });
  } catch (err) {
    console.log(err)
    next(err);
  }
};
