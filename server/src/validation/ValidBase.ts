import { validVarchar, validUnsignedSmallInt, validUnsignedMediumInt } from "./TypeValidation.js";
import type { ValidationResult } from "./TypeValidation.js";

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
};

function validBase(base: Base): ValidationResult {
  let validationResult: ValidationResult = { isValid: false, entryFeild: undefined, errorMessage: undefined };

  return validationResult;
}

export { validBase };
export type { Base };
