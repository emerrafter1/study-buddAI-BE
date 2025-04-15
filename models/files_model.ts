// import db from "../db/connection";
// import { PDFDocument } from '../types/pdfTypes';

// export const insertFileData = async (
//   doc:PDFDocument
// ): Promise<void> => {
  
//   let dbConnection = await db.getConnection();
  
//   try {
   
//     if (!dbConnection) {
//       throw new Error('Database connection failed');
//     }

//   const [result] = await dbConnection.execute(
//       `INSERT INTO pdf_documents 
//        (original_name, file_text)
//        VALUES (?, ?)`,
//       [
//         doc.file_text,
       
//       ]
//     );
//     console.log('Insert successful. Rows affected:', 
//       'insertId' in result ? result.insertId : 0);
//   } catch (error) {
//     console.error('Database insertion error:', error);
//     throw new Error('Failed to insert PDF data');

//   } finally {
//     if (dbConnection) {
//       if ('release' in dbConnection) {
//         if (typeof dbConnection.release === 'function') {
//           dbConnection.release();
//         }
//       }
//     }
//   }
// }
