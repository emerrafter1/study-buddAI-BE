import pdf from 'pdf-parse';
// import path from 'path';
// // import { PDFDocument } from '../types/pdfTypes';
// // import fileUpload from 'express-fileupload';


export const extractTextFromPdf = async (buffer: Buffer): Promise<{ text: string; }> => {
  const { text } = await pdf(buffer);
  return {
    text,  
  }
};
