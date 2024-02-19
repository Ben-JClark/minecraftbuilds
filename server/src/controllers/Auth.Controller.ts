import { Request, Response } from "express";
import { pool } from "../database/Pool.js";
import crypto from "crypto";

// Import validation functions
import { validUsername, validEmail, validPassword } from "../type_validations/AuthValidation.js";

import type { ServerResponse } from "../Server.js";

export async function signupUser(req: Request, res: Response): Promise<void> {
  // Check username, email, and password are valid
  const username: string = req.body?.username;
  const email: string = req.body?.email;
  const password: string = req.body?.password;
  let response: ServerResponse = validUsername(username);
  if (response.success) {
    response = validEmail(email);
    if (response.success) {
      response = validPassword(password);
      if (response.success) {
        let connection;
        try {
          connection = await pool.getConnection();

          // Check if the username already exists
          const [MySQLResponse] = (await connection.query("CALL username_exists(?)", [username])) as any;
          const uExists: Boolean = Boolean(MySQLResponse[0][0].result);
          if (uExists === false) {
            // Check if the email already exists
            const [MySQLResponse] = (await connection.query("CALL email_exists(?)", [email])) as any;
            const eExists: Boolean = Boolean(MySQLResponse[0][0].result);
            if (eExists === false) {
              // Generate teh salt and hash
              const salt = crypto.randomBytes(16);
              const hash = await hashPassword(password, salt);

              // Create the user in the db
              const [MySQLResponse] = (await connection.query("CALL create_user(?, ?, ?, ?)", [
                username,
                email,
                hash,
                salt,
              ])) as any;
              const createdUser: Boolean = Boolean(MySQLResponse[0][0].result);

              if (createdUser) {
                response.success = true;
              } else {
                response = makeErrRes(500, undefined, "Couldn't add the new user in the database");
              }
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

function makeErrRes(code: number, feild: string | undefined, message: string): ServerResponse {
  let response: ServerResponse;
  if (typeof feild === "undefined") {
    response = { success: false, statusCode: code, errorMessage: message };
  } else {
    response = { success: false, statusCode: code, invalidFeild: feild, errorMessage: message };
  }
  return response;
}

async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}
