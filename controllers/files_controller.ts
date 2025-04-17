import { Request, Response } from "express";
import  extractTextFromPdf from "../services/pdfParse";
import insertFileData from "../models/files_model";


const uploadFiles = async (req: Request, res: Response): Promise<void> => {

  const file = req.file
  
  try {
    if (!file) {
       res.status(400).json({ error: "No PDF uploaded" });
       return
    }

    const { text } = await extractTextFromPdf(file.buffer);
    const user_id= parseInt(req.body.user_id)
    if (isNaN(user_id)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }
    await insertFileData(text, user_id);


    res.status(201).json({
      success: true,
      message: "PDF text saved to database",
    });
  } catch (err) {
    console.error("PDF extraction failed:", err);
    res.status(500).json({ 
      error: "PDF processing failed."
    });
  }
};

export default uploadFiles;
