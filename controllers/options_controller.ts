import { Request, Response, NextFunction } from "express";
import { insertQuestionOption } from "../models/options_model";
import { error } from "console";

// export const getOptionsByQuestionId = async () => {}

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
    console.log(err)
    next(err);
  }
};
