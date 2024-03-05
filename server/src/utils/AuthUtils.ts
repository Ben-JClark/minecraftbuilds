import { NextFunction, Request, Response } from "express";
import type { ServerResponse } from "../utils/ServerResponseUtils.js";
import { makeErrRes } from "../utils/ServerResponseUtils.js";
import crypto from "crypto";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    console.log("user is authenticated with user object: ", req.session.user);
    next();
  } else {
    console.log("user is NOT authenticated with user object: ", req.session.user);
    const response: ServerResponse = makeErrRes(401, undefined, "You must sign in to access this content");
    res.status(response.statusCode).json(response);
  }
}

async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

export { hashPassword };
