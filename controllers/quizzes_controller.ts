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
  const { quiz_name } = req.body;
  const {user_id} = req.params
  const userId = Number(user_id)

 

  try {
    const quiz = await createQuiz(userId, quiz_name);
    res.status(201).send({ quiz });
  } catch (err) {
   
    next(err);
  }
};