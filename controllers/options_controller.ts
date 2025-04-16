import { Request, Response, NextFunction } from "express";
import { insertQuestionOption,fetchQuestionOptions } from "../models/options_model";



 export const getOptionsByQuestionId = async ( req: Request,
    res: Response,
    next: NextFunction) => {

        const { question_id } = req.params;

        const questionId = Number(question_id)


  try {
    const questionOptions = await fetchQuestionOptions(questionId);
    res.status(200).send({ questionOptions });
  } catch (err) {
    next(err);
  }


    }

export const postOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question_id, option_body, is_correct, label } = req.body;

  try {
    const questionOption = await insertQuestionOption(
      question_id,
      option_body,
      is_correct,
      label
    );
    res.status(201).send({ questionOption });
  } catch (err) {
    next(err);
  }
};
