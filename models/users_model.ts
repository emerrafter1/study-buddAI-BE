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

  // Check for existing user by username or email
  const [existingRows]: [any[], any] = await db.query(
    `SELECT * FROM users WHERE username = ? OR email = ?`,
    [username, email]
  );

  if (existingRows.length > 0) {
    return Promise.reject({ status: 409, msg: "Username or email already exists" });
  }

  // Insert the new user
  await db.query(
    `INSERT INTO users (username, email, password)
     VALUES (?, ?, ?)`,
    [username, email, password]
  );

  // Fetch the newly created user
  const [userRows]: [any[], any] = await db.query(
    `SELECT user_id, username, email FROM users WHERE username = ?`,
    [username]
  );

  return userRows[0];
};
