import { Request, Response } from "express";
import { pool } from "../database/Pool.js";
import crypto from "crypto";

// Import validation functions
import { validUsername, validEmail, validPassword } from "../type_validations/AuthValidation.js";

// import type { ServerResponse } from "../Server.js";
import { PoolConnection } from "mysql2/promise";

export type ServerResponse = {
  success: boolean;
  statusCode: number;
  data?: any;
  invalidFeild?: string;
  errorMessage?: string;
};

async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

async function emailExists(connection: PoolConnection, email: string): Promise<Boolean> {
  const [MySQLResponse] = (await connection.query("CALL email_exists(?)", [email])) as any;
  return Boolean(MySQLResponse[0][0].result);
}

async function usernameExists(connection: PoolConnection, username: string): Promise<Boolean> {
  const [MySQLResponse] = (await connection.query("CALL username_exists(?)", [username])) as any;
  return Boolean(MySQLResponse[0][0].result);
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const username: string = req.body?.username;
  const email: string = req.body?.email;
  const password: string = req.body?.password;

  // Check username, email, and password are valid
  let response: ServerResponse = validUsername(username);
  if (response.success) {
    response = validEmail(email);
    if (response.success) {
      response = validPassword(password);
      if (response.success) {
        // Create a connection
        let connection: PoolConnection | undefined;
        try {
          connection = await pool.getConnection();
          // Check username and email don't already exist
          if (!(await usernameExists(connection, username))) {
            if (!(await emailExists(connection, email))) {
              // Generate the salt and hash
              const salt = crypto.randomBytes(16);
              const hash = await hashPassword(password, salt);
              // Create the user in the db
              await connection.query("CALL create_user(?, ?, ?, ?)", [username, email, salt, hash]);
              response.success = true;
              response.statusCode = 201;
            } else {
              response = makeErrRes(409, "email", "that email already exists");
            }
          } else {
            response = makeErrRes(409, "username", "that username already exists");
          }
        } catch (error) {
          response = makeErrRes(500, undefined, "Error communicating with the database");
        } finally {
          if (connection !== undefined) {
            connection.release();
          }
        }
      }
    }
  }

  res.status(response.statusCode).json(response);
}

export function makeErrRes(code: number, feild: string | undefined, message: string): ServerResponse {
  let response: ServerResponse;
  if (typeof feild === "undefined") {
    response = { success: false, statusCode: code, errorMessage: message };
  } else {
    response = { success: false, statusCode: code, invalidFeild: feild, errorMessage: message };
  }
  return response;
}
