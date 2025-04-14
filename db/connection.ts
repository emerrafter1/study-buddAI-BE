import mysql from "mysql2/promise";
import path from "path";
import dotenv from "dotenv";

// Determine environment
const ENV = process.env.NODE_ENV || "development";

// Load environment variables from appropriate .env file
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

// Ensure required environment variables are present
if (!process.env.MYSQL_DATABASE || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD) {
  throw new Error("Required MySQL environment variables not set");
}

// Build MySQL connection config
const config: mysql.PoolOptions = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: ENV === "production" ? 2 : 10,
  queueLimit: 0
};

// Create and export the MySQL connection pool
const pool = mysql.createPool(config);

export default pool;
