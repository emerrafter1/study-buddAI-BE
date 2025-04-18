
import db from "../db/connection";

const insertFileData = async (text:string, user_id:number) => {
  let dbConnection = await db.getConnection();

  try {
    const [query] = await dbConnection.execute(
      `INSERT INTO files 
       (file_text, user_id)
       VALUES (?, ?)`,
      [text, user_id]
    );
    return query;

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
