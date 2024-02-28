import { Request, Response } from "express";
import { pool } from "../models/Pool.js";

// Import types
import { PoolConnection } from "mysql2/promise";

export async function signinUser(req: Request, res: Response): Promise<void> {}

export async function emailExists(connection: PoolConnection, email: string): Promise<Boolean> {
  const [MySQLResponse] = (await connection.query("CALL email_exists(?)", [email])) as any;
  return Boolean(MySQLResponse[0][0].result);
}

export async function usernameExists(connection: PoolConnection, username: string): Promise<Boolean> {
  const [MySQLResponse] = (await connection.query("CALL username_exists(?)", [username])) as any;
  return Boolean(MySQLResponse[0][0].result);
}
