import { Request, Response } from "express";
import  extractTextFromPdf from "../services/pdfParse";
import { NextFunction } from "express-serve-static-core";
import insertFileData from "../models/files_model";

const uploadFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Upload request received. File exists?', !!req.file);
    if (!req.file) {
      res.status(400).json({ error: "No PDF uploaded" });
      return; 
    }

    const fileStart = req.file.buffer.toString('utf8', 0, 8);
    if (!fileStart.includes('%PDF')) {
       res.status(400).json({ 
        error: "Not a valid PDF file",
        details: `File starts with: ${fileStart.substring(0, 20)}`
      });
      return;
      
    }
    console.log('File metadata:', {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Process the PDF
    const { text } = await extractTextFromPdf(req.file.buffer);
    await insertFileData.insertFileData(text);

    res.status(201).json({
      success: true,
      message: "PDF text saved to database",
    });
  } catch (err) {
    console.error("PDF extraction failed:", err);
    res.status(500).json({ 
      error: "PDF processing failed.",
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
};

export default uploadFiles;
