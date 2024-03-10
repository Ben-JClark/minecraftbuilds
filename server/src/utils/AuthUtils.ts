import { NextFunction, Request, Response } from "express";
import { CustomError } from "./CustomError.js";
import crypto from "crypto";

/**
 * Middleware to check if the user is authorised. If authorised, next will be called.
 * If not authorised a CustomError(401, null, "Not Authorised") will be thrown
 * @param req may contain the session object required
 * @param next called if user is authenticated
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.session.user) {
    next();
  } else {
    throw new CustomError(401, null, "Not Authorised");
  }
}

/**
 * Middleware to check if the user is NOT authorised. If NOT authorised, next will be called.
 * If the use IS authorised a CustomError(401, null, "Already Authorised") will be thrown
 * @param req may contain the session object required
 * @param next called if user is NOT authenticated
 */
export function isNotAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.session.user) {
    throw new CustomError(403, null, "Already Authorised");
  } else {
    next();
  }
}

/**
 * Hashes a password with the provided salt
 * @param password
 * @param salt
 * @returns A new password hash
 */
async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

export { hashPassword };
