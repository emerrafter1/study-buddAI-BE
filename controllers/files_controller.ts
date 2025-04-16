import { Request, Response } from "express";
import  extractTextFromPdf from "../services/pdfParse";
import insertFileData from "../models/files_model";

const uploadFiles = async (req: Request, res: Response): Promise<void> => {
  console.log("DEBUG - File received:", {
    originalname: req.file?.originalname,
    mimetype: req.file?.mimetype,
    size: req.file?.size,
  });
  try {
    if (!req.file) {
       res.status(400).json({ error: "No PDF uploaded" });
       return
    }
    
    const { mimetype, buffer } = req.file;

    const isMimePdf = mimetype === "application/pdf";
    const fileStart = buffer.toString("utf8", 0, 8);
    const isHeaderPdf = fileStart.includes("%PDF");
    if (!isMimePdf || !isHeaderPdf) {
     ;
       res.status(400).json({ error: "Not a valid PDF file" });
       return
    }
    // Process PDF
    const { text } = await extractTextFromPdf(req.file.buffer);
    await insertFileData.insertFileData(text);


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
