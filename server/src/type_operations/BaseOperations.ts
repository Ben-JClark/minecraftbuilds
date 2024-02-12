import {
  IntUnsignedMax,
  IntSignedMax,
  validVarchar,
  validSignedInt,
  validUnsignedInt,
  validBoolean,
} from "./MysqlOperations.js";
import { validFileNames } from "../file_operations/FileOperations.js";
import type { ServerResponse } from "../Server.js";

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

function validBase(base: Base): ServerResponse {
  let response: ServerResponse = validUnsignedInt(base.server_id, IntUnsignedMax.UnsignedSmallIntMax);
  if (response.success) {
    response = validUnsignedInt(base.owner_id, IntUnsignedMax.UnsignedSmallIntMax);
    if (response.success) {
      response = validVarchar(base.base_name, 1, 32);
      if (response.success) {
        response = validVarchar(base.base_description, 0, 1000);
        if (response.success) {
          response = validSignedInt(base.x_coordinate, IntSignedMax.SignedMediumIntMax);
          if (response.success) {
            response = validSignedInt(base.z_coordinate, IntSignedMax.SignedMediumIntMax);
            if (response.success) {
              response = validBoolean(base.for_sale);
              if (response.success) {
                response = validUnsignedInt(base.purchase_price, IntUnsignedMax.UnsignedSmallIntMax);
                if (response.success) {
                  response = validVarchar(base.purchase_item, 0, 41);
                  if (response.success) {
                    response = validVarchar(base.purchase_method, 0, 255);
                    if (response.success) {
                      response = validFileNames(base.image_files, 1, 5);
                      if (response.success) {
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

function parseBase(serverId: number, ownerId: number, requestBody: any, requestFiles: Express.Multer.File[]): Base {
  const fileNames: string[] = requestFiles.map((obj: any) => {
    return obj.filename;
  });

  const base: Base = {
    server_id: serverId,
    owner_id: ownerId,
    base_name: requestBody.base_name,
    base_description: requestBody.base_description,
    x_coordinate: parseInt(requestBody.x_coordinate),
    z_coordinate: parseInt(requestBody.z_coordinate),
    for_sale: String(requestBody.for_sale).toLocaleLowerCase() === "true",
    purchase_price: parseInt(requestBody.purchase_price),
    purchase_item: requestBody.purchase_item,
    purchase_method: requestBody.purchase_method,
    image_files: fileNames,
  };

  return base;
}

export { validBase, parseBase };
export type { Base };
