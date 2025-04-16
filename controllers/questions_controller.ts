import { Request, Response, NextFunction } from 'express';
import {fetchQuestionsByQuizId, insertQuestion} from "../models/questions_model"

export const getQuestionsById = async (req: Request, res: Response, next: NextFunction) => {
  
    const { quiz_id } = req.params;
    
    const questions = await fetchQuestionsByQuizId(quiz_id)
    res.status(200).send({ questions });
};


export const postQuestions = async (req: Request, res: Response, next: NextFunction) => {
    const newQuestion = req.body 
        const question = await insertQuestion(newQuestion);
        res.status(201).send({ question });
} 
