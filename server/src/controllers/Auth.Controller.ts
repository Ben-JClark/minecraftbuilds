import { NextFunction, Request, Response } from "express";
import { getConnection } from "../models/Pool.js";
import crypto from "crypto";
import { CustomError } from "../utils/CustomError.js";
import type { Credentials } from "../models/User.model.js";
import { validEmail, validPassword } from "../type_validations/AuthValidation.js";
import { hashPassword } from "../utils/AuthUtils.js";
import { get_user_credentials } from "../models/User.model.js";

declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      email: string;
    } | null;
  }
}

/**
 * Creates a new session in the database
 * @param req contains the session
 */
export async function signinUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const email: string = req.body?.email;
  const password: string = req.body?.password;

  // Validate inputs
  try {
    validEmail(email);
    validPassword(password);
  } catch (err) {
    return next(err);
  }

  let connection;
  try {
    connection = await getConnection();
  } catch (err) {
    return next(err);
  }
  try {
    const credentials: Credentials | undefined = await get_user_credentials(connection, email);
    if (credentials === undefined) {
      // No user exists with that email
      return next(new CustomError(401, null, "Incorrect email or password"));
    }

    const hash: Buffer = await hashPassword(password, credentials.password_salt);
    if (crypto.timingSafeEqual(hash, credentials.password_hash)) {
      //regenerate the session, guarding agains forms of session fixation
      req.session.regenerate(function (err) {
        if (err) return next(err);
        // store user information in session
        req.session.user = { id: credentials.id, email: email };

        // Ensure session is saved
        req.session.save(function (err) {
          if (err) return next(err);
          res.status(201).send();
        });
      });
    } else {
      return next(new CustomError(401, null, "Incorrect email or password"));
    }
  } finally {
    connection.release();
  }
}

/**
 * Clear the user from the session object and save, ensuring re-using the old session id does not have a logged in user
 * @param req has the session
 */
export async function signout(req: Request, res: Response, next: NextFunction): Promise<void> {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) return next(err);

    //regenerate the session, guarding agains forms of session fixation
    req.session.regenerate(function (err) {
      if (err) return next(err);
      res.status(204).send();
    });
  });
}
