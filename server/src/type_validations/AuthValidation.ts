import { validVarchar } from "./MysqlTypeValidation.js";
import type { ServerResponse } from "../Server.js";

function validUsername(username: unknown): ServerResponse {
  let response: ServerResponse = validVarchar(username, 1, 16);
  if (response.success === false) {
    response.invalidFeild = "username";
  }
  return response;
}

function validEmail(email: unknown): ServerResponse {
  let response: ServerResponse = validVarchar(email, 3, 255);
  if (response.success === false) {
    response.invalidFeild = "email";
  }
  return response;
}

function validPassword(password: unknown): ServerResponse {
  let response: ServerResponse = validVarchar(password, 8, 255);
  if (response.success === false) {
    response.invalidFeild = "password";
  }
  return response;
}

export { validUsername, validEmail, validPassword };
