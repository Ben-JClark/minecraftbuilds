import type { PoolConnection } from "mysql2/promise";
import type { ServerResponse } from "../utils/ServerResponseUtils.js";
import { Request, Response } from "express";
import { pool } from "../models/Pool.js";
import crypto from "crypto";
import { makeErrRes } from "../utils/ServerResponseUtils.js";

// Import validation functions
import { validUsername, validEmail, validPassword } from "../type_validations/AuthValidation.js";
import { hashPassword } from "../utils/AuthUtils.js";

// Import functions to query the db
import { create_user, email_exists, username_exists } from "../models/User.model.js";

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
          if (!(await username_exists(connection, username))) {
            if (!(await email_exists(connection, email))) {
              // Generate the salt and hash
              const salt = crypto.randomBytes(16);
              const hash = await hashPassword(password, salt);
              await create_user(connection, username, email, salt, hash);
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
