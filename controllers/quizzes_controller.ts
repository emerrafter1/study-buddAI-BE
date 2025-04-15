import { Request, Response, NextFunction } from "express";
import { fetchUserQuizzes } from "../models/quizzes_model";

// export const postQuizzes = async () => {}

export const getQuizByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 

  const { user_id } = req.params;
  console.log(user_id);

  const userId = Number(user_id);

  try {
    const quizzes = await fetchUserQuizzes(userId);
    res.status(200).send({ quizzes });
  } catch (err) {
    next(err);
  }
};

// export const updateQuizById = async () => {}

// export const deleteQuizById = async () => {}
