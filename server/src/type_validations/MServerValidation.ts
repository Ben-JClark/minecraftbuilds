import { validUnsignedInt, IntUnsignedMax } from "./MysqlTypeValidation.js";
import { CustomError } from "../utils/CustomError.js";

/**
 * Tests the input number to make sure it suits MySQL Unsigned Small Int datatype
 * @param input the number we want to veryify
 * @returns true if the input is valid, otherwise an error is thrown containing a string message
 */
function validServerId(serverId: unknown): void {
  try {
    validUnsignedInt(serverId, IntUnsignedMax.UnsignedSmallIntMax);
  } catch (err: unknown) {
    throw new CustomError(null, "server_id", err instanceof CustomError ? err.message : "something went wrong");
  }
}

export { validServerId };
