import { Request, Response, NextFunction } from "express";
import { insertAttemptAnswer } from "../models/attempt_answers_model";
import { fetchAttemptAnswerByQuestionId } from "../models/attempt_answers_model";

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
    next(err);
  }
};

export const getAttemptAnswerByQuestionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question_id } = req.params;

  const questionId = Number(question_id);

  try {
    const attemptAnswer = await fetchAttemptAnswerByQuestionId(questionId);
    res.status(200).send({ attemptAnswer });
  } catch (err) {
    next(err);
  }
};
