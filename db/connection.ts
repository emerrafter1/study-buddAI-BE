
import { createPool, PoolOptions } from "mysql2/promise";
import * as dotenv from "dotenv";
import * as path from "path";

const ENV = process.env.NODE_ENV || "development";

const envPath = path.resolve(__dirname, `../.env.${ENV}`);
dotenv.config({ path: envPath });

if (!process.env.MYSQL_DATABASE) {
  throw new Error("No MYSQL_DATABASE configured");
}

const config: PoolOptions = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: ENV === "production" ? 2 : 10,
  queueLimit: 0
};

const db = createPool(config);
export default db;