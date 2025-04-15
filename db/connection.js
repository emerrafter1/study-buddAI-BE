"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("mysql2/promise");
var dotenv = require("dotenv");
var path = require("path");
var ENV = process.env.NODE_ENV || "development";
var envPath = path.resolve(__dirname, "../.env.".concat(ENV));
dotenv.config({ path: envPath });
if (!process.env.MYSQL_DATABASE) {
    throw new Error("No MYSQL_DATABASE configured");
}
var config = {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: ENV === "production" ? 2 : 10,
    queueLimit: 0
};
var db = (0, promise_1.createPool)(config);
exports.default = db;
