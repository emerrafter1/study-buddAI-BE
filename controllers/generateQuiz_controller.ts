import { Request, Response } from "express";
import { createQuiz } from "../generateQuizTest";

const generateQuiz = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    // Validate all fields exist
    if (!req.body.user_id || !req.body.quiz_name || !req.body.file_id) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const quiz_id = await createQuiz({
      user_id: Number(req.body.user_id),
      quiz_name: req.body.quiz_name,
      file_id: Number(req.body.file_id),
    });

    

    res.status(201).send({quiz_id});
    return;
  } catch (error) {
    console.error("Quiz-specific error:", error);
    res.status(500).json({
      error: "Quiz generation failed",
      details:
        error instanceof Error && error.message.includes("quiz")
          ? error.message
          : "Internal error",
    });
    return;
  }
};

export default generateQuiz;
