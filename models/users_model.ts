import db from "../db/connection";

interface NewUser {
  username: string;
  email: string;
  password: string;
}

export const insertUser = async ({
  username,
  email,
  password,
}: NewUser) => {
  if (!username || !email || !password) {
    return Promise.reject({ status: 400, msg: "Missing required fields" });
  }

  try {
    // Check for existing user by username or email_address
    const [existingRows]: [any[], any] = await db.query(
      `SELECT * FROM users WHERE username = ? OR email_address = ?`,
      [username, email]
    );

    if (existingRows.length > 0) {
      return Promise.reject({ status: 409, msg: "Username or email already exists" });
    }

    // Insert the new user
    await db.query(
      `INSERT INTO users (username, password, email_address)
       VALUES (?, ?, ?)`,
      [username, password, email]
    );

    // Fetch the newly created user, selecting the correct column name
    const [userRows]: [any[], any] = await db.query(
      `SELECT user_id, username, email_address AS email FROM users WHERE username = ?`,
      [username]
    );

    return userRows[0];

  } catch (error: any) {
    console.error("Database error in insertUser:", error);
    return Promise.reject({ status: 500, msg: "Internal Server Error - Database issue" });
  }
};