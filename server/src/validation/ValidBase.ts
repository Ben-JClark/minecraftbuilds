import {
  IntUnsignedMax,
  IntSignedMax,
  validVarchar,
  validSignedInt,
  validUnsignedInt,
  validBoolean,
} from "./TypeValidation.js";
import type { ValidationResult } from "./TypeValidation.js";

type Base = {
  server_id: any;
  owner_id: any;
  base_name: any;
  base_description: any;
  x_coordinate: any;
  z_coordinate: any;
  for_sale: any;
  purchase_price: any;
  purchase_item: any;
  purchase_method: any;
};

function validBase(base: Base): ValidationResult {
  let response: ValidationResult = validUnsignedInt(base.server_id, IntUnsignedMax.UnsignedSmallIntMax);
  if (response.validRequest) {
    response = validUnsignedInt(base.owner_id, IntUnsignedMax.UnsignedSmallIntMax);
    if (response.validRequest) {
      response = validVarchar(base.base_name, 1, 32);
      if (response.validRequest) {
        response = validVarchar(base.base_description, 0, 1000);
        if (response.validRequest) {
          response = validSignedInt(base.x_coordinate, IntSignedMax.SignedMediumIntMax);
          if (response.validRequest) {
            response = validSignedInt(base.z_coordinate, IntSignedMax.SignedMediumIntMax);
            if (response.validRequest) {
              response = validBoolean(base.for_sale);
              if (response.validRequest) {
                response = validUnsignedInt(base.purchase_price, IntUnsignedMax.UnsignedSmallIntMax);
                if (response.validRequest) {
                  response = validVarchar(base.purchase_item, 0, 41);
                  if (response.validRequest) {
                    response = validVarchar(base.purchase_method, 0, 255);
                    if (response.validRequest) {
                      // response is still valid so return it
                    } else {
                      response.entryFeild = "purchase_method";
                    }
                  } else {
                    response.entryFeild = "purchase_item";
                  }
                } else {
                  response.entryFeild = "purchase_price";
                }
              } else {
                response.entryFeild = "for_sale";
              }
            } else {
              response.entryFeild = "z_coordinate";
            }
          } else {
            response.entryFeild = "x_coordinate";
          }
        } else {
          response.entryFeild = "base_description";
        }
      } else {
        response.entryFeild = "base_name";
      }
    } else {
      response.entryFeild = "owner_id";
    }
  } else {
    response.entryFeild = "server_id";
  }
  return response;
}

export { validBase };
export type { Base };