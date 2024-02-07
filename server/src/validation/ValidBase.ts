import {
  IntUnsignedMax,
  IntSignedMax,
  validVarchar,
  validSignedInt,
  validUnsignedInt,
  validBoolean,
  validFiles,
} from "./TypeValidation.js";
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
  image_files: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined;
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
                      response = validFiles(base.image_files, 1, 5);
                      if (response.validRequest) {
                        // response is already valid
                      } else {
                        response.invalidFeild = "image_files";
                      }
                    } else {
                      response.invalidFeild = "purchase_method";
                    }
                  } else {
                    response.invalidFeild = "purchase_item";
                  }
                } else {
                  response.invalidFeild = "purchase_price";
                }
              } else {
                response.invalidFeild = "for_sale";
              }
            } else {
              response.invalidFeild = "z_coordinate";
            }
          } else {
            response.invalidFeild = "x_coordinate";
          }
        } else {
          response.invalidFeild = "base_description";
        }
      } else {
        response.invalidFeild = "base_name";
      }
    } else {
      response.invalidFeild = "owner_id";
    }
  } else {
    response.invalidFeild = "server_id";
  }
  return response;
}

export { validBase };
export type { Base };
