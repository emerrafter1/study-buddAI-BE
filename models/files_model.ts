import { QueryResult } from "mysql2";
import db from "../db/connection";
import { PDFDocument } from "../types/pdfTypes";

// Inserts PDF document data into the database
// params doc PDF document data including file_text
// returns Promise with insert result

const insertFileData = async (text:string) => {
  let dbConnection = await db.getConnection();

  try {
    const [result] = await dbConnection.execute(
      `INSERT INTO files 
       (file_text, user_id)
       VALUES (?, 2)`,
      [text]
    );
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw new Error("Failed to insert PDF data");
  } finally {
    if (dbConnection)dbConnection.release() 
  }
};
// Gets a PDF document by ID
// params id quiz ID
// returns Promise with document data
const getFileData = async (quiz_id: number) => {
  const dbConnection = await db.getConnection();

  try {
    const [rows] = await dbConnection.execute(
      `SELECT file_text FROM files WHERE quiz_id = ?`,
      [quiz_id]
    );
    return rows[0];
  } finally {
    if (dbConnection) dbConnection.release();
  }
};

export default {
  insertFileData,
  getFileData,
};
