const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.db_host,
  port: process.env.db_port,
  database: process.env.db_name,
  user: process.env.db_username,
  password: process.env.db_password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };
