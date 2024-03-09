import {
  IntUnsignedMax,
  IntSignedMax,
  validVarchar,
  validSignedInt,
  validUnsignedInt,
  validBoolean,
} from "./MysqlTypeValidation.js";
import { validServerId } from "./MServerValidation.js";
import { validFileNames } from "../utils/FileOperations.js";

import { CustomError } from "../utils/CustomError.js";

type Base = {
  server_id: number;
  owner_id: number;
  base_name: string;
  base_description: string;
  x_coordinate: number;
  z_coordinate: number;
  for_sale: boolean;
  purchase_price: number;
  purchase_item: string;
  purchase_method: string;
  image_files: string[]; // Names of the files
};

/**
 * Validates the base object passed
 * Throws a CustomError(400,"feild","message")
 * @param base
 */
function validBase(base: Base): void {
  try {
    validServerId(base.server_id);
  } catch (err: unknown) {
    throw new CustomError(400, "server_id", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validUnsignedInt(base.owner_id, IntUnsignedMax.UnsignedSmallIntMax);
  } catch (err: unknown) {
    throw new CustomError(400, "owner_id", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validVarchar(base.base_name, 1, 32);
  } catch (err: unknown) {
    throw new CustomError(400, "base_name", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validVarchar(base.base_description, 0, 1000);
  } catch (err: unknown) {
    throw new CustomError(400, "base_description", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validSignedInt(base.x_coordinate, IntSignedMax.SignedMediumIntMax);
  } catch (err: unknown) {
    throw new CustomError(400, "x_coordinate", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validSignedInt(base.z_coordinate, IntSignedMax.SignedMediumIntMax);
  } catch (err: unknown) {
    throw new CustomError(400, "z_coordinate", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validBoolean(base.for_sale);
  } catch (err: unknown) {
    throw new CustomError(400, "for_sale", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validUnsignedInt(base.purchase_price, IntUnsignedMax.UnsignedSmallIntMax);
  } catch (err: unknown) {
    throw new CustomError(400, "purchase_price", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validVarchar(base.purchase_item, 0, 41);
  } catch (err: unknown) {
    throw new CustomError(400, "purchase_item", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validVarchar(base.purchase_method, 0, 255);
  } catch (err: unknown) {
    throw new CustomError(400, "purchase_method", err instanceof CustomError ? err.message : "something went wrong");
  }
  try {
    validFileNames(base.image_files, 1, 5);
  } catch (err: unknown) {
    throw new CustomError(400, "image_files", err instanceof CustomError ? err.message : "something went wrong");
  }
}

export { validBase };
export type { Base };
