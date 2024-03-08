import { CustomError } from "../utils/CustomError.js";

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
 * @param errorFeild if an error is thrown, the
 * @returns true if the input is valid, otherwise an error is thrown containing a string message
 */
function validVarchar(input: unknown, minLength: number, maxLength: number): void {
  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "string")
        if (input.length >= minLength) {
          if (input.length <= maxLength) {
            return;
          } else {
            throw new CustomError(
              null,
              null,
              `input is too long, it be less than ${maxLength} ${maxLength > 1 ? "characters" : "character"}.`
            );
          }
        } else {
          throw new CustomError(
            null,
            null,
            `input is too short, it must be at least ${minLength} ${minLength > 1 ? "characters" : "character"}.`
          );
        }
      else {
        throw new CustomError(null, null, "input must be of type string");
      }
    } else {
      throw new CustomError(null, null, "input can't be null");
    }
  } else {
    throw new CustomError(null, null, "input cannot be undefined");
  }
}

/**
 * Tests the input number to make sure it suits specified MySQL INT UNSIGNED datatype
 * @param input the number we want to test
 * @param intUnsignedMax the INT UNSIGNED type that we are testing
 * @returns true if the input is valid, otherwise an error is thrown containing a string message
 */
function validUnsignedInt(input: unknown, intUnsignedMax: IntUnsignedMax): void {
  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "number") {
        if (Number.isInteger(input)) {
          if (input >= 0) {
            if (input <= intUnsignedMax) {
              return;
            } else {
              throw new CustomError(null, null, `input is too big, keep it below ${intUnsignedMax}`);
            }
          } else {
            throw new CustomError(null, null, "input cannot be negative");
          }
        } else {
          throw new CustomError(null, null, "input must be a whole number");
        }
      } else {
        throw new CustomError(null, null, "input must be a number type");
      }
    } else {
      throw new CustomError(null, null, "input can't be null");
    }
  } else {
    throw new CustomError(null, null, "input cannot be undefined");
  }
}

/**
 * Tests the input number to make sure it suits specified MySQL INT SIGNED datatype
 * @param input the number we want to test
 * @param intShignedMax the INT SIGNED type that we are testing
 * @returns true if the input is valid, otherwise an error is thrown containing a string message
 */
function validSignedInt(input: unknown, intSignedMax: IntSignedMax): void {
  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "number") {
        if (Number.isInteger(input)) {
          if (input >= -intSignedMax) {
            if (input <= intSignedMax) {
              return;
            } else {
              throw new CustomError(null, null, `input is too big, Keep it below ${intSignedMax}`);
            }
          } else {
            throw new CustomError(null, null, `input is too small, Keep it above ${-intSignedMax}`);
          }
        } else {
          throw new CustomError(null, null, "input must be a whole number");
        }
      } else {
        throw new CustomError(null, null, "input must be a number type");
      }
    } else {
      throw new CustomError(null, null, "input can't be null");
    }
  } else {
    throw new CustomError(null, null, "input cannot be undefined");
  }
}

/**
 * Tests the input number to make sure it suits specified MySQL BOOL datatype
 * @param input the input we want to test
 * @returns true if the input is valid, otherwise an error is thrown containing a string message
 */
function validBoolean(input: unknown): void {
  if (input !== undefined) {
    if (input !== null) {
      if (typeof input === "boolean" || (typeof input === "number" && (input === 1 || input === 0))) {
        return;
      } else {
        throw new CustomError(null, null, "input must be true, false, 1, or 0");
      }
    } else {
      throw new CustomError(null, null, "input can't be null");
    }
  } else {
    throw new CustomError(null, null, "input cannot be undefined");
  }
}

export { validVarchar, validSignedInt, validUnsignedInt, validBoolean };
