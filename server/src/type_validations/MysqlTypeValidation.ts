import type { ServerResponse } from "../utils/ServerResponseUtils.js";

/**
 * Defines the max values of Unsigned Integers MySQL supports
 */
export enum IntUnsignedMax {
  UnsignedSmallIntMax = 65535,
  UnsignedMediumIntMax = 16777215,
}

/**
 * Defines the max values of signed Integers MySQL supports
 */
export enum IntSignedMax {
  SignedSmallIntMax = 32767,
  SignedMediumIntMax = 8388607,
}

/**
 * Tests the input string to make sure it suits MySQL VARCHAR datatype and is within the length
 * @param input the string we want to veryify
 * @param minLength the minimum lenth of the string
 * @param maxLength the maximum length of the string
 * @returns ServerResponse where success is true or false, errorMessage states why success is false
 */
function validVarchar(input: unknown, minLength: number, maxLength: number): ServerResponse {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };
  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "string")
        if (input.length >= minLength) {
          if (input.length <= maxLength) {
            response.success = true;
          } else {
            response.errorMessage = `Your input is too long! must enter less than ${maxLength} ${
              maxLength > 1 ? "characters" : "character"
            }.`;
          }
        } else {
          response.errorMessage = `Your input is too short! You must enter more than ${minLength} ${
            minLength > 1 ? "characters" : "character"
          }.`;
        }
      else {
        response.errorMessage = `Your input must be of type string`;
      }
    } else {
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.success === false) {
    response.statusCode = 400;
  }

  return response;
}

/**
 * Tests the input number to make sure it suits specified MySQL INT UNSIGNED datatype
 * @param input the number we want to test
 * @param intUnsignedMax the INT UNSIGNED type that we are testing
 * @returns ValidationResult where isValid is true or false, errorMessage states why inValid is false
 */
function validUnsignedInt(input: unknown, intUnsignedMax: IntUnsignedMax): ServerResponse {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "number") {
        if (Number.isInteger(input)) {
          if (input >= 0) {
            if (input <= intUnsignedMax) {
              response.success = true;
            } else {
              response.errorMessage = `Your input is too big! Keep it below ${intUnsignedMax}`;
            }
          } else {
            response.errorMessage = `Your input cannot be negative!`;
          }
        } else {
          response.errorMessage = `Your input must be a whole number`;
        }
      } else {
        response.errorMessage = `Your input must be a number type`;
      }
    } else {
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.success === false) {
    response.statusCode = 400;
  }

  return response;
}

/**
 * Tests the input number to make sure it suits specified MySQL INT SIGNED datatype
 * @param input the number we want to test
 * @param intShignedMax the INT SIGNED type that we are testing
 * @returns ValidationResult where isValid is true or false, errorMessage states why inValid is false
 */
function validSignedInt(input: unknown, intSignedMax: IntSignedMax): ServerResponse {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "number") {
        if (Number.isInteger(input)) {
          if (input >= -intSignedMax) {
            if (input <= intSignedMax) {
              response.success = true;
            } else {
              response.errorMessage = `Your input is too big! Keep it below ${intSignedMax}`;
            }
          } else {
            response.errorMessage = `Your input is too small! Keep it above ${-intSignedMax}`;
          }
        } else {
          response.errorMessage = `Your input must be a whole number`;
        }
      } else {
        response.errorMessage = `Your input must be a number type`;
      }
    } else {
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.success === false) {
    response.statusCode = 400;
  }

  return response;
}

function validBoolean(input: unknown): ServerResponse {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "boolean" || (typeof input === "number" && (input === 1 || input === 0))) {
        response.success = true;
      } else {
        response.errorMessage = "Your input must be true, false, 1, or 0";
      }
    } else {
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.success === false) {
    response.statusCode = 400;
  }

  return response;
}

export { validVarchar, validSignedInt, validUnsignedInt, validBoolean };
export type { ServerResponse };
