import { Request, Response, NextFunction } from "express";

const multerErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err.message === "Not a valid PDF file") {
       res.status(400).json({ error: "Not a valid PDF file" });
       return
    }
  
    next(err);
  };
  

export default multerErrorHandler;
