import { validVarchar } from "./MysqlTypeValidation.js";
import { CustomError } from "../utils/CustomError.js";

/**
 * Validates the username
 * Throws a CustomError(400,"username","message")
 * @param username
 */
function validUsername(username: unknown): void {
  try {
    validVarchar(username, 1, 16);
  } catch (err: unknown) {
    throw new CustomError(400, "username", err instanceof CustomError ? err.message : "something went wrong");
  }
}

/**
 * Validates the email
 * Throws a CustomError(400,"email","message")
 * @param email
 */
function validEmail(email: unknown): void {
  try {
    validVarchar(email, 3, 255);
  } catch (err: unknown) {
    throw new CustomError(400, "email", err instanceof CustomError ? err.message : "something went wrong");
  }
}

/**
 * Validates the password
 * Throws a CustomError(400,"password","message")
 * @param password
 */
function validPassword(password: unknown): void {
  try {
    validVarchar(password, 8, 255);
  } catch (err: unknown) {
    throw new CustomError(400, "password", err instanceof CustomError ? err.message : "something went wrong");
  }
}

export { validUsername, validEmail, validPassword };
