import mysql, { Pool, PoolOptions } from "mysql2/promise";
import type { PoolConnection } from "mysql2/promise";
import { CustomError } from "../utils/CustomError.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

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

/* Setup the express session store */

import session from "express-session";
import MySQLSessionStore from "express-mysql-session";
const MySQLStore = MySQLSessionStore(session as any);

const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  pool as any
);

const sessionOptions: session.SessionOptions = {
  secret: process.env.cookie_secret!,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
};

async function getConnection(): Promise<PoolConnection> {
  try {
    const connection: PoolConnection = await pool.getConnection();
    return connection;
  } catch (err) {
    throw new CustomError(500, null, "Can't connect to the database");
  }
}

export { getConnection, sessionStore, sessionOptions };
