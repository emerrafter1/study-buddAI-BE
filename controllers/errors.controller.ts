import { Request, Response, NextFunction } from "express";

interface Error {
    code?: string;
    status?: number;
    msg?: string;
}


const handlePsqlErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err.code === "22P02") {
         res.status(400).send({ msg: "Bad request" });
    }
    next(err);
};

interface CustomError extends Error {
    status: number;
    msg: string;
}

const handleCustomErrors = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    if (err.status) {
         res.status(err.status).send({ msg: err.msg });
    }
    next(err);
};

interface ServerError extends Error {}

const handleServerErrors = (err: ServerError, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).send({ msg: "Something went wrong!" });
};

export default { handleCustomErrors, handlePsqlErrors, handleServerErrors }