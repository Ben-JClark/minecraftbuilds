import mysql, { Pool, PoolOptions } from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const poolConfig: PoolOptions = {
  host: process.env.db_host,
  port: parseInt(process.env.db_port!),
  database: process.env.db_name,
  user: process.env.db_username,
  password: process.env.db_password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool: Pool = mysql.createPool(poolConfig);

export { pool };
