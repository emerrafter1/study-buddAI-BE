import db from "../db/connection";

//Inserts PDF document data into the database
//PDF document data including file_text
//returns Promise with insert result

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

export default {
  insertFileData,
};
