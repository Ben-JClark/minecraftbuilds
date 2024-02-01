type ValidationResult = {
  validRequest: boolean;
  statusCode: number;
  invalidFeild?: string;
  errorMessage?: string;
};

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
 * @returns ValidationResult where isValid is true or false, errorMessage states why inValid is false
 */
function validVarchar(input: any, minLength: number, maxLength: number): ValidationResult {
  let response: ValidationResult = {
    validRequest: false,
    statusCode: 500,
  };
  if (input !== undefined) {
    if (input !== null) {
      if (input.length >= minLength) {
        if (input.length <= maxLength) {
          response.validRequest = true;
        } else {
          response.errorMessage = `Your input is too long! must enter less than ${maxLength} ${
            maxLength > 0 ? "characters" : "character"
          }.`;
        }
      } else {
        response.errorMessage = `Your input is too short! You must enter more than ${minLength} ${
          minLength > 0 ? "characters" : "character"
        }.`;
      }
    } else {
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.validRequest === false) {
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
function validUnsignedInt(input: any, intUnsignedMax: IntUnsignedMax): ValidationResult {
  let response: ValidationResult = {
    validRequest: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (Number.isInteger(input)) {
        if (input >= 0) {
          if (input <= intUnsignedMax) {
            response.validRequest = true;
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
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.validRequest === false) {
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
function validSignedInt(input: any, intSignedMax: IntSignedMax): ValidationResult {
  let response: ValidationResult = {
    validRequest: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (Number.isInteger(input)) {
        if (input >= -intSignedMax) {
          if (input <= intSignedMax) {
            response.validRequest = true;
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
      response.errorMessage = "Your input can't be null";
    }
  } else {
    response.errorMessage = "Your input cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.validRequest === false) {
    response.statusCode = 400;
  }

  return response;
}

function validBoolean(input: any) {
  let response: ValidationResult = {
    validRequest: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (typeof input == "boolean") {
        response.validRequest = true;
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
  if (response.validRequest === false) {
    response.statusCode = 400;
  }

  return response;
}

export { validVarchar, validSignedInt, validUnsignedInt, validBoolean };
export type { ValidationResult };
