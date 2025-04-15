import db from "../db/connection"
import { Request, Response } from 'express';
import { extractTextFromPdf } from '../services/pdfParse';
import { insertFileData } from '../models/files_model';
import { PDFDocument } from '../types/pdfTypes';

export const  uploadFiles= async (
    req: Request,
    res: Response,
  ): Promise<void> => {
 
  if (!req.file) {
       res.status(400).json({ error: 'No PDF uploaded' });
       return;
    }
   
    let dbConnection= await db.getConnection()

    try {
      const result: { text: string } = await extractTextFromPdf(req.file.buffer);
      const text = result.text;
      const doc:PDFDocument = {
        file_text:text,
    };
  
    await insertFileData(doc);
    res.json({success: true, message: 'PDF processed and saved successfully'})
    .end();
  
    } catch (error) {
      console.error('Processing error:', error);
       res.status(500).json({
        error: error instanceof Error ? error.message : 'PDF processing failed'
      });
    } finally {
      if (dbConnection) {
        if ('release' in dbConnection) {
          if (typeof dbConnection.release === 'function') {
            dbConnection.release();
          }
        }
      }
    }
    }
  