import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { rename } from "fs/promises";
import type { ServerResponse } from "../type_validations/MysqlTypeValidation.js";

// Get the multer middleware instance that provides methods to get data and files from multipart/form-data posts
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagePath = path.resolve(__dirname, "../../public/images/");
const multerInstance = multer({ dest: imagePath });

/**
 * Renames a set of images to the set of filenames in the specified foler
 * @param currNames The names of the files that are to be renamed
 * @param newNames The new names of the files
 * @param folder The image folder from the images we are renaming
 * @returns ValidationResult on how the renaming went
 */
async function renameImages(
  currNames: string[],
  newNames: string[],
  imageFor: "base" | "shop" | "farm"
): Promise<ServerResponse> {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  if (currNames.length === newNames.length) {
    try {
      const renamePromises = currNames.map(async (currName: string, i: number) => {
        const currPath = path.resolve(__dirname, `../../public/images/${currName}`);
        const newPath = path.resolve(__dirname, `../../public/images/${imageFor}-${newNames[i]}.png`);
        return rename(currPath, newPath);
      });
      await Promise.all(renamePromises);
      response.success = true;
    } catch (error) {
      console.log("Error renaming files: ", error);
      response.errorMessage = "Error storing images";
    }
  } else {
    response.errorMessage = "Error renaming stored images, filenames provided have unequal length";
  }
  console.log("response from queries.ts: ", response);
  return response;
}

/**
 * Checks if the input is a string array and the length is within the range
 * @param input the file names
 * @param min the minimum number of file names
 * @param max the maximum number of file names
 * @returns
 */
function validFileNames(input: any, min: number, max: number) {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  if (input !== undefined) {
    if (input !== null) {
      if (Array.isArray(input)) {
        if (input.length >= min) {
          if (input.length <= max) {
            if (input.every((filename) => typeof filename === "string")) {
              response.success = true;
            } else {
              response.errorMessage = "The file names are not all a string";
            }
          } else {
            response.errorMessage = `You can't upload more than ${max} ${max > 1 ? "files" : "file"} `;
          }
        } else {
          response.errorMessage = `You must at lest upload ${min} ${min > 1 ? "files" : "file"} `;
        }
      } else {
        response.errorMessage = "The files are not an array";
      }
    } else {
      response.errorMessage = "The files can't be null";
    }
  } else {
    response.errorMessage = "The files cannot be undefined";
  }

  // invalid input = 400 Bad Request
  if (response.success === false) {
    response.statusCode = 400;
  }

  return response;
}

export { multerInstance, path, __dirname, renameImages, validFileNames };
