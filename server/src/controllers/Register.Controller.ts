import { NextFunction, Request, Response } from "express";
import { getConnection } from "../models/Pool.js";
import crypto from "crypto";
import { CustomError } from "../utils/CustomError.js";
import { validUsername, validEmail, validPassword } from "../type_validations/AuthValidation.js";
import { hashPassword } from "../utils/AuthUtils.js";
import { create_user, email_exists, username_exists } from "../models/User.model.js";

/**
 * Inserts a new user into the database with the credentials in the request body
 * @param req contains the username, email, and password in the body
 */
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const username: string = req.body?.username;
  const email: string = req.body?.email;
  const password: string = req.body?.password;

  validUsername(username);
  validEmail(email);
  validPassword(password);

  let connection;
  try {
    connection = await getConnection();
  } catch (err) {
    return next(err);
  }

  try {
    // Check username and email don't already exist
    if (!(await username_exists(connection, username))) {
      if (!(await email_exists(connection, email))) {
        // Generate the salt and hash
        const salt = crypto.randomBytes(16);
        const hash = await hashPassword(password, salt);
        await create_user(connection, username, email, salt, hash);
        res.status(201).send();
      } else {
        return next(new CustomError(409, "email", "that email already exists"));
      }
    } else {
      return next(new CustomError(409, "username", "that username already exists"));
    }
  } finally {
    connection.release();
  }
}
