import { Request, Response } from "express";
import { pool } from "../models/Pool.js";
import crypto from "crypto";
import { makeErrRes } from "../utils/ServerResponseUtils.js";

// Import types
import { PoolConnection } from "mysql2/promise";
import type { Credentials } from "../models/User.model.js";
import type { ServerResponse } from "../utils/ServerResponseUtils.js";

// Import validation functions
import { validEmail, validPassword } from "../type_validations/AuthValidation.js";
import { hashPassword } from "../utils/AuthUtils.js";

// Import functions to query the db
import { get_user_credentials } from "../models/User.model.js";

export async function signinUser(req: Request, res: Response): Promise<void> {
  const email: string = req.body?.email;
  const password: string = req.body?.password;

  console.log(`Signing in with email: ${email} and password: ${password}`);

  // Validate inputs
  let response: ServerResponse = validEmail(email);
  if (response.success) {
    response = validPassword(password);
    if (response.success) {
      // Get the credentials for the password
      let connection: PoolConnection | undefined;
      try {
        connection = await pool.getConnection();
        const credentials: Credentials | undefined = await get_user_credentials(connection, email);
        if (credentials !== undefined) {
          console.log("A user exists with that email");
          // Hash the password with the correct salt and compare the hashes
          const hash: Buffer = await hashPassword(password, credentials.password_salt);
          if (crypto.timingSafeEqual(hash, credentials.password_hash)) {
            console.log("Correct username and password");
            // TODO: Create a session and send back a session id
            response.statusCode = 201;
          } else {
            // Incorrect password
            console.log("Incorrect password");
            response = makeErrRes(401, undefined, "Incorrect email or password");
          }
        } else {
          // No user exists with that email
          console.log("No user exists wit that email");
          response = makeErrRes(401, undefined, "Incorrect email or password");
        }
      } catch (error) {
        response = makeErrRes(500, undefined, "Error verifying the user input");
      } finally {
        if (connection !== undefined) {
          connection.release();
        }
      }
    }
  }

  res.status(response.statusCode).json(response);
}
