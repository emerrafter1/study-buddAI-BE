import uploadFiles from "../controllers/files_controller";
import express from "express";

export const filesRouter = express.Router();
  
  filesRouter
    .route("/upload")
    .post(uploadFiles);
  


