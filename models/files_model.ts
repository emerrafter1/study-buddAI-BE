
import db from "../db/connection";

const insertFileData = async (text:string, user_id:number) => {
  let dbConnection = await db.getConnection();

  try {
    const [result]: any = await dbConnection.execute(
      `INSERT INTO files 
       (file_text, user_id)
       VALUES (?, ?)`,
      [text, user_id]
    );
  return { file_id: result.insertId };

  } catch (error) {
    console.error("Database insertion error:", error);
    throw new Error("Failed to insert PDF data");
    
  } finally {
    dbConnection.release() 
  }
};


export default 
  insertFileData
;
