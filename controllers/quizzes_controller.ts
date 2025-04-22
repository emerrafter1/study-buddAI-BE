import { Request, Response, NextFunction } from "express";
import { fetchUserQuizzes, insertQuiz } from "../models/quizzes_model";
import { createQuiz } from "../generateQuiz";

// export const postQuizzes = async () => {}

export const getQuizByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;

  const userId = Number(user_id);

  try {
    const quizzes = await fetchUserQuizzes(userId);
    res.status(200).send({ quizzes });
  } catch (err) {
    next(err);
  }
};

export const postQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, quiz_name, file_id } = req.body;

  try {
    const quiz = await insertQuiz(user_id, quiz_name, file_id);
    res.status(201).send({ quiz });
  } catch (err) {
   
    next(err);
  }
};


export const generateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log('Received request with:', {
    params: req.params,
    body: req.body
  })
  const { quiz_name, file_id } = req.body;
  const {user_id} = req.params
  const userId = Number(user_id)
  const fileId = Number(file_id)

  try {
    const quiz = await createQuiz(userId, quiz_name, fileId);
    res.status(201).send({ quiz });
  } catch (err) {
    console.error('FULL ERROR:', err)
    next(err);
  }
};


